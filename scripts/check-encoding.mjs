import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['app', 'components', 'lib'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.css']);
const BAD_PATTERNS = [/Р./, /вЂ/, /СЃ/, /С‚/];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walk(full));
      continue;
    }
    const ext = full.slice(full.lastIndexOf('.'));
    if (EXTENSIONS.has(ext)) {
      files.push(full);
    }
  }
  return files;
}

let hasError = false;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const buf = readFileSync(file);

    if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      console.error(`[encoding] BOM detected: ${file}`);
      hasError = true;
      continue;
    }

    const text = buf.toString('utf8');
    if (BAD_PATTERNS.some((pattern) => pattern.test(text))) {
      console.error(`[encoding] mojibake pattern detected: ${file}`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log('Encoding check passed');
