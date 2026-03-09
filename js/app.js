import {
  TASK_TYPES,
  TEAM_OVERVIEW,
  HAZEL_ROUTINE,
  NICA_ROUTINE,
  LEON,
  STANDARDS,
  COOKING_HANDOVER,
  ORG_OVERVIEW,
  DEEP_CLEAN_OVERVIEW,
  WEEK_DAYS
} from './data.js?v=45';
import { printPage, printAll } from './print-clean.js?v=45';
import { AdminPanel } from './admin.js?v=45';

const { S, O, A, L, D, SEC } = TASK_TYPES;

// Bold all time references (7:30, 4:00 PM, 9:00–10:30, 2 PM) and frequencies (3x daily, 2x daily)
function boldTimes(text) {
  if (!text) return text;
  return text.replace(/(\d{1,2}:\d{2}(?:\s*(?:AM|PM))?(?:\s*[–\-~]+\s*~?\d{1,2}:\d{2}(?:\s*(?:AM|PM))?)?|\b\d{1,2}\s+(?:AM|PM)\b|\b\d+x\s+daily\b)/gi, '<strong>$1</strong>');
}

// Detect task type from cell text based on emoji content
function getCellTypeClass(text) {
  if (!text) return '';
  if (text.includes('\u{1F476}')) return 'task--leon';         // 👶🏼
  if (text.includes('\u{1F4E6}')) return 'task--organisation'; // 📦
  if (text.includes('\u270D') || text.includes('\u{1F4CC}')) return 'task--admin'; // ✍🏻 or 📌
  if (text.includes('\u{1F9F9}')) return 'task--deep-clean';   // 🧹
  return '';
}

class DashboardApp {
  constructor() {
    this.isAdmin = new URLSearchParams(window.location.search).has('admin');
    this.currentPage = null;
    this.checkboxState = this.loadCheckboxState();
    this.pages = [
      { id: 'overview',  label: 'Overview',            icon: '\u{1F3E0}', group: 'reference' },
      { id: 'routines',  label: 'Daily Routines',      icon: '\u{1F552}', group: 'reference' },
      { id: 'standards', label: 'Standards',            icon: '\u{1F4CB}', group: 'reference' },
      { id: 'week1',     label: 'Week 1 (2\u20138 Mar)',   icon: '1',  group: 'checklist' },
      { id: 'week2',     label: 'Week 2 (9\u201315 Mar)',  icon: '2',  group: 'checklist' },
      { id: 'week3',     label: 'Week 3 (16\u201322 Mar)', icon: '3',  group: 'checklist' },
      { id: 'week4',     label: 'Week 4+ Template',    icon: '\u{1F9F9}', group: 'template' },
    ];
  }

  init() {
    this.renderAllPages();
    this.renderSidebar();
    this.renderLegend();
    this.bindHeaderActions();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());

    // Admin mode: PIN-protected personal panel
    if (this.isAdmin) {
      const PIN_HASH = '9113b98df80f877c7a2ee5d865a04c9514b4e9bf25a49d315b0b15f115d2f0d2'; // SHA-256 of PIN
      const unlocked = sessionStorage.getItem('admin-unlocked') === 'yes';
      if (unlocked) {
        this.adminPanel = new AdminPanel(this);
        this.adminPanel.init();
        document.body.classList.add('admin-mode');
      } else {
        this.showPinScreen(PIN_HASH);
      }
    }
  }

  // === PIN Screen ===
  showPinScreen(pinHash) {
    document.body.innerHTML = `
      <div class="pin-screen">
        <div class="pin-box">
          <h2>🔒 Admin Access</h2>
          <p>Enter your PIN to continue</p>
          <input type="password" id="pin-input" maxlength="10" placeholder="PIN" autofocus>
          <button id="pin-btn" class="btn-admin">Unlock</button>
          <p id="pin-error" class="pin-error" style="display:none">Wrong PIN. Try again.</p>
        </div>
      </div>`;
    const input = document.getElementById('pin-input');
    const btn = document.getElementById('pin-btn');
    const err = document.getElementById('pin-error');
    const verify = async () => {
      const pin = input.value;
      const encoded = new TextEncoder().encode(pin);
      const hashBuf = await crypto.subtle.digest('SHA-256', encoded);
      const hash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hash === pinHash) {
        sessionStorage.setItem('admin-unlocked', 'yes');
        window.location.reload();
      } else {
        err.style.display = '';
        input.value = '';
        input.focus();
      }
    };
    btn.addEventListener('click', verify);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') verify(); });
  }

  // === Routing ===
  handleRoute() {
    const hash = window.location.hash.slice(1) || 'overview';
    this.showPage(hash);
  }

  showPage(pageId) {
    const page = this.pages.find(p => p.id === pageId);
    if (!page) { this.showPage('overview'); return; }

    // Toggle active page visibility
    document.querySelectorAll('.dashboard-page').forEach(el => {
      el.classList.toggle('is-active', el.dataset.pageId === pageId);
    });

    // Update nav
    document.querySelectorAll('.nav-page').forEach(el => {
      el.classList.toggle('is-active', el.dataset.pageId === pageId);
    });

    this.currentPage = pageId;

    // Scroll content to top
    const content = document.getElementById('content');
    if (content) content.scrollTop = 0;
  }

  // === Render All Pages Into DOM ===
  renderAllPages() {
    const content = document.getElementById('content');
    content.innerHTML = this.pages.map(p => {
      let html = '';
      switch (p.id) {
        case 'overview':  html = this.renderOverview(); break;
        case 'routines':  html = this.renderRoutines(); break;
        case 'standards': html = this.renderStandards(); break;
        case 'week1':     html = this.renderWeekChecklist(1); break;
        case 'week2':     html = this.renderWeekChecklist(2); break;
        case 'week3':     html = this.renderWeekChecklist(3); break;
        case 'week4':     html = this.renderWeek4Template(); break;
      }
      return `<div class="dashboard-page" data-page-id="${p.id}">${html}</div>`;
    }).join('');

    this.bindCheckboxes();
  }

  // === PAGE 1: Overview ===
  renderOverview() {
    const h = TEAM_OVERVIEW.hazel;
    const n = TEAM_OVERVIEW.nica;

    const renderSplit = (splits) => splits.map(s =>
      `<tr><td>${s.area}</td><td class="pct">${s.pct}</td></tr>`
    ).join('');

    const renderComparison = () => {
      const c = TEAM_OVERVIEW.comparison;
      return c.map(row =>
        `<tr>
          <td class="comp-label">${row.label}</td>
          <td>${boldTimes(row.hazel)}</td>
          <td>${boldTimes(row.nica)}</td>
        </tr>`
      ).join('');
    };

    const renderLeonSchedule = () => {
      const sectionNames = ['MORNING', 'MIDDAY', 'AFTERNOON', 'EVENING'];
      return LEON.schedule.map(item => {
        if (!item.time && sectionNames.includes(item.activity)) {
          return `<tr class="leon-section-row"><td colspan="2">${item.activity}</td></tr>`;
        }
        let subHtml = '';
        if (item.sub) {
          subHtml = item.sub.map(s => `<div class="leon-sub">\u2197 ${boldTimes(s)}</div>`).join('');
        }
        return `<tr>
          <td class="leon-time">${boldTimes(item.time || '')}</td>
          <td>${boldTimes(item.activity)}${subHtml}</td>
        </tr>`;
      }).join('');
    };

    const renderLeonStandards = () => {
      return LEON.standards.map((s, i) =>
        `<div class="leon-standard"><span class="leon-standard__num">${i + 1}</span><span>${boldTimes(s)}</span></div>`
      ).join('');
    };

    return `
      <h2 class="page-title">Team at a Glance</h2>
      <p class="page-subtitle">Sentosa, Singapore \u2014 Effective from 2 March 2026</p>

      <div class="team-grid">
        <div class="team-card team-card--hazel">
          <div class="team-card__header">
            <h3>${h.name}</h3>
            <span class="team-card__focus">${h.focus}</span>
          </div>
          <div class="team-card__details">
            <div class="detail-row"><span class="detail-label">Hours</span><span>${boldTimes(h.hours)}</span></div>
            <div class="detail-row"><span class="detail-label">Day off</span><span>${h.dayOff}</span></div>
            <div class="detail-row"><span class="detail-label">Rest</span><span>${boldTimes(h.rest)}</span></div>
            <div class="detail-row"><span class="detail-label">Primary focus</span><span>${h.primaryFocus}</span></div>
          </div>
          <table class="split-table">
            <thead><tr><th>Area</th><th>%</th></tr></thead>
            <tbody>${renderSplit(h.responsibilitySplit)}</tbody>
          </table>
          ${h.note ? `<p class="team-card__note">${h.note}</p>` : ''}
        </div>

        <div class="team-card team-card--nica">
          <div class="team-card__header">
            <h3>${n.name}</h3>
            <span class="team-card__focus">${n.focus}</span>
          </div>
          <div class="team-card__details">
            <div class="detail-row"><span class="detail-label">Hours</span><span>${boldTimes(n.hours)}</span></div>
            <div class="detail-row"><span class="detail-label">Day off</span><span>${n.dayOff}</span></div>
            <div class="detail-row"><span class="detail-label">Rest</span><span>${boldTimes(n.rest)}</span></div>
            <div class="detail-row"><span class="detail-label">Primary focus</span><span>${n.primaryFocus}</span></div>
            ${n.householdDuties ? `<div class="detail-row detail-row--sub"><span class="detail-label">Household duties</span><ul class="standards-list">${n.householdDuties.map(d => `<li>${d}</li>`).join('')}</ul></div>` : ''}
          </div>
          <table class="split-table">
            <thead><tr><th>Area</th><th>%</th></tr></thead>
            <tbody>${renderSplit(n.responsibilitySplit)}</tbody>
          </table>
          ${n.note ? `<p class="team-card__note">${n.note}</p>` : ''}
        </div>
      </div>

      <div class="comparison-section">
        <h3 class="section-title">Side-by-Side Comparison</h3>
        <table class="comparison-table">
          <thead><tr><th></th><th>Hazel</th><th>Nica</th></tr></thead>
          <tbody>${renderComparison()}</tbody>
        </table>
      </div>

      <div class="leon-section">
        <h3 class="section-title">👶🏼 Leon\u2019s Schedule</h3>
        <table class="leon-schedule-table">
          <thead><tr><th>Time</th><th>Activity</th></tr></thead>
          <tbody>${renderLeonSchedule()}</tbody>
        </table>
      </div>

      <div class="leon-section">
        <h3 class="section-title">Leon\u2019s Daily Standards (non-negotiable)</h3>
        <div class="leon-standards-grid">${renderLeonStandards()}</div>
      </div>

      ${LEON.development ? `
      <div class="leon-section">
        <h3 class="section-title">Leon\u2019s Development</h3>
        ${LEON.development.pottyTraining ? `
          <h4 class="subsection-title">Potty Training</h4>
          <ul class="standards-list">${LEON.development.pottyTraining.map(i => `<li>${i}</li>`).join('')}</ul>
        ` : ''}
        ${LEON.development.languageDev ? `
          <h4 class="subsection-title">Language Development</h4>
          <ul class="standards-list">${LEON.development.languageDev.map(i => `<li>${i}</li>`).join('')}</ul>
        ` : ''}
      </div>
      ` : ''}
    `;
  }

  // === PAGE 2: Daily Routines ===
  renderRoutines() {
    const renderMorningItems = (items) => items.map(item =>
      `<div class="routine-item">
        <span class="routine-item__num">${item.num}</span>
        <div class="routine-item__content">
          <div class="routine-item__title">${boldTimes(item.title)}</div>
          ${item.desc ? `<div class="routine-item__desc">${boldTimes(item.desc)}</div>` : ''}
        </div>
      </div>`
    ).join('');

    const renderTimedItems = (items) => items.map(item =>
      `<div class="routine-timed-item">
        <span class="routine-timed-item__time">${boldTimes(item.time)}</span>
        <span>${boldTimes(item.task)}</span>
      </div>`
    ).join('');

    const renderDurationItems = (items) => items.map(item =>
      `<div class="routine-duration-item">
        <span>${boldTimes(item.task)}</span>
        <span class="routine-duration-item__dur">${boldTimes(item.duration)}</span>
      </div>`
    ).join('');

    const renderRoutineBlocks = (routine, name) => {
      let html = `<div class="routine-helper">
        <h3 class="routine-helper__name">${name}</h3>`;

      if (routine.workingHours) {
        const wh = routine.workingHours;
        html += `<div class="routine-hours">
          <div class="detail-row"><span class="detail-label">Start</span><span>${boldTimes(wh.start)}</span></div>
          <div class="detail-row"><span class="detail-label">End</span><span>${boldTimes(wh.end)}</span></div>
          <div class="detail-row"><span class="detail-label">Rest</span><span>${boldTimes(wh.rest)}</span></div>
          <div class="detail-row"><span class="detail-label">Day off</span><span>${wh.dayOff}</span></div>
          ${wh.publicHolidays ? `<div class="detail-row"><span class="detail-label">Public holidays</span><span>${wh.publicHolidays}</span></div>` : ''}
          ${wh.sunday ? `<div class="detail-row"><span class="detail-label">Sunday</span><span>${boldTimes(wh.sunday)}</span></div>` : ''}
        </div>`;
      }

      const d = routine.daily;

      // Morning
      if (d.morning) {
        html += `<div class="routine-block routine-block--morning">
          <div class="routine-block__label">${boldTimes(d.morning.label)}</div>`;
        if (d.morning.items) {
          html += renderMorningItems(d.morning.items);
        }
        if (d.morning.sequence) {
          html += d.morning.sequence.map(s => `<div class="routine-sequence-item">${boldTimes(s)}</div>`).join('');
        }
        if (d.morning.endNote) {
          html += `<div class="routine-block__note">${boldTimes(d.morning.endNote)}</div>`;
        }
        html += `</div>`;
      }

      // Midday
      if (d.midday) {
        html += `<div class="routine-block routine-block--midday">
          <div class="routine-block__label">${boldTimes(d.midday.label)}</div>
          ${d.midday.items ? d.midday.items.map(i => `<div class="routine-sequence-item">${boldTimes(i)}</div>`).join('') : ''}
        </div>`;
      }

      // Rest
      if (d.rest) {
        html += `<div class="routine-block routine-block--rest">
          <div class="routine-block__label">REST</div>
          <div class="routine-sequence-item">${boldTimes(d.rest)}</div>
        </div>`;
      }

      // Afternoon
      if (d.afternoon) {
        html += `<div class="routine-block routine-block--afternoon">
          <div class="routine-block__label">${boldTimes(d.afternoon.label)}</div>
          ${d.afternoon.items ? renderDurationItems(d.afternoon.items) : ''}
          ${d.afternoon.sequence ? d.afternoon.sequence.map(s => `<div class="routine-sequence-item">${boldTimes(s)}</div>`).join('') : ''}
        </div>`;
      }

      // Evening
      if (d.evening) {
        html += `<div class="routine-block routine-block--evening">
          <div class="routine-block__label">${boldTimes(d.evening.label)}</div>
          ${d.evening.items ? renderTimedItems(d.evening.items) : ''}
          ${d.evening.sequence ? d.evening.sequence.map(s => `<div class="routine-sequence-item">${boldTimes(s)}</div>`).join('') : ''}
        </div>`;
      }

      html += `</div>`;
      return html;
    };

    return `
      <h2 class="page-title">Daily Routines</h2>
      <p class="page-subtitle">Detailed daily schedule for each helper</p>
      ${renderRoutineBlocks(HAZEL_ROUTINE, 'Hazel \u2014 Full Daily Routine')}
      ${renderRoutineBlocks(NICA_ROUTINE, 'Nica \u2014 Full Daily Routine')}
    `;
  }

  // === PAGE 3: Standards ===
  renderStandards() {
    const std = STANDARDS;

    const renderList = (items) => items.map(i => `<li>${i}</li>`).join('');

    // Fridge section
    const fridgeHtml = `
      <div class="standards-card standards-card--wide">
        <h3 class="standards-card__title">Fridge Standards</h3>
        <p class="standards-card__intro">${std.fridge.intro}</p>
        <div class="fridge-grid">
          ${std.fridge.fridges.map(f => `
            <div class="fridge-sub-card">
              <h4 class="fridge-sub-card__title">${f.name}</h4>
              <ul class="standards-list">${renderList(f.rules)}</ul>
            </div>
          `).join('')}
        </div>
        <div class="fridge-daily-check">
          <h4 class="subsection-title">Daily fridge check (Nica, 9:00 AM):</h4>
          <ul class="standards-list">${renderList(std.fridge.dailyCheck)}</ul>
        </div>
      </div>
    `;

    // Laundry section
    const laundryHtml = `
      <div class="standards-card">
        <h3 class="standards-card__title">Laundry Standards</h3>
        <p class="standards-card__important">Please learn all products we have and read labels how to use them \u2014 VERY IMPORTANT FOR ALL CLEANING PRODUCTS</p>
        <h4 class="subsection-title">Hand-wash only (applies to everyone \u2014 Ilma, Emi, Leon):</h4>
        <ul class="standards-list">${renderList(std.laundry.handWash)}</ul>
        <h4 class="subsection-title">Machine wash:</h4>
        <ul class="standards-list">${renderList(std.laundry.machineWash)}</ul>
        <h4 class="subsection-title">Stain protocol:</h4>
        <ul class="standards-list">${renderList(std.laundry.stainProtocol)}</ul>
        <h4 class="subsection-title">Linen schedule:</h4>
        <ul class="standards-list">${renderList(std.laundry.linenSchedule)}</ul>
      </div>
    `;

    // Kitchen section
    const kitchenHtml = `
      <div class="standards-card">
        <h3 class="standards-card__title">Kitchen Standards</h3>
        <p class="standards-card__important">Please learn all products we have and read labels how to use them \u2014 VERY IMPORTANT FOR ALL CLEANING PRODUCTS</p>
        <h4 class="subsection-title">General:</h4>
        <ul class="standards-list">${renderList(std.kitchen.general)}</ul>
        <h4 class="subsection-title">Cast Iron Care</h4>
        ${std.kitchen.castIron.videoUrl ? `<p class="cast-iron-link">Watch: <a href="${std.kitchen.castIron.videoUrl}" target="_blank">${std.kitchen.castIron.videoUrl}</a></p>` : ''}
        <h4 class="subsection-title">Rust Removal</h4>
        <ul class="standards-list">${renderList(std.kitchen.castIron.rustRemoval)}</ul>
        <h4 class="subsection-title">Seasoning the Pan</h4>
        <ol class="org-principles">${std.kitchen.castIron.seasoning.map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
    `;

    // Mold & Humidity Management
    const moldHtml = `
      <div class="standards-card">
        <h3 class="standards-card__title">\u{1F4A8} Mold & Humidity Management</h3>
        <h4 class="subsection-title">Windows</h4>
        <ul class="standards-list">${renderList(std.moldHumidity.windows)}</ul>
        <h4 class="subsection-title">Dehumidifier</h4>
        <ul class="standards-list">${renderList(std.moldHumidity.dehumidifier)}</ul>
        <h4 class="subsection-title">Fans</h4>
        <ul class="standards-list">${renderList(std.moldHumidity.fans)}</ul>
        <h4 class="subsection-title">Wardrobes & Cabinets</h4>
        <ul class="standards-list">${renderList(std.moldHumidity.wardrobes)}</ul>
      </div>
    `;

    // Organisation section
    const orgHtml = `
      <div class="standards-card standards-card--wide">
        <h3 class="standards-card__title">\u{1F4E6} Organisation Standards</h3>
        <h4 class="subsection-title">Principles \u2014 ask yourself:</h4>
        <ul class="org-principles">
          ${std.organisation.principles.map(p =>
            `<li><strong>${p.title}</strong> \u2014 <em>${p.question}</em></li>`
          ).join('')}
        </ul>
        <h4 class="subsection-title">Active vs Passive Zone</h4>
        <div class="org-zones">
          ${std.organisation.zones.map(z =>
            `<div class="org-zone">
              <strong>${z.name}</strong> <span class="org-zone__freq">(${z.freq})</span>
              <p>${z.examples}</p>
            </div>`
          ).join('')}
        </div>
        <h4 class="subsection-title">House Rules</h4>
        <ul class="standards-list">${renderList(std.organisation.houseRules)}</ul>
        <h4 class="subsection-title">Organisation Schedule (Weeks 1\u20133)</h4>
        <p class="standards-card__intro" style="border:none;padding-top:0">${boldTimes(ORG_OVERVIEW.intro)}</p>
        <table class="overview-table">
          <thead><tr><th>Day</th><th>Focus</th><th>When</th><th>Who</th></tr></thead>
          <tbody>${[1, 2, 3].map(w => {
            const rows = ORG_OVERVIEW.schedule.filter(r => r.week === w);
            return `<tr class="week-divider-row"><td colspan="4"><strong>Week ${w}</strong></td></tr>` +
              rows.map(r =>
                `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${boldTimes(r.when)}</td><td>${r.who}</td></tr>`
              ).join('');
          }).join('')}</tbody>
        </table>
      </div>
    `;

    // Cooking handover
    const cookingHtml = `
      <div class="standards-card standards-card--wide">
        <h3 class="standards-card__title">\u{1F373} Cooking Handover (Weeks 1\u20133)</h3>
        <table class="overview-table">
          <thead><tr><th></th><th>Week 1</th><th>Week 2</th><th>Week 3</th></tr></thead>
          <tbody>${COOKING_HANDOVER.map(r =>
            `<tr><td><strong>${boldTimes(r.meal)}</strong></td><td>${r.w1}</td><td>${r.w2}</td><td>${r.w3}</td></tr>`
          ).join('')}</tbody>
        </table>
      </div>
    `;

    // Deep clean schedule
    const deepCleanHtml = `
      <div class="standards-card standards-card--wide">
        <h3 class="standards-card__title">\u{1F9F9} Weekly Deep Clean Schedule</h3>
        <p class="standards-card__intro">${std.deepCleanSchedule.intro || ''}</p>
        <table class="overview-table">
          <thead><tr><th>Day</th><th>Focus</th><th>Includes</th><th>When</th><th>Who</th></tr></thead>
          <tbody>${std.deepCleanSchedule.schedule.map(r =>
            `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${r.includes}</td><td>${boldTimes(r.when)}</td><td>${r.who}</td></tr>`
          ).join('')}</tbody>
        </table>
      </div>
    `;

    return `
      <h2 class="page-title">Standards Quick Reference</h2>
      <p class="page-subtitle">Household rules and procedures</p>
      <div class="standards-grid">
        ${fridgeHtml}
        ${laundryHtml}
        ${kitchenHtml}
        ${moldHtml}
        ${orgHtml}
        ${cookingHtml}
        ${deepCleanHtml}
      </div>
    `;
  }

  // === PAGES 4-6: Week Checklists ===
  renderWeekChecklist(weekNum) {
    const weekDays = WEEK_DAYS.filter(d => d.weekNum === weekNum);
    const weekTitles = { 1: 'Week 1 \u2014 2\u20138 March 2026', 2: 'Week 2 \u2014 9\u201315 March 2026', 3: 'Week 3 \u2014 16\u201322 March 2026' };

    // Admin key dates per week
    const ADMIN_KEY_DATES = {
      1: [
        '\u{1F4CC} <strong>Monday 2 March</strong> \u2014 Medical check-up at <strong>4:00 PM</strong>. Nica takes Hazel to clinic. Replaces afternoon org.',
        '\u{1F4CC} <strong>Wednesday 4 March</strong> \u2014 SIP (Settling-In Programme). Hazel away <strong>8:00 AM\u2013~6:45 PM</strong>.',
      ],
      2: [
        '\u{1F4CC} <strong>Monday 9 March</strong> \u2014 Painter coming at <strong>11:00 AM</strong>.',
        '\u{1F4CC} <strong>Tuesday 10 March</strong> \u2014 Card registration at <strong>8:50 AM</strong>. Hazel leaves <strong>8:15 AM</strong>, back ~<strong>10:15 AM</strong> (~2 hrs).',
        '\u{1F4CC} <strong>Wednesday 11 March</strong> \u2014 Aircon service \u2014 estimated arrival <strong>10:00\u201310:30 AM</strong>.',
      ],
    };
    const adminDates = ADMIN_KEY_DATES[weekNum];
    let adminHtml = '';
    if (adminDates && adminDates.length) {
      adminHtml = `
        <div class="admin-dates-card">
          <h4 class="admin-dates-card__title">House Errands \u2014 Key Dates</h4>
          <ul class="standards-list">${adminDates.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>`;
    }

    // Daily checklists
    const daysHtml = weekDays.map(day => this.renderChecklistDay(day)).join('');

    return `
      <h2 class="page-title">${weekTitles[weekNum]}</h2>
      ${adminHtml}
      ${daysHtml}
    `;
  }

  // === PAGE 7: Week 4+ Template ===
  renderWeek4Template() {
    const weekDays = WEEK_DAYS.filter(d => d.weekNum === 4);

    const deepCleanHtml = `
      <div class="overview-section">
        <h4 class="overview-section__title">Weekly Deep Clean Overview</h4>
        <p class="overview-intro">Deep cleaning replaces organisation in Hazel\u2019s afternoon slot (4:30\u20136:00, 1.5\u20132 hrs). Daily upkeep keeps things tidy \u2014 deep cleaning ensures nothing builds up.</p>
        <table class="overview-table">
          <thead><tr><th>Day</th><th>Focus</th><th>Includes</th></tr></thead>
          <tbody>${DEEP_CLEAN_OVERVIEW.map(r =>
            `<tr><td><strong>${r.day}</strong></td><td>${r.focus}</td><td>${r.includes}</td></tr>`
          ).join('')}</tbody>
        </table>
      </div>`;

    const daysHtml = weekDays.map(day => this.renderChecklistDay(day)).join('');

    return `
      <h2 class="page-title">Week 4+ \u2014 Upkeep & Deep Cleaning</h2>
      <p class="page-subtitle">From 23 March 2026 \u2014 Reusable weekly template</p>
      <div class="week-of-line">
        <span class="week-of-label">Week of:</span>
        <span class="write-line write-line--wide"></span>
      </div>
      ${deepCleanHtml}
      ${daysHtml}
    `;
  }

  // === Render: Single Checklist Day ===
  renderChecklistDay(day) {
    // Annotations above the table — split into Hazel / Nica / Shared columns
    let annotationsHtml = '';
    const hazelAnnotations = [];
    const nicaAnnotations = [];
    const sharedAnnotations = [];

    if (day.adminEvents && day.adminEvents.length) {
      day.adminEvents.forEach(e => {
        sharedAnnotations.push(`<div class="annotation annotation--admin">\u{1F4CC} ${boldTimes(e)}</div>`);
      });
    }

    if (day.orgTask) {
      const timeLabel = day.orgTime ? ` \u2014 ${boldTimes(day.orgTime)}` : '';
      if (day.orgType === 'joint') {
        sharedAnnotations.push(`<div class="annotation annotation--org">\u{1F4E6} Org: ${day.orgTask}${timeLabel}</div>`);
      } else {
        hazelAnnotations.push(`<div class="annotation annotation--org">\u{1F4E6} Org (solo PM): ${day.orgTask}${timeLabel}</div>`);
      }
    }

    if (day.leonActivity) {
      nicaAnnotations.push(`<div class="annotation annotation--leon">\u{1F476}\u{1F3FC} Leon\u2019s activity: ${boldTimes(day.leonActivity)}</div>`);
    }

    if (day.deepClean) {
      hazelAnnotations.push(`<div class="annotation annotation--deep-clean">\u{1F9F9} Deep clean: ${day.deepClean}</div>`);
    }

    const hasAnnotations = hazelAnnotations.length || nicaAnnotations.length || sharedAnnotations.length;
    if (hasAnnotations) {
      const hazelCol = hazelAnnotations.length ? `<div class="annotations-col annotations-col--hazel">${hazelAnnotations.join('')}</div>` : '<div class="annotations-col"></div>';
      const nicaCol = nicaAnnotations.length ? `<div class="annotations-col annotations-col--nica">${nicaAnnotations.join('')}</div>` : '<div class="annotations-col"></div>';
      const sharedCol = sharedAnnotations.length ? `<div class="annotations-col annotations-col--shared">${sharedAnnotations.join('')}</div>` : '';
      annotationsHtml = `<div class="checklist-day__annotations annotations-grid">${sharedCol}${hazelCol}${nicaCol}</div>`;
    }

    // Day off banner
    let dayOffHtml = '';
    if (day.hazelOff) dayOffHtml = `<span class="day-off-banner">Hazel\u2019s day off</span>`;
    if (day.nicaOff) dayOffHtml = `<span class="day-off-banner">Nica\u2019s day off</span>`;

    // Date display
    const dateDisplay = day.date
      ? `<span class="checklist-day__date">${day.date}</span>`
      : `<span class="date-fill-in"></span>`;

    // Special note
    const specialNote = day.specialNote
      ? `<div class="checklist-day__special">${day.specialNote}</div>`
      : '';

    // Table rows
    const rowsHtml = day.rows.map((row, i) => this.renderChecklistRow(row, day.id, i)).join('');

    // Reflection
    const reflectionHtml = day.reflection
      ? `<footer class="checklist-day__reflection">
          <p class="reflection-heading">End of day</p>
          ${day.date === null ? '<div class="reflection-field"><span class="reflection-field__label">Date:</span><div class="write-line"></div></div>' : ''}
          <div class="reflection-field"><span class="reflection-field__label">What went well?</span><div class="write-line"></div></div>
          <div class="reflection-field"><span class="reflection-field__label">Difficult?</span><div class="write-line"></div></div>
          <div class="reflection-field"><span class="reflection-field__label">Need from Ilma?</span><div class="write-line"></div></div>
        </footer>`
      : '';

    return `
      <article class="checklist-day" data-day-id="${day.id}">
        <header class="checklist-day__header">
          <div class="checklist-day__header-left">
            <h3 class="checklist-day__title">${day.dayName}</h3>
            ${dateDisplay}
          </div>
          ${dayOffHtml}
        </header>
        ${specialNote}
        ${annotationsHtml}
        <table class="checklist-table">
          <thead>
            <tr>
              <th class="col-time"></th>
              <th class="col-hazel">Hazel</th>
              <th class="col-nica">Nica</th>
              <th class="col-check"></th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        ${reflectionHtml}
      </article>
    `;
  }

  // === Render: Single Checklist Row ===
  renderChecklistRow(row, dayId, index) {
    // Section divider — cream bar split under Hazel/Nica columns
    if (row.section) {
      return `<tr class="slot-section">
        <td class="col-time"></td>
        <td class="col-hazel"><span class="section-hazel">${boldTimes(row.section)}</span></td>
        <td class="col-nica">${row.nicaSection ? `<span class="section-nica">${boldTimes(row.nicaSection)}</span>` : ''}</td>
        <td class="col-check"></td>
      </tr>`;
    }

    const hazelType = getCellTypeClass(row.hazel);
    const nicaType = getCellTypeClass(row.nica);
    const checkboxId = `${dayId}-r${index}`;
    const checked = this.checkboxState[checkboxId] ? 'checked' : '';
    const isDayOff = (row.hazel || '').includes('DAY OFF') || (row.nica || '').includes('DAY OFF');

    return `
      <tr>
        <td class="col-time">${boldTimes(row.time || '')}</td>
        <td class="col-hazel ${hazelType}">${boldTimes(row.hazel || '')}</td>
        <td class="col-nica ${nicaType}">${boldTimes(row.nica || '')}</td>
        <td class="col-check">
          ${isDayOff ? '' : `<input type="checkbox" class="check-box" data-id="${checkboxId}" ${checked}>`}
        </td>
      </tr>
    `;
  }

  // === Sidebar ===
  renderSidebar() {
    const groups = { reference: 'nav-reference', checklist: 'nav-checklists', template: 'nav-template' };

    Object.entries(groups).forEach(([groupKey, containerId]) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const groupPages = this.pages.filter(p => p.group === groupKey);
      container.innerHTML = groupPages.map(p =>
        `<a class="nav-page" href="#${p.id}" data-page-id="${p.id}">
          <span class="nav-page__icon">${p.icon}</span>
          <span class="nav-page__label">${p.label}</span>
        </a>`
      ).join('');
    });
  }

  // === Legend ===
  renderLegend() {
    const legend = document.getElementById('nav-legend');
    if (!legend) return;
    const items = [
      { label: '\u{1F4E6} House Organisation', color: 'var(--color-org)' },
      { label: '\u{1F4CC} House Errands', color: 'var(--color-admin)' },
      { label: '\u{1F476}\u{1F3FC} Leon\u2019s Activities', color: 'var(--color-leon)' },
      { label: '\u{1F9F9} Deep Clean', color: 'var(--color-deep-clean)' },
    ];
    legend.innerHTML = items.map(i =>
      `<div class="legend__item">
        <span class="legend__swatch" style="background:${i.color}"></span>
        <span>${i.label}</span>
      </div>`
    ).join('');
  }

  // === Header Actions ===
  bindHeaderActions() {
    const btnPage = document.getElementById('btn-print-page');
    const btnAll = document.getElementById('btn-print-all');
    if (btnPage) btnPage.addEventListener('click', () => printPage(this.currentPage));
    if (btnAll) btnAll.addEventListener('click', () => printAll());

    // Mobile menu toggle
    const btnMenu = document.getElementById('btn-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (btnMenu && sidebar && overlay) {
      const openMenu = () => { sidebar.classList.add('is-open'); overlay.classList.add('is-visible'); };
      const closeMenu = () => { sidebar.classList.remove('is-open'); overlay.classList.remove('is-visible'); };
      btnMenu.addEventListener('click', () => sidebar.classList.contains('is-open') ? closeMenu() : openMenu());
      overlay.addEventListener('click', closeMenu);
      sidebar.querySelectorAll('.nav-page').forEach(link => link.addEventListener('click', closeMenu));
    }
  }

  // === Checkbox Persistence ===
  loadCheckboxState() {
    try {
      return JSON.parse(localStorage.getItem('dashboard-checks') || '{}');
    } catch { return {}; }
  }

  saveCheckboxState() {
    localStorage.setItem('dashboard-checks', JSON.stringify(this.checkboxState));
  }

  bindCheckboxes() {
    document.querySelectorAll('.check-box').forEach(cb => {
      cb.addEventListener('change', (e) => {
        this.checkboxState[e.target.dataset.id] = e.target.checked;
        this.saveCheckboxState();
      });
    });
  }
}

// Boot
const app = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => app.init());
