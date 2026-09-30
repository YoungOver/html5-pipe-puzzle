import path from 'node:path'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
const require = createRequire(path.join(execSync('npm root -g').toString().trim(), '@playwright/mcp/package.json'))
const { chromium } = require('playwright-core')
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const p = await b.newPage({ viewport: { width: 700, height: 760 }, deviceScaleFactor: 2 })
for (const [q, out] of [['?solve=6', 'g1.jpg'], ['?solve=9', 'g2.jpg'], ['', 'g0.jpg']]) {
  await p.goto(pathToFileURL(path.resolve('index.html')).href + q, { waitUntil: 'networkidle' }).catch(() => {})
  await p.waitForTimeout(1200)
  if (q === '?solve=9') await p.evaluate(() => { document.querySelector('.hint').textContent = 'Вода дошла! Уровень пройден'; document.querySelectorAll('.stars i').forEach(i => i.classList.add('on')) })
  await p.screenshot({ path: out, type: 'jpeg', quality: 92 })
}
await b.close()
