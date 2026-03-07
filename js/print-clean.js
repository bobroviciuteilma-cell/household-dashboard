// ─────────────────────────────────────────────────────────────
//  print-clean.js — Browser-side clean print from data.js
//  Opens a new window with standalone HTML + embedded CSS → window.print()
//  Identical output to generate-clean.mjs (Puppeteer PDFs)
// ─────────────────────────────────────────────────────────────

import {
  TEAM_OVERVIEW,
  HAZEL_ROUTINE,
  NICA_ROUTINE,
  LEON,
  STANDARDS,
  COOKING_HANDOVER,
  ORG_OVERVIEW,
  DEEP_CLEAN_OVERVIEW,
  WEEK_DAYS,
} from './data.js?v=27';

// ─────────────────────────────────────────────────────────────
//  Design System — shared across all printable pages
// ─────────────────────────────────────────────────────────────

const SHARED_CSS = `
  /* === RESET === */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  /* === PAGE === */
  @page { size: A4 portrait; margin: 14mm 12mm; }

  /* === TOKENS === */
  :root {
    --bg:           #FAF8F5;
    --surface:      #FFFFFF;
    --cream:        #F5F0E8;
    --cream-border: #E8E0D0;
    --border:       #D7CFC5;
    --text:         #3E2C1A;
    --text-sec:     #5D4037;
    --text-muted:   #8D6E63;
    --accent:       #8B6914;

    --admin-bg:     #FFEBEE;  --admin-bdr:  #EF9A9A;  --admin-tx:  #C62828;
    --org-bg:       #FFF3E0;  --org-bdr:    #FFCC80;  --org-tx:    #E65100;
    --leon-bg:      #E8F5E9;  --leon-bdr:   #A5D6A7;  --leon-tx:   #2E7D32;
    --dc-bg:        #E3F2FD;  --dc-bdr:     #90CAF9;  --dc-tx:     #1565C0;

    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --radius: 6px;
  }

  /* === BASE === */
  html { background: #FFFFFF; }
  body {
    font-family: var(--font);
    font-size: 10px;
    line-height: 1.5;
    color: var(--text);
    background: #FFFFFF;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  strong { font-weight: 700; }

  /* === PAGE TITLE === */
  .page-title {
    font-size: 18px; font-weight: 700; color: var(--text);
    margin-bottom: 2px;
  }
  .page-subtitle {
    font-size: 10px; color: var(--text-sec);
    margin-bottom: 16px;
  }

  /* === CARDS === */
  .card {
    background: var(--surface);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 12px;
  }

  /* === CREAM BARS === */
  .cream-bar {
    display: block;
    width: 100%;
    background: var(--cream);
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    border-bottom: 1px solid var(--cream-border);
  }
  .cream-bar--sm {
    font-size: 9px;
    font-weight: 700;
    color: var(--text-sec);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 4px 12px;
  }

  /* === DETAIL ROWS === */
  .detail-label {
    display: block;
    background: var(--cream);
    padding: 2px 12px;
    font-size: 7.5px;
    font-weight: 700;
    color: var(--text-sec);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--cream-border);
  }
  .detail-value {
    display: block;
    padding: 3px 12px 5px;
    font-size: 10px;
  }

  /* === TABLES === */
  table { width: 100%; border-collapse: collapse; font-size: 10px; }
  th {
    background: var(--cream);
    font-size: 8.5px; font-weight: 700; color: var(--text-sec);
    text-transform: uppercase; letter-spacing: 0.04em;
    padding: 4px 8px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  td {
    padding: 3px 8px;
    border-bottom: 1px solid var(--cream-border);
    vertical-align: top;
  }
  .pct { font-weight: 700; text-align: right; width: 40px; }

  /* === LISTS === */
  ul, ol { padding-left: 18px; margin: 3px 0; }
  li { padding: 1.5px 0; font-size: 10px; line-height: 1.5; }

  /* === SUBSECTION TITLE === */
  .sub-title {
    font-size: 9px; font-weight: 700; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.04em;
    padding: 6px 8px 3px;
  }

  /* === TASK TYPE CELL COLORS === */
  .cell--leon  { color: var(--leon-tx);  background: var(--leon-bg); }
  .cell--org   { color: var(--org-tx);   background: var(--org-bg); }
  .cell--admin { color: var(--admin-tx); background: var(--admin-bg); }
  .cell--dc    { color: var(--dc-tx);    background: var(--dc-bg); }

  /* === ANNOTATIONS === */
  .annotation {
    font-size: 8.5px; padding: 2px 6px; border-radius: 3px;
    margin-right: 4px; margin-bottom: 3px; display: inline-block;
  }
  .ann--admin { background: var(--admin-bg); border: 1px solid var(--admin-bdr); color: var(--admin-tx); }
  .ann--org   { background: var(--org-bg);   border: 1px solid var(--org-bdr);   color: var(--org-tx); }
  .ann--leon  { background: var(--leon-bg);  border: 1px solid var(--leon-bdr);  color: var(--leon-tx); }
  .ann--dc    { background: var(--dc-bg);    border: 1px solid var(--dc-bdr);    color: var(--dc-tx); }

  /* === SECTION DIVIDERS IN TABLES === */
  .sec-div td {
    background: var(--cream);
    font-size: 9px; font-weight: 700; color: var(--text-sec);
    text-transform: uppercase; letter-spacing: 0.04em;
    padding: 4px 8px;
    border-bottom: 1px solid var(--border);
  }

  /* === GRID === */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .wide { grid-column: 1 / -1; }

  /* === NOTE TEXT === */
  .note { font-size: 8.5px; color: var(--text-muted); line-height: 1.4; padding: 4px 8px; }
  .intro { font-size: 9.5px; color: var(--text-sec); padding: 4px 8px; line-height: 1.5; }
  .important { font-size: 9.5px; color: var(--admin-tx); font-weight: 600; padding: 4px 8px; }

  /* === PAGE BREAKS === */
  .page-break { page-break-before: always; }
  .avoid-break { break-inside: avoid; page-break-inside: avoid; }

  /* === CHECKBOX === */
  .cb {
    display: inline-block; width: 12px; height: 12px;
    border: 1.5px solid var(--text); border-radius: 2px;
    vertical-align: middle;
  }

  /* === REFLECTION === */
  .refl { margin-top: 6px; padding: 4px 0; }
  .refl-heading {
    font-size: 8.5px; font-weight: 700; color: var(--text-sec);
    text-transform: uppercase; margin-bottom: 3px; padding: 0 8px;
  }
  .refl-field { margin-bottom: 3px; padding: 0 8px; }
  .refl-label { font-size: 8.5px; color: var(--text-muted); }
  .write-line { border-bottom: 1px solid var(--border); height: 18px; }
`;

// ─────────────────────────────────────────────────────────────
//  Utilities
// ─────────────────────────────────────────────────────────────

function boldTimes(text) {
  if (!text) return text || '';
  return String(text).replace(
    /(\d{1,2}:\d{2}(?:\s*(?:AM|PM))?(?:\s*[–\-~]+\s*~?\d{1,2}:\d{2}(?:\s*(?:AM|PM))?)?|\b\d{1,2}\s+(?:AM|PM)\b|\b\d+x\s+daily\b)/gi,
    '<strong>$1</strong>'
  );
}

function cellClass(text) {
  if (!text) return '';
  if (text.includes('\u{1F476}')) return 'cell--leon';
  if (text.includes('\u{1F4E6}')) return 'cell--org';
  if (text.includes('\u270D'))   return 'cell--admin';
  if (text.includes('\u{1F9F9}')) return 'cell--dc';
  return '';
}

function wrap(title, body, extraCss = '') {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>${title}</title>
<style>${SHARED_CSS}${extraCss}</style></head>
<body>${body}</body></html>`;
}

// ─────────────────────────────────────────────────────────────
//  1. OVERVIEW
// ─────────────────────────────────────────────────────────────

function buildOverviewHtml() {
  const h = TEAM_OVERVIEW.hazel;
  const n = TEAM_OVERVIEW.nica;

  const detailRow = (label, value) =>
    `<div class="detail-label">${label}</div><div class="detail-value">${boldTimes(value)}</div>`;

  const splitTable = (splits) => `
    <table>
      <thead><tr><th>Area</th><th style="text-align:right">%</th></tr></thead>
      <tbody>${splits.map(s => `<tr><td>${s.area}</td><td class="pct">${s.pct}</td></tr>`).join('')}</tbody>
    </table>`;

  const teamCard = (person) => `
    <div class="card avoid-break">
      <div class="cream-bar" style="display:flex;align-items:baseline;gap:8px">
        <span>${person.name}</span>
        <span style="font-size:8.5px;font-weight:700;color:var(--text-muted)">${person.focus}</span>
      </div>
      ${detailRow('Hours', person.hours)}
      ${detailRow('Day off', person.dayOff)}
      ${detailRow('Rest', person.rest)}
      ${detailRow('Primary focus', person.primaryFocus)}
      ${person.householdDuties ? `
        <div class="detail-label">Household duties</div>
        <div style="padding:3px 12px"><ul style="margin:0">${person.householdDuties.map(d => `<li>${d}</li>`).join('')}</ul></div>
      ` : ''}
      ${splitTable(person.responsibilitySplit)}
      ${person.note ? `<p class="note">${person.note}</p>` : ''}
    </div>`;

  const compRows = TEAM_OVERVIEW.comparison.map(r => `
    <tr>
      <td style="font-weight:700;width:120px;font-size:9px;color:var(--text-sec)">${r.label}</td>
      <td>${boldTimes(r.hazel)}</td>
      <td>${boldTimes(r.nica)}</td>
    </tr>`).join('');

  const sectionNames = ['MORNING', 'MIDDAY', 'AFTERNOON', 'EVENING'];
  const leonRows = LEON.schedule.map(item => {
    if (!item.time && sectionNames.includes(item.activity)) {
      return `<tr class="sec-div"><td colspan="2">${item.activity}</td></tr>`;
    }
    let subHtml = '';
    if (item.sub) {
      subHtml = item.sub.map(s => `<div style="padding-left:14px;font-size:9px;color:var(--leon-tx)">↗ ${boldTimes(s)}</div>`).join('');
    }
    return `<tr><td style="width:90px;font-size:9px;color:var(--text-sec);font-weight:600">${boldTimes(item.time || '')}</td><td>${boldTimes(item.activity)}${subHtml}</td></tr>`;
  }).join('');

  const leonStds = LEON.standards.map((s, i) => `
    <div style="display:flex;align-items:flex-start;padding:2px 12px;gap:6px">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:var(--cream);font-size:7px;font-weight:700;color:var(--text-sec);flex-shrink:0">${i + 1}</span>
      <span style="flex:1">${boldTimes(s)}</span>
    </div>`).join('');

  let leonDev = '';
  if (LEON.development) {
    leonDev = `<div class="card avoid-break">
      <div class="cream-bar" style="background:var(--leon-bg);border-bottom-color:var(--leon-bdr);color:var(--leon-tx)">👶🏼 Leon's Development</div>
      ${LEON.development.pottyTraining ? `<div class="sub-title">Potty Training</div><ul style="padding:0 12px 4px 30px">${LEON.development.pottyTraining.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
      ${LEON.development.languageDev ? `<div class="sub-title">Language Development</div><ul style="padding:0 12px 4px 30px">${LEON.development.languageDev.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
    </div>`;
  }

  const body = `
    <h1 class="page-title">Team at a Glance</h1>
    <p class="page-subtitle">Sentosa, Singapore — Effective from 2 March 2026</p>

    <div class="grid-2">
      ${teamCard(h)}
      ${teamCard(n)}
    </div>

    <div class="card avoid-break">
      <div class="cream-bar">Side-by-Side Comparison</div>
      <table>
        <thead><tr><th style="width:120px"></th><th>Hazel</th><th>Nica</th></tr></thead>
        <tbody>${compRows}</tbody>
      </table>
    </div>

    <div class="card avoid-break">
      <div class="cream-bar" style="background:var(--leon-bg);border-bottom-color:var(--leon-bdr);color:var(--leon-tx)">👶🏼 Leon's Schedule</div>
      <table>
        <thead><tr><th style="width:90px">Time</th><th>Activity</th></tr></thead>
        <tbody>${leonRows}</tbody>
      </table>
    </div>

    <div class="card avoid-break">
      <div class="cream-bar" style="background:var(--leon-bg);border-bottom-color:var(--leon-bdr);color:var(--leon-tx)">👶🏼 Leon's Daily Standards (non-negotiable)</div>
      <div style="padding:4px 0">${leonStds}</div>
    </div>

    ${leonDev}
  `;

  return wrap('Overview — Household Dashboard', body, `
    .card { font-size: 9.5px; }
    td, li { font-size: 9.5px; }
  `);
}

// ─────────────────────────────────────────────────────────────
//  2. DAILY ROUTINES
// ─────────────────────────────────────────────────────────────

function buildDailyRoutinesHtml() {
  const detailRow = (label, value) =>
    `<div class="detail-label">${label}</div><div class="detail-value">${boldTimes(value)}</div>`;

  function renderHelper(routine, name) {
    const wh = routine.workingHours;
    const d = routine.daily;

    let html = `<div class="card">
      <div class="cream-bar">${name}</div>
      <div style="height:6px"></div>`;

    html += detailRow('Start', wh.start);
    html += detailRow('End', wh.end);
    html += detailRow('Rest', wh.rest);
    html += detailRow('Day off', wh.dayOff);
    if (wh.publicHolidays) html += detailRow('Public holidays', wh.publicHolidays);
    if (wh.sunday) html += detailRow('Sunday', wh.sunday);

    html += `<div style="height:8px"></div>`;

    if (d.morning) {
      html += `<div class="cream-bar cream-bar--sm">${boldTimes(d.morning.label)}</div>`;
      if (d.morning.items) {
        html += d.morning.items.map(item => `
          <div style="display:flex;align-items:flex-start;padding:2px 12px;gap:6px" class="avoid-break">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:var(--cream);font-size:7px;font-weight:700;color:var(--text-sec);flex-shrink:0;margin-top:2px">${item.num}</span>
            <div style="flex:1">
              <div style="font-weight:600">${boldTimes(item.title)}</div>
              ${item.desc ? `<div style="font-size:9px;color:var(--text-sec);margin-top:1px">${boldTimes(item.desc)}</div>` : ''}
            </div>
          </div>`).join('');
      }
      if (d.morning.sequence) {
        html += d.morning.sequence.map(s => `<div style="padding:2px 12px">${boldTimes(s)}</div>`).join('');
      }
      if (d.morning.endNote) {
        html += `<div style="font-size:8.5px;color:var(--text-muted);padding:2px 12px;font-style:italic">${boldTimes(d.morning.endNote)}</div>`;
      }
    }

    if (d.midday) {
      html += `<div class="cream-bar cream-bar--sm">${boldTimes(d.midday.label)}</div>`;
      if (d.midday.items) html += d.midday.items.map(i => `<div style="padding:2px 12px">${boldTimes(i)}</div>`).join('');
    }

    if (d.rest) {
      html += `<div class="cream-bar cream-bar--sm">REST</div>`;
      html += `<div style="padding:2px 12px">${boldTimes(d.rest)}</div>`;
    }

    if (d.afternoon) {
      html += `<div class="cream-bar cream-bar--sm">${boldTimes(d.afternoon.label)}</div>`;
      if (d.afternoon.items) {
        html += d.afternoon.items.map(item => `
          <div style="display:flex;justify-content:space-between;padding:2px 12px">
            <span>${boldTimes(item.task)}</span>
            <span style="font-size:9px;color:var(--text-muted);font-weight:600">${boldTimes(item.duration)}</span>
          </div>`).join('');
      }
      if (d.afternoon.sequence) {
        html += d.afternoon.sequence.map(s => `<div style="padding:2px 12px">${boldTimes(s)}</div>`).join('');
      }
    }

    if (d.evening) {
      html += `<div class="cream-bar cream-bar--sm">${boldTimes(d.evening.label)}</div>`;
      if (d.evening.items) {
        html += d.evening.items.map(item => `
          <div style="display:flex;padding:2px 12px;gap:8px">
            <span style="width:65px;font-weight:700;font-size:9px;color:var(--text-sec);flex-shrink:0">${boldTimes(item.time)}</span>
            <span style="flex:1">${boldTimes(item.task)}</span>
          </div>`).join('');
      }
      if (d.evening.sequence) {
        html += d.evening.sequence.map(s => `<div style="padding:2px 12px">${boldTimes(s)}</div>`).join('');
      }
    }

    html += `</div>`;
    return html;
  }

  const body = `
    <h1 class="page-title">Daily Routines</h1>
    <p class="page-subtitle">Detailed daily schedule for each helper</p>
    ${renderHelper(HAZEL_ROUTINE, 'Hazel — Full Daily Routine')}
    <div class="page-break"></div>
    ${renderHelper(NICA_ROUTINE, 'Nica — Full Daily Routine')}
  `;

  return wrap('Daily Routines — Household Dashboard', body);
}

// ─────────────────────────────────────────────────────────────
//  3. STANDARDS
// ─────────────────────────────────────────────────────────────

function buildStandardsHtml() {
  const std = STANDARDS;
  const list = (items) => `<ul style="padding:2px 8px 4px 30px">${items.map(i => `<li>${boldTimes(i)}</li>`).join('')}</ul>`;

  const fridgeHtml = `
    <div class="card wide avoid-break">
      <div class="cream-bar">Fridge Standards</div>
      <p class="intro">${std.fridge.intro}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:6px 8px">
        ${std.fridge.fridges.map(f => `
          <div style="background:var(--cream);border-radius:var(--radius);padding:6px 8px">
            <div style="font-size:9px;font-weight:700;color:var(--text-sec);text-transform:uppercase;margin-bottom:3px">${f.name}</div>
            <ul style="padding-left:16px;font-size:9px">${f.rules.map(r => `<li style="font-size:9px">${boldTimes(r)}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <div class="sub-title">Daily fridge check (Nica, 9:00 AM):</div>
      ${list(std.fridge.dailyCheck)}
    </div>`;

  const laundryHtml = `
    <div class="card avoid-break">
      <div class="cream-bar">Laundry Standards</div>
      <p class="important">Please learn all products we have and read labels how to use them — VERY IMPORTANT FOR ALL CLEANING PRODUCTS</p>
      <div class="sub-title">Hand-wash only (applies to everyone — Ilma, Emi, Leon):</div>
      ${list(std.laundry.handWash)}
      <div class="sub-title">Machine wash:</div>
      ${list(std.laundry.machineWash)}
      <div class="sub-title">Stain protocol:</div>
      ${list(std.laundry.stainProtocol)}
      <div class="sub-title">Linen schedule:</div>
      ${list(std.laundry.linenSchedule)}
    </div>`;

  const kitchenHtml = `
    <div class="card avoid-break">
      <div class="cream-bar">Kitchen Standards</div>
      <p class="important">Please learn all products we have and read labels how to use them — VERY IMPORTANT FOR ALL CLEANING PRODUCTS</p>
      <div class="sub-title">General:</div>
      ${list(std.kitchen.general)}
      <div class="sub-title">Cast Iron Care</div>
      ${std.kitchen.castIron.videoUrl ? `<p style="font-size:9px;padding:2px 8px;color:var(--text-sec)">Watch: <a href="${std.kitchen.castIron.videoUrl}" style="color:var(--accent)">${std.kitchen.castIron.videoUrl}</a></p>` : ''}
      <div class="sub-title">Rust Removal</div>
      ${list(std.kitchen.castIron.rustRemoval)}
      <div class="sub-title">Seasoning the Pan</div>
      <ol style="padding:2px 8px 4px 30px">${std.kitchen.castIron.seasoning.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>`;

  const moldHtml = `
    <div class="card avoid-break">
      <div class="cream-bar">💨 Mold & Humidity Management</div>
      <div class="sub-title">Windows</div>
      ${list(std.moldHumidity.windows)}
      <div class="sub-title">Dehumidifier</div>
      ${list(std.moldHumidity.dehumidifier)}
      <div class="sub-title">Fans</div>
      ${list(std.moldHumidity.fans)}
      <div class="sub-title">Wardrobes & Cabinets</div>
      ${list(std.moldHumidity.wardrobes)}
    </div>`;

  const orgScheduleRows = [1, 2, 3].map(w => {
    const rows = ORG_OVERVIEW.schedule.filter(r => r.week === w);
    return `<tr class="sec-div"><td colspan="4"><strong>Week ${w}</strong></td></tr>` +
      rows.map(r => `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${boldTimes(r.when)}</td><td>${r.who}</td></tr>`).join('');
  }).join('');

  const orgHtml = `
    <div class="card wide">
      <div class="cream-bar">📦 Organisation Standards</div>
      <div class="sub-title">Principles — ask yourself:</div>
      <ul style="padding:2px 8px 4px 30px">
        ${std.organisation.principles.map(p => `<li><strong>${p.title}</strong> — <em>${p.question}</em></li>`).join('')}
      </ul>
      <div class="sub-title">Active vs Passive Zone</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 8px">
        ${std.organisation.zones.map(z => `
          <div style="background:var(--cream);border-radius:var(--radius);padding:6px 8px">
            <div><strong>${z.name}</strong> <span style="font-size:8.5px;color:var(--text-muted)">(${z.freq})</span></div>
            <p style="font-size:9px;margin-top:3px;color:var(--text-sec)">${z.examples}</p>
          </div>`).join('')}
      </div>
      <div class="sub-title">House Rules</div>
      ${list(std.organisation.houseRules)}
      <div class="sub-title" style="margin-top:8px">Organisation Schedule (Weeks 1–3)</div>
      <p class="intro" style="padding-top:0;margin-bottom:6px">${boldTimes(ORG_OVERVIEW.intro)}</p>
      <table style="margin:0;width:100%">
        <thead><tr><th>Day</th><th>Focus</th><th>When</th><th>Who</th></tr></thead>
        <tbody>${orgScheduleRows}</tbody>
      </table>
      <div style="height:8px"></div>
    </div>`;

  const cookingHtml = `
    <div class="card wide avoid-break">
      <div class="cream-bar">🍳 Cooking Handover (Weeks 1–3)</div>
      <table style="margin:0;width:100%">
        <thead><tr><th></th><th>Week 1</th><th>Week 2</th><th>Week 3</th></tr></thead>
        <tbody>${COOKING_HANDOVER.map(r => `<tr><td><strong>${boldTimes(r.meal)}</strong></td><td>${r.w1}</td><td>${r.w2}</td><td>${r.w3}</td></tr>`).join('')}</tbody>
      </table>
      <div style="height:6px"></div>
    </div>`;

  const deepCleanHtml = `
    <div class="card wide avoid-break">
      <div class="cream-bar">🧹 Weekly Deep Clean Schedule</div>
      <p class="intro">${std.deepCleanSchedule.intro || ''}</p>
      <table style="margin:0;width:100%">
        <thead><tr><th>Day</th><th>Focus</th><th>Includes</th><th>When</th><th>Who</th></tr></thead>
        <tbody>${std.deepCleanSchedule.schedule.map(r =>
          `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${boldTimes(r.includes)}</td><td>${boldTimes(r.when)}</td><td>${r.who}</td></tr>`
        ).join('')}</tbody>
      </table>
      <div style="height:6px"></div>
    </div>`;

  const body = `
    <h1 class="page-title">Standards Quick Reference</h1>
    <p class="page-subtitle">Household rules and procedures</p>
    <div class="grid-2">
      ${fridgeHtml}
      ${laundryHtml}
      ${kitchenHtml}
      ${moldHtml}
      ${orgHtml}
      ${cookingHtml}
      ${deepCleanHtml}
    </div>
  `;

  return wrap('Standards — Household Dashboard', body);
}

// ─────────────────────────────────────────────────────────────
//  4. WEEK CHECKLIST (parameterized for any week)
// ─────────────────────────────────────────────────────────────

function buildWeekHtml(weekNum) {
  const weekDays = WEEK_DAYS.filter(d => d.weekNum === weekNum);
  if (!weekDays.length) return wrap('No data', '<p>No checklist data for this week.</p>');

  const weekTitles = {
    1: 'Week 1 — 2–8 March 2026',
    2: 'Week 2 — 9–15 March 2026',
    3: 'Week 3 — 16–22 March 2026',
    4: 'Week 4+ — Upkeep & Deep Cleaning',
  };

  // Admin key dates
  const ADMIN_DATES = {
    1: [
      '📌 <strong>Monday 2 March</strong> — Medical check-up at <strong>4:00 PM</strong>. Nica takes Hazel to clinic. Replaces afternoon org.',
      '📌 <strong>Wednesday 4 March</strong> — SIP (Settling-In Programme). Hazel away <strong>8:00 AM–~6:45 PM</strong>.',
    ],
    2: [
      '📌 <strong>Monday 9 March</strong> — Painter coming at <strong>11:00 AM</strong>.',
      '📌 <strong>Tuesday 10 March</strong> — Card registration at <strong>8:50 AM</strong>. Hazel leaves <strong>8:15 AM</strong>, back ~<strong>10:15 AM</strong> (~2 hrs).',
      '📌 <strong>Wednesday 11 March</strong> — Aircon service — estimated arrival <strong>10:00–10:30 AM</strong>.',
    ],
  };
  const adminItems = ADMIN_DATES[weekNum];
  let adminHtml = '';
  if (adminItems?.length) {
    adminHtml = `
      <div class="card avoid-break">
        <div class="cream-bar">House Errands — Key Dates</div>
        <ul style="padding:6px 12px 6px 30px">
          ${adminItems.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>`;
  }

  // Deep clean overview (week 4 only)
  let deepCleanOverviewHtml = '';
  if (weekNum === 4) {
    deepCleanOverviewHtml = `
      <div class="card avoid-break">
        <div class="cream-bar">🧹 Weekly Deep Clean Overview</div>
        <p class="intro">Deep cleaning replaces organisation in Hazel\u2019s afternoon slot (4:30\u20136:00, 1.5\u20132 hrs). Daily upkeep keeps things tidy \u2014 deep cleaning ensures nothing builds up.</p>
        <table>
          <thead><tr><th>Day</th><th>Focus</th><th>Includes</th></tr></thead>
          <tbody>${DEEP_CLEAN_OVERVIEW.map(r =>
            `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${r.includes}</td></tr>`
          ).join('')}</tbody>
        </table>
      </div>`;
  }

  const renderDay = (day, isFirst) => {
    let dayOffBanner = '';
    if (day.hazelOff) dayOffBanner = `<span style="font-size:8.5px;font-weight:600;color:var(--text-muted);background:var(--cream);padding:2px 8px;border-radius:3px">Hazel's day off</span>`;
    if (day.nicaOff) dayOffBanner = `<span style="font-size:8.5px;font-weight:600;color:var(--text-muted);background:var(--cream);padding:2px 8px;border-radius:3px">Nica's day off</span>`;

    const dateDisplay = day.date
      ? `<span style="font-size:11px;color:var(--text-sec);margin-left:8px">${day.date}</span>`
      : '';

    let annotations = [];
    if (day.adminEvents?.length) {
      day.adminEvents.forEach(e => annotations.push(`<span class="annotation ann--admin">📌 ${boldTimes(e)}</span>`));
    }
    if (day.orgTask) {
      const timeLabel = day.orgTime ? ` — ${boldTimes(day.orgTime)}` : '';
      if (day.orgType === 'joint') {
        annotations.push(`<span class="annotation ann--org">📦 Org: ${day.orgTask}${timeLabel}</span>`);
      } else {
        annotations.push(`<span class="annotation ann--org">📦 Org (solo PM): ${day.orgTask}${timeLabel}</span>`);
      }
    }
    if (day.leonActivity) {
      annotations.push(`<span class="annotation ann--leon">👶🏼 Leon: ${boldTimes(day.leonActivity)}</span>`);
    }
    if (day.deepClean) {
      annotations.push(`<span class="annotation ann--dc">🧹 Deep clean: ${day.deepClean}</span>`);
    }

    const annotationsHtml = annotations.length
      ? `<div style="padding:4px 0;display:flex;flex-wrap:wrap;gap:4px">${annotations.join('')}</div>`
      : '';

    const specialHtml = day.specialNote
      ? `<div style="font-size:9px;padding:3px 8px;margin:3px 0;background:var(--org-bg);border:1px solid var(--org-bdr);border-radius:3px;color:var(--org-tx)">${boldTimes(day.specialNote)}</div>`
      : '';

    const rowsHtml = day.rows.map(row => {
      if (row.section !== undefined) {
        if (row.section === 'HAZEL DAY OFF') {
          return `<tr class="sec-div">
            <td></td>
            <td></td>
            <td>${row.nicaSection ? boldTimes(row.nicaSection) : ''}</td>
            <td></td>
          </tr>`;
        }
        return `<tr class="sec-div">
          <td></td>
          <td>${boldTimes(row.section)}</td>
          <td>${row.nicaSection ? boldTimes(row.nicaSection) : ''}</td>
          <td></td>
        </tr>`;
      }
      const hClass = cellClass(row.hazel);
      const nClass = cellClass(row.nica);
      const isDayOff = (row.hazel || '').includes('DAY OFF') || (row.nica || '').includes('DAY OFF');
      return `<tr>
        <td style="width:55px;font-size:9px;color:var(--text-sec);font-weight:600">${boldTimes((row.time || '').replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F3FB}-\u{1F3FF}]/gu, '').trim())}</td>
        <td class="${hClass}">${(row.hazel || '') === 'DAY OFF' ? '' : boldTimes(row.hazel || '')}</td>
        <td class="${nClass}">${(row.nica || '') === 'DAY OFF' ? '' : boldTimes(row.nica || '')}</td>
        <td style="width:26px;text-align:center">${isDayOff ? '' : '<span class="cb"></span>'}</td>
      </tr>`;
    }).join('');

    const reflectionHtml = `
        <div class="refl">
          <div class="refl-heading">End of day</div>
          <div class="refl-field"><span class="refl-label">What went well?</span><div class="write-line"></div></div>
          <div class="refl-field"><span class="refl-label">Difficult?</span><div class="write-line"></div></div>
          <div class="refl-field"><span class="refl-label">Need from Ilma?</span><div class="write-line"></div></div>
        </div>`;

    return `
      <article ${isFirst ? '' : 'class="page-break"'}>
        <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid var(--border);padding-bottom:4px;margin-bottom:4px">
          <div style="display:flex;align-items:baseline">
            <span style="font-size:16px;font-weight:700">${day.dayName}</span>
            ${dateDisplay}
          </div>
          ${dayOffBanner}
        </div>
        ${specialHtml}
        ${annotationsHtml}
        <table>
          <thead><tr>
            <th style="width:55px"></th>
            <th style="width:42%">${day.hazelOff ? '' : 'Hazel'}</th>
            <th style="width:42%">${day.nicaOff ? '' : 'Nica'}</th>
            <th style="width:26px"></th>
          </tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        ${reflectionHtml}
      </article>`;
  };

  const daysHtml = weekDays.map((day, i) => renderDay(day, i === 0)).join('');

  const body = `
    <h1 class="page-title">${weekTitles[weekNum] || `Week ${weekNum}`}</h1>
    ${weekNum === 4 ? '<p class="page-subtitle">From 23 March 2026 — Reusable weekly template</p>' : ''}
    ${adminHtml}
    ${deepCleanOverviewHtml}
    ${daysHtml}
  `;

  return wrap(`${weekTitles[weekNum] || `Week ${weekNum}`} — Household Dashboard`, body, `
    article + article { margin-top: 0; }
  `);
}

// ─────────────────────────────────────────────────────────────
//  Print Window
// ─────────────────────────────────────────────────────────────

function openPrintWindow(html) {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Pop-up blocked — please allow pop-ups for this site to print.');
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
  // Wait for content to render before triggering print
  win.addEventListener('load', () => {
    win.print();
  });
}

// ─────────────────────────────────────────────────────────────
//  Public API
// ─────────────────────────────────────────────────────────────

const PAGE_BUILDERS = {
  overview:  () => buildOverviewHtml(),
  routines:  () => buildDailyRoutinesHtml(),
  standards: () => buildStandardsHtml(),
  week1:     () => buildWeekHtml(1),
  week2:     () => buildWeekHtml(2),
  week3:     () => buildWeekHtml(3),
  week4:     () => buildWeekHtml(4),
};

export function printPage(pageId) {
  const builder = PAGE_BUILDERS[pageId];
  if (!builder) {
    alert(`No print template for page: ${pageId}`);
    return;
  }
  openPrintWindow(builder());
}

export function printAll() {
  // Build all sections into one document
  const sections = [
    buildOverviewHtml(),
    buildDailyRoutinesHtml(),
    buildStandardsHtml(),
    buildWeekHtml(1),
    buildWeekHtml(2),
    buildWeekHtml(3),
    buildWeekHtml(4),
  ];

  // Extract body content from each, combine into one document
  const bodies = sections.map(html => {
    const match = html.match(/<body>([\s\S]*)<\/body>/);
    return match ? match[1] : '';
  });

  const combined = wrap('Household Dashboard — Complete', bodies.join('<div class="page-break"></div>'));
  openPrintWindow(combined);
}
