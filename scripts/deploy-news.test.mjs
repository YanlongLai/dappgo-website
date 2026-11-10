import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expectedTimestamp, NEWS_URL, prerenderTimestamp, waitForNews } from "./verify-news-deploy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const generatedAt = "2026-11-09T13:00:00Z";
const oldTime = "2026-11-09T12:00:00Z";
const html = (timestamp = generatedAt) => `<!doctype html>
<!-- dappgo:prerender:start -->
<p>Published report: <time datetime="${timestamp}">${timestamp}</time></p>
<ul><li><time datetime="${generatedAt}">story time</time></li></ul>
<!-- dappgo:prerender:end -->`;
const realGit = execFileSync("which", ["git"], { encoding: "utf8" }).trim();

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(root, ".deploy-news-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  for (const name of ["scripts", "news/us", "home", "bin", "tmp"]) fs.mkdirSync(path.join(directory, name), { recursive: true });
  const env = {
    PATH: `${path.join(directory, "bin")}:${process.env.PATH}`,
    HOME: path.join(directory, "home"), TMPDIR: path.join(directory, "tmp"),
    GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: path.join(directory, "gitconfig"),
    GIT_TERMINAL_PROMPT: "0", LC_ALL: "C"
  };
  fs.writeFileSync(env.GIT_CONFIG_GLOBAL, "");
  for (const name of ["deploy-news.sh", "verify-news-deploy.mjs"]) fs.copyFileSync(path.join(root, "scripts", name), path.join(directory, "scripts", name));
  fs.writeFileSync(path.join(directory, "news/us/index.html"), html());
  fs.writeFileSync(path.join(directory, "news/.gitignore"), ".wrangler/\n");
  // Any accidental npx call during a dry run fails locally, without network.
  fs.writeFileSync(path.join(directory, "bin/npx"), "#!/bin/sh\necho 'Unexpected npx invocation' >&2\nexit 73\n", { mode: 0o755 });
  const git = (...args) => execFileSync(realGit, args, { cwd: directory, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git("init", "--quiet", "--initial-branch=master");
  git("config", "user.name", "Deploy fixture");
  git("config", "user.email", "deploy-fixture@example.test");
  git("config", "commit.gpgsign", "false");
  git("config", "core.hooksPath", "/dev/null");
  git("add", "scripts", "news", "bin");
  git("commit", "--quiet", "-m", "fixture release");
  git("update-ref", "refs/remotes/origin/master", "HEAD");
  const run = (...args) => spawnSync("bash", [path.join(directory, "scripts/deploy-news.sh"), ...args], {
    cwd: path.join(directory, "news/us"), env, encoding: "utf8"
  });
  return { directory, env, git, run };
}

function argv(result) {
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout.split("\n").find((line) => line.startsWith("argv: ")).slice(6));
}

function expectedArgv(commit) {
  return ["npx", "--yes", "wrangler@4.149.0", "pages", "deploy", ".", "--project-name", "dappgo-news", "--branch", "master", "--commit-hash", commit, "--commit-dirty=false"];
}

test("dry run prints the exact pinned Wrangler argv, uses news/ as cwd and makes no changes or network calls", (t) => {
  const { directory, git, run } = fixture(t);
  fs.mkdirSync(path.join(directory, "news/.wrangler/logs"), { recursive: true });
  fs.writeFileSync(path.join(directory, "news/.wrangler/logs/cache.log"), "ignored cache");
  fs.writeFileSync(path.join(directory, "operator-notes.txt"), "unrelated dirty file is allowed");
  const before = git("status", "--porcelain=v1", "--untracked-files=all");
  const result = run("--dry-run");
  assert.deepEqual(argv(result), expectedArgv(git("rev-parse", "HEAD")));
  assert.ok(result.stdout.includes(`cwd: ${directory}/news\n`));
  assert.ok(result.stdout.includes(`expected generated_at_utc: ${generatedAt}\n`));
  assert.equal(git("status", "--porcelain=v1", "--untracked-files=all"), before);
});

test("dirty news/ is refused for unstaged, staged, deleted and untracked files, including with --allow-unmerged", async (t) => {
  for (const kind of ["unstaged", "staged", "deleted", "untracked"]) {
    await t.test(kind, (t) => {
      const { directory, git, run } = fixture(t);
      if (kind === "deleted") {
        git("rm", "--quiet", "news/us/index.html");
        fs.mkdirSync(path.join(directory, "news/us"), { recursive: true });
      }
      else if (kind === "untracked") fs.writeFileSync(path.join(directory, "news/extra.html"), "untracked");
      else {
        fs.appendFileSync(path.join(directory, "news/us/index.html"), "\ndirty\n");
        if (kind === "staged") git("add", "news/us/index.html");
      }
      for (const flags of [["--dry-run"], ["--dry-run", "--allow-unmerged"]]) {
        const result = run(...flags);
        assert.notEqual(result.status, 0);
        assert.match(result.stderr, /Refusing to deploy a dirty news\/ tree/);
        assert.doesNotMatch(result.stdout, /argv:/);
      }
    });
  }
});

test("a commit ahead of origin/master is refused unless --allow-unmerged is explicit", (t) => {
  const { directory, git, run } = fixture(t);
  fs.writeFileSync(path.join(directory, "local-change.txt"), "unmerged");
  git("add", "local-change.txt");
  git("commit", "--quiet", "-m", "unmerged fixture change");
  const refused = run("--dry-run");
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /HEAD is not an ancestor of origin\/master/);
  assert.deepEqual(argv(run("--dry-run", "--allow-unmerged")), expectedArgv(git("rev-parse", "HEAD")));
});

test("an older merged commit is allowed for rollback", (t) => {
  const { directory, git, run } = fixture(t);
  const previous = git("rev-parse", "HEAD");
  fs.writeFileSync(path.join(directory, "next-release.txt"), "next release");
  git("add", "next-release.txt");
  git("commit", "--quiet", "-m", "next fixture release");
  git("update-ref", "refs/remotes/origin/master", "HEAD");
  git("checkout", "--quiet", "--detach", previous);
  assert.deepEqual(argv(run("--dry-run")), expectedArgv(previous));
});

test("missing origin/master is refused without the explicit override", (t) => {
  const { git, run } = fixture(t);
  git("update-ref", "-d", "refs/remotes/origin/master");
  assert.notEqual(run("--dry-run").status, 0);
  assert.deepEqual(argv(run("--dry-run", "--allow-unmerged")), expectedArgv(git("rev-parse", "HEAD")));
});

test("the build timestamp file must match the committed report time", (t) => {
  const { directory, run } = fixture(t);
  const stamp = path.join(directory, "generated-at-utc");
  fs.writeFileSync(stamp, generatedAt + "\n");
  assert.equal(run("--dry-run", "--generated-at-file", "../../generated-at-utc").status, 0);
  assert.equal(expectedTimestamp(path.join(directory, "news/us/index.html"), stamp), generatedAt);
  fs.writeFileSync(stamp, oldTime + "\n");
  const mismatch = run("--dry-run", "--generated-at-file", stamp);
  assert.notEqual(mismatch.status, 0);
  assert.match(mismatch.stderr, /does not match/);
  assert.doesNotMatch(mismatch.stdout, /argv:/);
  assert.notEqual(run("--dry-run", "--generated-at-file", "missing-file").status, 0);
});

test("cache ignore is required and invalid command arguments fail", (t) => {
  const { directory, git, run } = fixture(t);
  for (const args of [["--unknown"], ["--generated-at-file"]]) assert.notEqual(run(...args).status, 0);
  fs.writeFileSync(path.join(directory, "news/.gitignore"), "");
  git("add", "news/.gitignore");
  git("commit", "--quiet", "-m", "fixture without cache ignore");
  git("update-ref", "refs/remotes/origin/master", "HEAD");
  const refused = run("--dry-run");
  assert.notEqual(refused.status, 0);
  assert.match(refused.stderr, /news\/\.wrangler\/ must be ignored/);
});

test("an upload failure is propagated without running the network verifier", (t) => {
  const { run } = fixture(t);
  const failed = run(); // The fixture's offline npx stub exits 73.
  assert.equal(failed.status, 73);
  assert.match(failed.stderr, /Unexpected npx invocation/);
});

test("local deployment works without a token using offline upload and GPTBot response stubs", (t) => {
  const { directory, env, git, run } = fixture(t);
  fs.writeFileSync(path.join(directory, "bin/npx"), `#!/bin/sh
exec '${process.execPath}' -e 'require("node:fs").writeFileSync(process.env.UPLOAD_RECORD, JSON.stringify({args:process.argv.slice(1),cwd:process.cwd(),hasToken:!!process.env.CLOUDFLARE_API_TOKEN,account:process.env.CLOUDFLARE_ACCOUNT_ID,cachePath:process.env.WRANGLER_CACHE_DIR,logPath:process.env.WRANGLER_LOG_PATH}))' -- "$@"
`, { mode: 0o755 });
  git("add", "bin/npx");
  git("commit", "--quiet", "-m", "offline upload fixture");
  git("update-ref", "refs/remotes/origin/master", "HEAD");
  const mockFetch = path.join(directory, "mock-fetch.mjs");
  fs.writeFileSync(mockFetch, `globalThis.fetch = async (url, options) => {
  if (url !== ${JSON.stringify(NEWS_URL)} || !options.headers["User-Agent"].includes("GPTBot")) throw new Error("Unexpected network request");
  return { ok: true, text: async () => ${JSON.stringify(html())} };
};`);
  env.NODE_OPTIONS = `--import=${mockFetch}`;
  env.UPLOAD_RECORD = path.join(directory, "upload.json");
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Verified https:\/\/news\.dappgo\.com\/us\//);
  const uploaded = JSON.parse(fs.readFileSync(env.UPLOAD_RECORD, "utf8"));
  assert.deepEqual(uploaded.args, expectedArgv(git("rev-parse", "HEAD")).slice(1));
  assert.equal(uploaded.cwd, path.join(directory, "news"));
  assert.equal(uploaded.hasToken, false);
  assert.equal(uploaded.account, "83066b4bb72b4d78d018900762c0c948");
  assert.equal(uploaded.cachePath, path.join(directory, "news/.wrangler/cache"));
  assert.equal(uploaded.logPath, path.join(directory, "news/.wrangler/logs"));
  assert.equal(git("status", "--porcelain=v1", "--", "news/"), "");
});

test("only the report time inside a complete prerender block counts", () => {
  assert.equal(prerenderTimestamp(`<time datetime="${oldTime}"></time>${html()}`), generatedAt);
  assert.equal(prerenderTimestamp(html(oldTime)), oldTime);
  for (const invalid of [html().replace("<!-- dappgo:prerender:end -->", ""), `<time datetime="${generatedAt}"></time>`, html("invalid")]) {
    assert.throws(() => prerenderTimestamp(invalid));
  }
});

test("freshness polling retries HTTP errors, incomplete blocks and stale reports before matching", async () => {
  let clock = 0;
  const responses = [{ ok: false, status: 503 }, { ok: true, text: async () => "no prerender" }, { ok: true, text: async () => html(oldTime) }, { ok: true, text: async () => html() }];
  let requests = 0;
  await waitForNews({ expected: generatedAt, now: () => clock, wait: async (ms) => { clock += ms; }, log: () => {},
    fetchImpl: async (url, options) => {
      assert.equal(url, NEWS_URL);
      assert.match(options.headers["User-Agent"], /GPTBot/);
      assert.equal(options.headers["Cache-Control"], "no-cache");
      assert.ok(options.signal instanceof AbortSignal);
      return responses[requests++];
    }
  });
  assert.equal(requests, 4);
  assert.equal(clock, 15_000);
});

test("a stale report fails after at most three minutes even if a story has the expected timestamp", async () => {
  let clock = 0;
  let requests = 0;
  await assert.rejects(waitForNews({ expected: generatedAt, now: () => clock, wait: async (ms) => { clock += ms; }, log: () => {},
    fetchImpl: async () => { requests++; return { ok: true, text: async () => html(oldTime) }; }
  }), /within 180s/);
  assert.equal(clock, 180_000);
  assert.equal(requests, 36);
});

test("freshness polling retries network failures and bounds each retry to the remaining deadline", async () => {
  let clock = 0;
  const waits = [];
  await assert.rejects(waitForNews({ expected: generatedAt, timeoutMs: 7_000, now: () => clock,
    wait: async (ms) => { waits.push(ms); clock += ms; }, log: () => {},
    fetchImpl: async () => { throw new Error("fixture offline"); }
  }), /fixture offline/);
  assert.deepEqual(waits, [5_000, 2_000]);
  assert.equal(clock, 7_000);
});

// Execute the workflow's actual shell blocks with offline process boundaries.
// These are not YAML assertions: commits/file lists are real fixture git data,
// while clone, push and pull are intercepted and never contact a remote.
const workflow = fs.readFileSync(path.join(root, ".gitea/workflows/pulse.yml"), "utf8");
function workflowRun(name) {
  const step = workflow.split(`      - name: ${name}\n`)[1]?.split("\n      - name:")[0];
  assert.ok(step, `Missing workflow step ${name}`);
  return step.split("        run: |\n")[1].split("\n").filter((line) => line.startsWith("          ") || !line.trim()).map((line) => line.slice(10)).join("\n");
}

function pulseFixture(t, { change = "unchanged", force = false, pushFailures = 0, dirtyAfterPush = false } = {}) {
  const current = fixture(t);
  const { directory, env, git } = current;
  fs.mkdirSync(path.join(directory, "data"));
  fs.mkdirSync(path.join(directory, "zh"));
  fs.writeFileSync(path.join(directory, "index.html"), "homepage");
  fs.writeFileSync(path.join(directory, "zh/index.html"), "homepage zh");
  fs.writeFileSync(path.join(directory, "data/pulse.json"), JSON.stringify({ markets: Object.fromEntries(["us", "tw", "options"].map((market) => [market, { report_date: "2026-11-09" }])) }));
  fs.writeFileSync(path.join(directory, "scripts/build-pulse.mjs"), `import fs from "node:fs";
if (process.env.FIXTURE_CHANGE === "pulse") fs.appendFileSync("index.html", " refreshed");`);
  fs.writeFileSync(path.join(directory, "scripts/verify-pulse.mjs"), "// Offline fixture verification\n");
  fs.writeFileSync(path.join(directory, "scripts/build-news-html.mjs"), `import fs from "node:fs";
const timestamp = process.env.FIXTURE_CHANGE === "news" ? "2026-11-09T14:00:00Z" : ${JSON.stringify(generatedAt)};
if (process.env.FIXTURE_CHANGE === "news") fs.writeFileSync("news/us/index.html", ${JSON.stringify(html())}.replaceAll(${JSON.stringify(generatedAt)}, timestamp));
const flag = process.argv.indexOf("--generated-at-file");
if (flag < 0) throw new Error("Missing build timestamp handoff");
fs.writeFileSync(process.argv[flag + 1], timestamp + "\\n");`);
  git("add", "scripts", "data", "index.html", "zh");
  git("commit", "--quiet", "-m", "offline pulse fixture");
  git("update-ref", "refs/remotes/origin/master", "HEAD");
  Object.assign(env, {
    FIXTURE_SOURCE: directory, FIXTURE_CHANGE: change,
    FIXTURE_PUSH_RECORD: path.join(directory, "pushes.json"), FIXTURE_PUSH_FAILURES: String(pushFailures),
    FIXTURE_DIRTY_AFTER_PUSH: String(dirtyAfterPush),
    GITHUB_OUTPUT: path.join(directory, "outputs"), PUSH_TOKEN: "offline-fixture-authorization",
    FORCE_DEPLOY_NEWS: String(force)
  });
  fs.writeFileSync(path.join(directory, "bin/mktemp"), `#!${process.execPath}
if (process.argv.slice(2).join(" ") !== "-d") throw new Error("Unexpected mktemp arguments");
console.log(require("node:fs").mkdtempSync(require("node:path").join(process.env.FIXTURE_SOURCE, "tmp", "work-")));`, { mode: 0o755 });
  fs.writeFileSync(path.join(directory, "bin/base64"), `#!${process.execPath}
let input = ""; process.stdin.on("data", chunk => input += chunk); process.stdin.on("end", () => process.stdout.write(Buffer.from(input).toString("base64")));`, { mode: 0o755 });
  fs.writeFileSync(path.join(directory, "bin/git"), `#!${process.execPath}
const fs = require("node:fs"), path = require("node:path"), { spawnSync, execFileSync } = require("node:child_process");
const args = process.argv.slice(2), command = args[0] === "-c" ? args[2] : args[0];
if (command === "clone") {
  const source = process.env.FIXTURE_SOURCE, destination = args.at(-1);
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source)) {
    if (!["tmp", "home"].includes(entry)) fs.cpSync(path.join(source, entry), path.join(destination, entry), { recursive: true });
  }
} else if (command === "push") {
  const record = process.env.FIXTURE_PUSH_RECORD;
  const attempts = fs.existsSync(record) ? JSON.parse(fs.readFileSync(record, "utf8")).attempts + 1 : 1;
  const commit = execFileSync(${JSON.stringify(realGit)}, ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  fs.writeFileSync(record, JSON.stringify({ attempts, commit }));
  if (attempts <= Number(process.env.FIXTURE_PUSH_FAILURES)) process.exit(1);
  execFileSync(${JSON.stringify(realGit)}, ["update-ref", "refs/remotes/origin/master", commit]);
  if (process.env.FIXTURE_DIRTY_AFTER_PUSH === "true") fs.appendFileSync("news/us/index.html", " dirty after push");
} else if (command !== "pull") {
  const result = spawnSync(${JSON.stringify(realGit)}, args, { stdio: "inherit" });
  process.exit(result.status ?? 1);
}`, { mode: 0o755 });
  const result = spawnSync("bash", ["-c", workflowRun("Refresh and publish pulse")], { cwd: directory, env, encoding: "utf8" });
  const outputs = Object.fromEntries((fs.existsSync(env.GITHUB_OUTPUT) ? fs.readFileSync(env.GITHUB_OUTPUT, "utf8").trim().split("\n").filter(Boolean) : []).map((line) => {
    const index = line.indexOf("=");
    return [line.slice(0, index), line.slice(index + 1)];
  }));
  return { ...current, result, outputs };
}

test("workflow deploys only for a successfully pushed news commit or the manual force input", async (t) => {
  for (const scenario of [
    { change: "news", deploy: "true", pushed: true },
    { change: "pulse", deploy: "false", pushed: true, dirtyAfterPush: true },
    { change: "unchanged", deploy: "false", pushed: false },
    { change: "unchanged", force: true, deploy: "true", pushed: false }
  ]) {
    await t.test(`${scenario.change}${scenario.force ? " forced" : ""}`, (t) => {
      const { directory, result, outputs, env } = pulseFixture(t, scenario);
      assert.equal(result.status, 0, result.stderr);
      assert.equal(outputs.deploy_news, scenario.deploy);
      assert.equal(fs.existsSync(env.FIXTURE_PUSH_RECORD), scenario.pushed);
      assert.ok(!fs.existsSync(path.join(directory, "tmp")) || fs.readdirSync(path.join(directory, "tmp")).length === 0, "the publish clone must be removed on exit");
      assert.match(outputs.commit, /^[0-9a-f]{40}$/);
      if (scenario.pushed) assert.equal(outputs.commit, JSON.parse(fs.readFileSync(env.FIXTURE_PUSH_RECORD, "utf8")).commit);
      else assert.equal(outputs.commit, execFileSync(realGit, ["rev-parse", "HEAD"], { cwd: directory, env, encoding: "utf8" }).trim());
    });
  }
});

test("workflow retries a rejected push and does not request deployment after three failures", async (t) => {
  await t.test("retry succeeds", (t) => {
    const { result, outputs, env } = pulseFixture(t, { change: "news", pushFailures: 1 });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(outputs.deploy_news, "true");
    assert.equal(JSON.parse(fs.readFileSync(env.FIXTURE_PUSH_RECORD, "utf8")).attempts, 2);
  });
  await t.test("three failures", (t) => {
    const { result, outputs, env } = pulseFixture(t, { change: "news", pushFailures: 3 });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /pulse push failed after 3 attempts/);
    assert.equal(outputs.deploy_news, undefined);
    assert.equal(JSON.parse(fs.readFileSync(env.FIXTURE_PUSH_RECORD, "utf8")).attempts, 3);
  });
});

test("workflow missing deploy secret warns and succeeds before invoking the deploy script", (t) => {
  const { directory, env } = fixture(t);
  const result = spawnSync("bash", ["-c", workflowRun("Deploy and verify news")], { cwd: directory, env, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /::warning::News HTML was committed.*not deployed.*CLOUDFLARE_PAGES_TOKEN/);
});

function deployJobFixture(t, { nodeVersion = "v22.12.0", deployScript }) {
  const { directory, env } = fixture(t);
  fs.mkdirSync(path.join(directory, "bin"), { recursive: true });
  fs.mkdirSync(path.join(directory, "tmp"), { recursive: true });
  fs.writeFileSync(path.join(directory, "bin/node"), `#!/bin/sh\n[ "$1" = --version ] && { echo ${nodeVersion}; exit 0; }\nexec ${process.execPath} "$@"\n`, { mode: 0o755 });
  fs.writeFileSync(path.join(directory, "bin/mktemp"), `#!/bin/sh\nmkdir -p "${directory}/tmp/work" && echo "${directory}/tmp/work"\n`, { mode: 0o755 });
  fs.writeFileSync(path.join(directory, "bin/git"), `#!/bin/sh\ncase "$1" in\n  clone) dest="$(eval echo \\$$#)"; mkdir -p "$dest/scripts"; cp "${directory}/deploy-news.sh" "$dest/scripts/deploy-news.sh"; echo "$@" >> "${directory}/git-calls" ;;\n  checkout) echo "$@" >> "${directory}/git-calls" ;;\n  *) exit 97 ;;\nesac\n`, { mode: 0o755 });
  fs.writeFileSync(path.join(directory, "deploy-news.sh"), typeof deployScript === "function" ? deployScript(directory) : deployScript);
  return { directory, env: { ...env, PATH: `${path.join(directory, "bin")}:${env.PATH}`, CLOUDFLARE_API_TOKEN: "offline-fixture-authorization", DEPLOY_COMMIT: "0123456789abcdef0123456789abcdef01234567" } };
}

test("deploy job clones the pushed commit from GitHub and propagates deployment failure", (t) => {
  const { directory, env } = deployJobFixture(t, { deployScript: (dir) => `#!/bin/sh\ntest "$#" = 0 || exit 91\ntest -n "$CLOUDFLARE_API_TOKEN" || exit 93\ntest "$(pwd)" = "${dir}/tmp/work/site" || exit 94\nexit 74\n` });
  const result = spawnSync("bash", ["-c", workflowRun("Deploy and verify news")], { cwd: directory, env, encoding: "utf8" });
  assert.equal(result.status, 74, result.stderr);
  const calls = fs.readFileSync(path.join(directory, "git-calls"), "utf8");
  assert.match(calls, /clone --quiet --depth 50 --branch master https:\/\/github\.com\/YanlongLai\/dappgo-website\.git /);
  assert.match(calls, /checkout --quiet 0123456789abcdef0123456789abcdef01234567/);
  assert.ok(!fs.existsSync(path.join(directory, "tmp/work")), "the deploy clone must be removed on exit");
});

test("deploy job refuses a runner without Node 22", (t) => {
  const { directory, env } = deployJobFixture(t, { nodeVersion: "v20.20.2", deployScript: "#!/bin/sh\nexit 0\n" });
  const result = spawnSync("bash", ["-c", workflowRun("Deploy and verify news")], { cwd: directory, env, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /deploy-news needs Node 22/);
  assert.ok(!fs.existsSync(path.join(directory, "git-calls")), "nothing is cloned on an unsupported runner");
});
