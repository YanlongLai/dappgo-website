/* Dependency-free behavior checks. Run: node --test assets/demo/demo.test.cjs */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const script = fs.readFileSync(path.join(__dirname, "demo.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "../../demo.html"), "utf8");
const production = fs.readFileSync(
  path.join(__dirname, "../../index.html"),
  "utf8",
);

function fixture({ reduced = false, storageFails = false } = {}) {
  class Element {
    constructor(dataset = {}) {
      this.dataset = dataset;
      this.innerHTML = "Original English copy";
      this.textContent = "";
      this.attrs = {};
      this.events = {};
      this.classes = new Set();
      this.classList = {
        contains: (key) => this.classes.has(key),
        toggle: (key, value) =>
          value ? this.classes.add(key) : this.classes.delete(key),
      };
    }
    setAttribute(key, value) {
      this.attrs[key] = value;
    }
    getAttribute(key) {
      return this.attrs[key];
    }
    addEventListener(key, callback) {
      this.events[key] = callback;
    }
    querySelectorAll() {
      return [];
    }
    focus() {
      this.focused = true;
    }
  }
  const translated = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(
    (match) => new Element({ i18n: match[1] }),
  );
  const flowTabs = Array.from(
    { length: 4 },
    (_, step) => new Element({ step }),
  );
  const productTabs = Array.from(
    { length: 3 },
    (_, screen) => new Element({ screen }),
  );
  const minis = Array.from({ length: 3 }, () => new Element());
  const elements = new Map();
  const get = (selector) => {
    if (!elements.has(selector)) elements.set(selector, new Element());
    return elements.get(selector);
  };
  const document = {
    documentElement: new Element(),
    hidden: false,
    events: {},
    querySelector: get,
    querySelectorAll: (selector) =>
      ({
        "[data-i18n]": translated,
        "[data-step]": flowTabs,
        "[data-screen]": productTabs,
        ".mini-flow span": minis,
      })[selector] || [],
    addEventListener(key, callback) {
      this.events[key] = callback;
    },
  };
  let visibility;
  const media = {
    matches: reduced,
    addEventListener(key, callback) {
      this.change = callback;
    },
  };
  const timers = new Map();
  let nextTimer = 0;
  vm.runInNewContext(script, {
    document,
    localStorage: {
      getItem() {
        if (storageFails) throw Error("denied");
        return null;
      },
      setItem() {
        if (storageFails) throw Error("denied");
      },
    },
    matchMedia: () => media,
    IntersectionObserver: class {
      constructor(callback) {
        visibility = callback;
      }
      observe() {}
    },
    setInterval: (callback) => {
      timers.set(++nextTimer, callback);
      return nextTimer;
    },
    clearInterval: (id) => timers.delete(id),
  });
  return {
    document,
    get,
    flowTabs,
    productTabs,
    translated,
    media,
    timers,
    visible(value) {
      visibility([{ isIntersecting: value }]);
    },
  };
}

test("all local links, assets, and anchors resolve", () => {
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Duplicate DOM IDs");
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (ref.startsWith("/"))
      assert.ok(fs.existsSync(path.join(__dirname, "../..", ref)), ref);
    if (ref.startsWith("#") && ref !== "#")
      assert.ok(ids.includes(ref.slice(1)), ref);
  }
});

test("production homepage is indexable and keeps the public metadata contract", () => {
  assert.match(production, /<meta name="robots" content="index, follow"/);
  assert.match(
    production,
    /<link rel="canonical" href="https:\/\/dappgo\.com\//,
  );
  assert.match(production, /googletagmanager\.com\/gtag\/js\?id=G-C9K7KCERPP/);
  assert.match(production, /og-image-v2\.png/);
  assert.doesNotMatch(production, /noindex/);
  assert.doesNotMatch(production, /Design preview/);
});

test("Traditional Chinese covers every translated element; language round trip works", () => {
  const app = fixture();
  app.get("#language-toggle").events.click();
  assert.equal(app.document.documentElement.lang, "zh-Hant");
  for (const element of app.translated)
    assert.ok(
      typeof element.innerHTML === "string" && element.innerHTML.length,
      element.dataset.i18n,
    );
  assert.match(app.get("#flow-description").textContent, /市場/);
  app.get("#language-toggle").events.click();
  assert.equal(app.document.documentElement.lang, "en");
  assert.match(app.get("#flow-description").textContent, /market/);
});

test("autoplay stops offscreen, in a hidden tab, and when paused", () => {
  const app = fixture();
  assert.equal(app.timers.size, 0);
  app.visible(true);
  assert.equal(app.timers.size, 1);
  [...app.timers.values()][0]();
  assert.equal(app.get("#workflow").dataset.step, "1");
  app.visible(false);
  assert.equal(app.timers.size, 0);
  app.visible(true);
  app.document.hidden = true;
  app.document.events.visibilitychange();
  assert.equal(app.timers.size, 0);
  app.document.hidden = false;
  app.document.events.visibilitychange();
  app.get("#flow-play").events.click();
  assert.equal(app.timers.size, 0);
  assert.equal(app.get("#flow-play").getAttribute("aria-pressed"), "false");
});

test("reduced motion disables default autoplay and reacts to preference changes", () => {
  const reduced = fixture({ reduced: true });
  reduced.visible(true);
  assert.equal(reduced.timers.size, 0);
  assert.equal(
    reduced.get("#workflow").classList.contains("is-playing"),
    false,
  );
  const app = fixture();
  app.visible(true);
  app.media.matches = true;
  app.media.change();
  assert.equal(app.timers.size, 0);
  assert.equal(app.get("#workflow").classList.contains("is-playing"), false);
});

test("manual workflow selection stops playback and keyboard tabs wrap correctly", () => {
  const app = fixture();
  app.visible(true);
  app.flowTabs[2].events.click();
  assert.equal(app.timers.size, 0);
  assert.equal(app.get("#workflow").dataset.step, "2");
  app.flowTabs[2].events.keydown({ key: "End", preventDefault() {} });
  assert.equal(app.get("#workflow").dataset.step, "3");
  app.flowTabs[3].events.keydown({ key: "ArrowRight", preventDefault() {} });
  assert.equal(app.get("#workflow").dataset.step, "0");
  assert.equal(app.flowTabs[0].focused, true);
});

test("product tabs switch actual images and preserve accessible selection", () => {
  const app = fixture();
  app.productTabs[1].events.click();
  assert.equal(
    app.get("#product-image").src,
    "/assets/screenshots/options/explore.png",
  );
  assert.equal(app.productTabs[1].getAttribute("aria-selected"), "true");
  assert.equal(app.productTabs[0].tabIndex, -1);
  app.productTabs[1].events.keydown({ key: "End", preventDefault() {} });
  assert.equal(
    app.get("#product-image").src,
    "/assets/screenshots/options/ticker.png",
  );
});

test("theme and Escape-to-close menu work even when preference storage is blocked", () => {
  const app = fixture({ storageFails: true });
  app.get("#theme-toggle").events.click();
  assert.equal(app.document.documentElement.dataset.theme, "dark");
  app.get("#menu-toggle").events.click();
  assert.equal(app.get("#menu-toggle").getAttribute("aria-expanded"), "true");
  app.document.events.keydown({ key: "Escape" });
  assert.equal(app.get("#menu-toggle").getAttribute("aria-expanded"), "false");
  assert.equal(app.get("#menu-toggle").focused, true);
});
