#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function reportSQL(days = 7) {
  if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error('Days must be an integer between 1 and 90');
  const since = `date('now', '-${days - 1} days')`;
  return [
    `SELECT day, market, stock, platform, COUNT(*) AS opens, COUNT(DISTINCT visitor_hash) AS anonymous_readers FROM ai_open_events WHERE day >= ${since} GROUP BY day, market, stock, platform ORDER BY day DESC, opens DESC;`,
    // A reader rotates daily. Across days this is reader-days, not unique people.
    `SELECT market, stock, platform, language, COUNT(*) AS opens, COUNT(DISTINCT day || ':' || visitor_hash) AS anonymous_reader_days FROM ai_open_events WHERE day >= ${since} GROUP BY market, stock, platform, language ORDER BY opens DESC;`,
    `SELECT day, COUNT(*) AS opens, COUNT(DISTINCT visitor_hash) AS anonymous_readers FROM ai_open_events WHERE day >= ${since} GROUP BY day ORDER BY day DESC;`,
  ].join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.includes('--help')) {
      console.log('node scripts/news-ai-report.mjs [--days 1..90] [--local] [--json]\nUTC daily anonymous browser/install readers; cross-day totals are reader-days. Existing Wrangler authentication is required for remote reads.');
    } else {
      const dayIndex = args.indexOf('--days');
      const days = dayIndex === -1 ? 7 : Number(args[dayIndex + 1]);
      const sql = reportSQL(days);
      const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
      const output = execFileSync('npx', ['--yes', 'wrangler@4.149.0', 'd1', 'execute', 'NEWS_ENGAGEMENT', args.includes('--local') ? '--local' : '--remote', '--config', 'news/wrangler.toml', '--command', sql, '--json'], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
      const results = JSON.parse(output);
      if (args.includes('--json')) console.log(JSON.stringify({ days, timezone: 'UTC', daily: results[0].results, by_stock_platform_language: results[1].results, overall_daily: results[2].results }, null, 2));
      else {
        console.log(`AI opens · last ${days} UTC day(s). Anonymous readers identify one browser/install per day, not verified people.`);
        console.table(results[0].results);
        console.log('Across days: anonymous_reader_days counts one reader on each day.');
        console.table(results[1].results);
        console.log('Overall daily readers (deduplicated across stocks):');
        console.table(results[2].results);
      }
    }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
