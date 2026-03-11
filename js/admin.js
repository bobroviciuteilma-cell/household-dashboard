/**
 * Admin Panel — Personal dashboard (hidden behind ?admin URL param)
 * Tabs: Household | Calendar | Projects | Notes
 */
import { WEEK_DAYS, SPRINT_PLAN } from './data.js?v=49';
import { SPRINT_TASK_DETAILS, SPRINT_DAY_CONTEXT, SPRINT_ASSISTANT_MESSAGES } from './sprint-content.js?v=2';

// ─── Confetti Animation ────────────────────────────────────────
function fireConfetti(targetEl) {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  const rect = targetEl.getBoundingClientRect();
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colours = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff922b','#cc5de8','#20c997'];
  const particles = Array.from({ length: 60 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 1) * 12 - 2,
    size: Math.random() * 6 + 3,
    color: colours[Math.floor(Math.random() * colours.length)],
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 12,
    life: 1,
  }));

  let frame;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rotSpeed;
      p.life -= 0.018;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (alive) frame = requestAnimationFrame(tick);
    else { cancelAnimationFrame(frame); canvas.remove(); }
  }
  frame = requestAnimationFrame(tick);
}

// ─── Admin Panel Class ─────────────────────────────────────────
export class AdminPanel {
  constructor(appInstance) {
    this.app = appInstance;
    this.activeTab = 'calendar';
    this.calendarView = 'week';
    this.currentWeek = this.detectCurrentWeek();
    this.currentMonth = new Date().getMonth(); // 0-indexed (March=2)
    this.currentYear = 2026;
    this.weekFilter = 'all'; // filter for weekly view
    this.builtInEvents = [
      { id: 'bi-gym-w1', dayId: 'w1-mon', title: 'Gym', time: '10:30 AM' },
      { id: 'bi-gym-w2', dayId: 'w2-mon', title: 'Gym', time: '10:30 AM' },
      { id: 'bi-gym-w3', dayId: 'w3-mon', title: 'Gym', time: '10:30 AM' },
      { id: 'bi-gym-w4', dayId: 'w4-mon', title: 'Gym', time: '10:30 AM' },
      { id: 'bi-1', dayId: 'w2-mon', title: 'Steffi-Leica event', time: '6:30\u20138:30 PM' },
      { id: 'bi-2', dayId: 'w4-wed', title: 'Emi\u2019s Birthday', time: '' },
    ];
    this.builtInPayments = [
      // ── Regular ────────────────────────────────────
      { id: 'bp-gym1', payee: 'Gym membership (covers until 20 Apr)', amount: 650, dayId: 'w4-mon', dueLabel: 'Monday 23 March', paid: false },
      { id: 'bp-gym2', payee: 'Gym membership (covers until 25 May)', amount: 650, dayId: 'w4-fri', dueLabel: 'Friday 27 March', paid: false },
      { id: 'bp-nica-sal', payee: 'Nica \u2014 salary', amount: 1350, dayId: 'w2-sun', dueLabel: 'Sunday 15 March', paid: false },
      { id: 'bp-hazel-sal', payee: 'Hazel \u2014 salary', amount: 900, dayId: 'w2-sun', dueLabel: 'Sunday 15 March', paid: false },
      { id: 'bp-nica-giro', payee: 'Nica \u2014 Giro (helper levy)', amount: 300, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-hazel-giro', payee: 'Hazel \u2014 Giro (helper levy)', amount: 450, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-swim', payee: 'Leon\u2019s Swimming', amount: 0, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-football', payee: 'Leon\u2019s Football', amount: 0, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-taxes', payee: 'Taxes', amount: 0, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-claude', payee: 'Subscription: Claude', amount: 0, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      { id: 'bp-supps', payee: 'Subscription: Supplements', amount: 0, dayId: null, dueLabel: '\u23F3 TBC', paid: false },
      // ── One-offs ───────────────────────────────────
      { id: 'bp-agency', payee: 'Filipino Agency', amount: 1718, dayId: 'w2-sun', dueLabel: 'Sunday 15 March', paid: false },
    ];
    // Generate recurring Gym events for every Monday (weeks 5+)
    for (let week = 5; week <= 44; week++) {
      const startDate = new Date(2026, 2, 2 + (week - 1) * 7); // Monday of this week
      if (startDate > new Date(2026, 11, 31)) break;
      const dayId = `d-${startDate.getFullYear()}-${String(startDate.getMonth()+1).padStart(2,'0')}-${String(startDate.getDate()).padStart(2,'0')}`;
      this.builtInEvents.push({ id: `bi-gym-${dayId}`, dayId, title: 'Gym', time: '10:30 AM' });
    }

    // Generate recurring salary payments (15th of each month, April–December)
    const salMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const salDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    for (let m = 3; m <= 11; m++) { // April=3 to December=11
      const date15 = new Date(2026, m, 15);
      const dayId = `d-2026-${String(m+1).padStart(2,'0')}-15`;
      const dueLabel = `${salDayNames[date15.getDay()]} 15 ${salMonths[m]}`;
      this.builtInPayments.push(
        { id: `bp-nica-sal-${m}`, payee: 'Nica \u2014 salary', amount: 1350, dayId, dueLabel, paid: false },
        { id: `bp-hazel-sal-${m}`, payee: 'Hazel \u2014 salary', amount: 900, dayId, dueLabel, paid: false }
      );
    }

    this.events = this.load('admin-events') || [];
    this.tasks = this.load('admin-tasks') || [];
    this.notes = this.load('admin-notes') || [];
    this.payments = this.load('admin-payments') || [];
    this.monthFilter = 'all';
    this.editingEventId = null;
    this.editingTaskId = null;
    this.editingPaymentId = null;
    this._convertingBiPayment = null;
    this.hiddenBuiltIns = this.load('admin-hidden-builtins') || [];
    // Sprint state
    this.sprintChecks = this.load('sprint-checks') || {};
    this.sprintWeekNum = this.getSprintWeek();
    this.sprintCustomTasks = this.load('sprint-custom-tasks') || {};
    this.editingSprintTask = null;
    this.sprintMode = this.load('sprint-mode') || 'today'; // 'today' | 'week' | 'map'
    this.sprintExpandedTask = null; // key of currently expanded task
    this.sprintStepChecks = this.load('sprint-step-checks') || {}; // sub-step checkboxes
    this.sprintGoalValues = this.load('sprint-goal-values') || {}; // { subscribers: [{date,value},...], ... }
  }

  detectCurrentWeek() {
    const today = new Date();
    const start = new Date(2026, 2, 2); // March 2, 2026
    if (today < start) return 1;
    const diff = Math.floor((today - start) / (7 * 86400000));
    return Math.max(1, Math.min(this.getTotalWeeks(), diff + 1));
  }

  getWeekStartDate(weekNum) {
    return new Date(2026, 2, 2 + (weekNum - 1) * 7);
  }

  getTotalWeeks() {
    const start = new Date(2026, 2, 2);
    const end = new Date(2026, 11, 31);
    return Math.ceil((end - start + 86400000) / (7 * 86400000));
  }

  getWeekDays(weekNum) {
    if (weekNum >= 1 && weekNum <= 3) {
      return WEEK_DAYS.filter(d => d.weekNum === weekNum);
    }
    const w4Template = WEEK_DAYS.filter(d => d.weekNum === 4);
    const weekStart = this.getWeekStartDate(weekNum);
    const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const endOfYear = new Date(2026, 11, 31);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      if (date > endOfYear) break;
      const template = w4Template[i];
      const dayId = weekNum === 4
        ? template.id
        : `d-${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      days.push({
        id: dayId,
        weekNum,
        dayName: dayNames[i],
        date: `${date.getDate()} ${months[date.getMonth()]}`,
        hazelOff: template.hazelOff,
        nicaOff: template.nicaOff,
        adminEvents: [],
        orgTask: null,
        orgType: null,
        orgTime: null,
        leonActivity: template.leonActivity,
        deepClean: template.deepClean,
        specialNote: template.specialNote,
        reflection: template.reflection,
      });
    }
    return days;
  }

  getWeekLabel(weekNum) {
    if (weekNum <= 3) {
      return { 1: 'Week 1 \u2014 2\u20138 Mar', 2: 'Week 2 \u2014 9\u201315 Mar', 3: 'Week 3 \u2014 16\u201322 Mar' }[weekNum];
    }
    const days = this.getWeekDays(weekNum);
    if (!days.length) return `Week ${weekNum}`;
    return `${days[0].date} \u2013 ${days[days.length-1].date}`;
  }

  getDayIdForDate(year, month, day) {
    if (year === 2026 && month === 2) {
      if (day >= 2 && day <= 22) {
        const wd = WEEK_DAYS.find(w => parseInt(w.date) === day && w.weekNum <= 3);
        if (wd) return wd.id;
      }
      if (day >= 23 && day <= 29) {
        const shortDays = ['sun','mon','tue','wed','thu','fri','sat'];
        return `w4-${shortDays[new Date(2026, 2, day).getDay()]}`;
      }
    }
    return `d-${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  }

  getTemplateForDate(year, month, day) {
    if (year === 2026 && month === 2 && day >= 2 && day <= 22) {
      return WEEK_DAYS.find(wd => parseInt(wd.date) === day && wd.weekNum <= 3);
    }
    const shortDays = ['sun','mon','tue','wed','thu','fri','sat'];
    const dayAbbr = shortDays[new Date(year, month, day).getDay()];
    return WEEK_DAYS.find(wd => wd.id === `w4-${dayAbbr}`);
  }

  load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
  save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  // ─── Init: Wrap existing dashboard in admin shell ──────────
  init() {
    const body = document.body;

    // Create admin tab bar
    const tabBar = document.createElement('div');
    tabBar.className = 'admin-tabs';
    tabBar.innerHTML = `
      <button class="admin-tab is-active" data-tab="calendar">Calendar</button>
      <button class="admin-tab" data-tab="sprint">Sprint</button>
      <button class="admin-tab" data-tab="household">Household</button>
      <button class="admin-tab" data-tab="notes">Notes</button>
    `;

    // Insert tab bar at the very top of body
    body.insertBefore(tabBar, body.firstChild);

    // Wrap existing content (header + sidebar + main) in a household container
    const householdWrapper = document.createElement('div');
    householdWrapper.className = 'admin-panel-content admin-panel-content--household';
    householdWrapper.dataset.tabContent = 'household';

    // Move existing elements into wrapper
    const header = document.querySelector('.site-header');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const content = document.getElementById('content');
    if (header) householdWrapper.appendChild(header);
    if (sidebar) householdWrapper.appendChild(sidebar);
    if (overlay) householdWrapper.appendChild(overlay);
    if (content) householdWrapper.appendChild(content);
    body.appendChild(householdWrapper);

    // Create other tab content areas
    ['calendar', 'sprint', 'notes'].forEach(id => {
      const panel = document.createElement('div');
      panel.className = `admin-panel-content admin-panel-content--${id}${id === 'calendar' ? ' is-active' : ''}`;
      panel.dataset.tabContent = id;
      body.appendChild(panel);
    });

    // Render personal tabs
    this.renderCalendar();
    this.renderSprint();
    this.renderNotes();

    // Bind tab switching
    tabBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.admin-tab');
      if (!btn) return;
      this.switchTab(btn.dataset.tab);
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === tabId));
    document.querySelectorAll('.admin-panel-content').forEach(p => p.classList.toggle('is-active', p.dataset.tabContent === tabId));
  }

  // ─── CALENDAR ──────────────────────────────────────────────
  renderCalendar() {
    const panel = document.querySelector('[data-tab-content="calendar"]');
    panel.innerHTML = `
      <div class="admin-page">
        <div class="admin-page__header">
          <h2>Calendar</h2>
          <div class="cal-controls">
            <div class="cal-view-toggle">
              <button class="cal-view-btn is-active" data-view="week">Week</button>
              <button class="cal-view-btn" data-view="month">Month</button>
            </div>
            <div class="cal-week-nav" id="cal-week-nav">
              <button class="cal-nav-btn" data-dir="-1">&larr;</button>
              <span class="cal-week-label" id="cal-week-label"></span>
              <button class="cal-nav-btn" data-dir="1">&rarr;</button>
            </div>
          </div>
        </div>
        <div id="cal-body"></div>
        <div class="cal-add-section">
          <h4 id="cal-form-title">Add Event</h4>
          <div class="cal-add-form">
            <select id="cal-add-cat">
              <option value="personal">\u{1F481}\u200D\u2640\uFE0F Personal</option>
              <option value="leon">\u{1F476}\u{1F3FC} Leon\u2019s Activity</option>
              <option value="admin">\u{1F4CC} House Errands</option>
              <option value="org">\u{1F4E6} Organisation</option>
              <option value="payment">\u{1F4B8} Payment</option>
            </select>
            <select id="cal-add-day"></select>
            <input type="text" id="cal-add-title" placeholder="Event title">
            <input type="text" id="cal-add-time" placeholder="Time (optional)">
            <button id="cal-add-btn" class="btn-admin">Add</button>
            <button id="cal-cancel-btn" class="btn-cancel" style="display:none">Cancel</button>
          </div>
          <div id="cal-day-events" class="cal-day-events"></div>
        </div>
      </div>
    `;

    // Populate day selector
    this.populateDaySelector();

    // Bind controls
    panel.querySelector('.cal-view-toggle').addEventListener('click', (e) => {
      const btn = e.target.closest('.cal-view-btn');
      if (!btn) return;
      this.calendarView = btn.dataset.view;
      panel.querySelectorAll('.cal-view-btn').forEach(b => b.classList.toggle('is-active', b.dataset.view === this.calendarView));
      document.getElementById('cal-week-nav').style.display = this.calendarView === 'week' ? '' : 'none';
      this.refreshCalendar();
    });

    panel.querySelector('#cal-week-nav').addEventListener('click', (e) => {
      const btn = e.target.closest('.cal-nav-btn');
      if (!btn) return;
      this.currentWeek = Math.max(1, Math.min(this.getTotalWeeks(), this.currentWeek + parseInt(btn.dataset.dir)));
      this.refreshCalendar();
    });

    panel.querySelector('#cal-add-btn').addEventListener('click', () => this.addEvent());
    panel.querySelector('#cal-cancel-btn').addEventListener('click', () => this.cancelEditEvent());

    // Click outside → dismiss day events panel
    document.addEventListener('click', (e) => {
      const addSection = document.querySelector('.cal-add-section');
      const dayEventsPanel = document.getElementById('cal-day-events');
      if (!dayEventsPanel || !dayEventsPanel.innerHTML) return;
      // Don't dismiss if clicking inside the form/panel area
      if (addSection?.contains(e.target)) return;
      // Don't dismiss if clicking on an actual calendar event (it will repopulate)
      if (e.target.closest('.cal-event') || e.target.closest('.cal-mini') || e.target.closest('.cal-month-num')) return;
      this.resetCalendarForm();
    });

    this.refreshCalendar();
  }

  populateDaySelector() {
    const sel = document.getElementById('cal-add-day');
    if (!sel) return;
    if (this.calendarView === 'week') {
      const days = this.getWeekDays(this.currentWeek);
      sel.innerHTML = days.map(d => `<option value="${d.id}">${d.dayName} ${d.date}</option>`).join('');
    } else {
      const year = this.currentYear;
      const month = this.currentMonth;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let options = '';
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dayId = this.getDayIdForDate(year, month, d);
        options += `<option value="${dayId}">${dayNames[date.getDay()]} ${d} ${monthNames[month]}</option>`;
      }
      sel.innerHTML = options;
    }
  }

  addEvent() {
    const dayId = document.getElementById('cal-add-day').value;
    const title = document.getElementById('cal-add-title').value.trim();
    const time = document.getElementById('cal-add-time').value.trim();
    const category = document.getElementById('cal-add-cat').value;
    if (!title) return;

    if (this._convertingBiRef) {
      // Converting a built-in event: hide original, create user event
      this.hiddenBuiltIns.push(this._convertingBiRef);
      this.save('admin-hidden-builtins', this.hiddenBuiltIns);
      this.events.push({ id: Date.now(), dayId, title, time, category: category || 'personal' });
    } else if (this.editingEventId !== null) {
      // Update existing user event
      const ev = this.events.find(e => e.id === this.editingEventId);
      if (ev) {
        ev.dayId = dayId;
        ev.title = title;
        ev.time = time;
        ev.category = category || 'personal';
      }
    } else {
      this.events.push({ id: Date.now(), dayId, title, time, category: category || 'personal' });
    }

    this.save('admin-events', this.events);
    this.refreshCalendar(); // resetCalendarForm() is called inside
  }

  startEditEvent(id) {
    const ev = this.events.find(e => e.id === id);
    if (!ev) return;
    this.editingEventId = id;
    document.getElementById('cal-add-cat').value = ev.category || 'personal';
    document.getElementById('cal-add-day').value = ev.dayId;
    document.getElementById('cal-add-title').value = ev.title;
    document.getElementById('cal-add-time').value = ev.time || '';
    document.getElementById('cal-form-title').textContent = 'Edit Event';
    document.getElementById('cal-add-btn').textContent = 'Save ✓';
    document.getElementById('cal-cancel-btn').style.display = '';
    const form = document.querySelector('.cal-add-form');
    form?.classList.add('is-editing');
    form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('cal-add-title').focus();
  }

  cancelEditEvent() {
    document.getElementById('cal-add-cat').value = 'personal';
    this.resetCalendarForm();
  }

  /** Show all events for the currently selected day below the add form */
  refreshDayEvents() {
    const container = document.getElementById('cal-day-events');
    if (!container) return;
    const dayId = document.getElementById('cal-add-day')?.value;
    if (!dayId) { container.innerHTML = ''; return; }

    const hidden = this.hiddenBuiltIns;
    const catEmojis = { personal: '\u{1F481}\u200D\u2640\uFE0F', leon: '\u{1F476}\u{1F3FC}', admin: '\u{1F4CC}', org: '\u{1F4E6}', payment: '\u{1F4B8}' };
    const items = [];

    // Built-in data from WEEK_DAYS (or template for generated days)
    let wd = WEEK_DAYS.find(w => w.id === dayId);
    if (!wd && dayId.startsWith('d-')) {
      const parts = dayId.split('-');
      const date = new Date(parseInt(parts[1]), parseInt(parts[2])-1, parseInt(parts[3]));
      const shortDays = ['sun','mon','tue','wed','thu','fri','sat'];
      wd = WEEK_DAYS.find(w => w.id === `w4-${shortDays[date.getDay()]}`);
    }
    if (wd) {
      if (wd.leonActivity) {
        const ref = `leon-${dayId}`;
        if (!hidden.includes(ref))
          items.push({ label: `\u{1F476}\u{1F3FC} ${wd.leonActivity}`, biRef: ref });
      }
      if (wd.adminEvents?.length) {
        wd.adminEvents.forEach((e, i) => {
          const ref = `admin-${dayId}-${i}`;
          if (!hidden.includes(ref))
            items.push({ label: `\u{1F4CC} ${e}`, biRef: ref });
        });
      }
      if (wd.orgTask) {
        const ref = `org-${dayId}`;
        if (!hidden.includes(ref))
          items.push({ label: `\u{1F4E6} ${wd.orgTask}${wd.orgTime ? ' \u2014 ' + wd.orgTime : ''}`, biRef: ref });
      }
    }

    // Built-in personal events (Gym etc.)
    this.builtInEvents.filter(e => e.dayId === dayId).forEach(e => {
      const ref = `bi-${e.id}`;
      if (!hidden.includes(ref))
        items.push({ label: `\u{1F481}\u200D\u2640\uFE0F ${e.time ? e.time + ' ' : ''}${e.title}`, biRef: ref });
    });

    // User events for this day
    this.events.filter(e => e.dayId === dayId).forEach(e => {
      const cat = e.category || 'personal';
      const emoji = catEmojis[cat] || catEmojis.personal;
      items.push({ label: `${emoji} ${e.time ? e.time + ' ' : ''}${e.title}`, userId: e.id });
    });

    if (!items.length) {
      container.innerHTML = '<p class="cal-day-events__empty">No events for this day</p>';
      return;
    }

    let dayLabel;
    if (dayId.startsWith('d-')) {
      const parts = dayId.split('-');
      const date = new Date(parseInt(parts[1]), parseInt(parts[2])-1, parseInt(parts[3]));
      const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      dayLabel = `${dayNames[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    } else {
      const w4Labels = { 'w4-mon': '23 March', 'w4-tue': '24 March', 'w4-wed': '25 March', 'w4-thu': '26 March', 'w4-fri': '27 March', 'w4-sat': '28 March', 'w4-sun': '29 March' };
      dayLabel = wd ? `${wd.dayName} ${wd.date || w4Labels[dayId] || ''}` : dayId;
    }
    container.innerHTML = `
      <h5 class="cal-day-events__title">Events on ${dayLabel}:</h5>
      ${items.map(it => {
        if (it.biRef) {
          return `<div class="cal-day-event-row">
            <span class="cal-day-event-row__text">${it.label}</span>
            <button class="cal-day-event-row__edit" data-bi="${it.biRef}">Edit</button>
            <button class="cal-day-event-row__del" data-bi="${it.biRef}">Delete</button>
          </div>`;
        } else {
          return `<div class="cal-day-event-row">
            <span class="cal-day-event-row__text">${it.label}</span>
            <button class="cal-day-event-row__edit" data-user-id="${it.userId}">Edit</button>
            <button class="cal-day-event-row__del-user" data-user-id="${it.userId}">Delete</button>
          </div>`;
        }
      }).join('')}
    `;

    // Bind edit buttons
    container.querySelectorAll('.cal-day-event-row__edit[data-bi]').forEach(btn => {
      btn.addEventListener('click', () => this.startEditBuiltIn(btn.dataset.bi));
    });
    container.querySelectorAll('.cal-day-event-row__edit[data-user-id]').forEach(btn => {
      btn.addEventListener('click', () => this.startEditEvent(parseInt(btn.dataset.userId)));
    });
    // Bind delete buttons — built-in: hide it, then clear panel
    container.querySelectorAll('.cal-day-event-row__del[data-bi]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.hiddenBuiltIns.push(btn.dataset.bi);
        this.save('admin-hidden-builtins', this.hiddenBuiltIns);
        this.refreshCalendar();
      });
    });
    // Bind delete buttons — user events, then clear panel
    container.querySelectorAll('.cal-day-event-row__del-user').forEach(btn => {
      btn.addEventListener('click', () => {
        this.deleteEvent(parseInt(btn.dataset.userId));
      });
    });
  }

  /** Edit a built-in event: pre-fill the form so user can modify, then save as user event */
  startEditBuiltIn(biRef) {
    // Parse the ref to figure out what built-in event it is
    let title = '', time = '', category = 'personal', dayId = '';

    // Helper: look up WEEK_DAYS by dayId, with fallback for generated d-* IDs
    const lookupWd = (id) => {
      let wd = WEEK_DAYS.find(w => w.id === id);
      if (!wd && id.startsWith('d-')) {
        const parts = id.split('-');
        const date = new Date(parseInt(parts[1]), parseInt(parts[2])-1, parseInt(parts[3]));
        const shortDays = ['sun','mon','tue','wed','thu','fri','sat'];
        wd = WEEK_DAYS.find(w => w.id === `w4-${shortDays[date.getDay()]}`);
      }
      return wd;
    };

    if (biRef.startsWith('leon-')) {
      dayId = biRef.replace('leon-', '');
      const wd = lookupWd(dayId);
      title = wd?.leonActivity || '';
      category = 'leon';
    } else if (biRef.startsWith('admin-')) {
      const parts = biRef.split('-'); // admin-w1-mon-0 or admin-d-2026-04-06-0
      const idx = parseInt(parts.pop());
      dayId = parts.slice(1).join('-');
      const wd = lookupWd(dayId);
      title = wd?.adminEvents?.[idx] || '';
      category = 'admin';
    } else if (biRef.startsWith('org-')) {
      dayId = biRef.replace('org-', '');
      const wd = lookupWd(dayId);
      title = wd?.orgTask || '';
      time = wd?.orgTime || '';
      category = 'org';
    } else if (biRef.startsWith('bi-')) {
      const biId = biRef.replace('bi-', '');
      const ev = this.builtInEvents.find(e => e.id === biId);
      if (ev) {
        title = ev.title;
        time = ev.time || '';
        dayId = ev.dayId;
        category = 'personal';
      }
    }

    if (!dayId) return;

    this._convertingBiRef = biRef;
    this.editingEventId = null;
    document.getElementById('cal-add-cat').value = category;
    document.getElementById('cal-add-day').value = dayId;
    document.getElementById('cal-add-title').value = title;
    document.getElementById('cal-add-time').value = time;
    document.getElementById('cal-form-title').textContent = 'Edit Event';
    document.getElementById('cal-add-btn').textContent = 'Save ✓';
    document.getElementById('cal-cancel-btn').style.display = '';
    const form = document.querySelector('.cal-add-form');
    form?.classList.add('is-editing');
    form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('cal-add-title').focus();
  }

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    this.save('admin-events', this.events);
    this.refreshCalendar();
  }

  /** Resolve whether a dayId matches a specific date (year, month 0-indexed, day) */
  dayIdMatchesDate(dayId, year, month, day) {
    if (!dayId) return false;
    // Date-based ID: d-YYYY-MM-DD
    if (dayId.startsWith('d-')) {
      return dayId === `d-${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }
    // Legacy week-based IDs only match March 2026
    if (year !== 2026 || month !== 2) return false;
    const wd = WEEK_DAYS.find(w => w.id === dayId);
    if (!wd) return false;
    if (wd.weekNum <= 3) return parseInt(wd.date) === day;
    // Week 4 template: only match March 23-29
    if (day < 23 || day > 29) return false;
    const date = new Date(2026, 2, day);
    const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
    return wd.dayName === dayName;
  }

  resetCalendarForm() {
    this.editingEventId = null;
    this._convertingBiRef = null;
    const title = document.getElementById('cal-form-title');
    const btn = document.getElementById('cal-add-btn');
    const cancel = document.getElementById('cal-cancel-btn');
    const form = document.querySelector('.cal-add-form');
    const panel = document.getElementById('cal-day-events');
    if (title) title.textContent = 'Add Event';
    if (btn) btn.textContent = 'Add';
    if (cancel) cancel.style.display = 'none';
    if (form) form.classList.remove('is-editing');
    if (panel) panel.innerHTML = '';
    const titleInput = document.getElementById('cal-add-title');
    const timeInput = document.getElementById('cal-add-time');
    if (titleInput) titleInput.value = '';
    if (timeInput) timeInput.value = '';
  }

  buildFilterButtons(activeFilter) {
    const filters = [
      { key: 'all', label: 'All' },
      { key: 'leon', label: '\u{1F476}\u{1F3FC} Leon' },
      { key: 'admin', label: '\u{1F4CC} Errands' },
      { key: 'org', label: '\u{1F4E6} Organisation' },
      { key: 'personal', label: '\u{1F481}\u200D\u2640\uFE0F Personal' },
      { key: 'payment', label: '\u{1F4B8} Payment' },
    ];
    return `<div class="cal-month-legend">${filters.map(f =>
      `<button class="cal-legend-btn${activeFilter === f.key ? ' is-active' : ''}" data-filter="${f.key}">${f.label}</button>`
    ).join('')}</div>`;
  }

  refreshCalendar() {
    const body = document.getElementById('cal-body');
    const label = document.getElementById('cal-week-label');
    this.resetCalendarForm();

    if (this.calendarView === 'week') {
      const weekDays = this.getWeekDays(this.currentWeek);
      label.textContent = this.getWeekLabel(this.currentWeek);

      const filter = this.weekFilter || 'all';
      const filterHtml = this.buildFilterButtons(filter);
      body.innerHTML = `<div class="cal-week">${weekDays.map(d => this.renderCalDay(d)).join('')}</div>${filterHtml}`;
    } else {
      body.innerHTML = this.renderMonthView();
    }
    this.populateDaySelector();

    // Click event \u2192 show that day's events in the edit panel
    const getDayIdFromRef = (ref) => {
      if (ref.startsWith('leon-')) return ref.replace('leon-', '');
      if (ref.startsWith('org-')) return ref.replace('org-', '');
      if (ref.startsWith('admin-')) return ref.replace(/^admin-/, '').replace(/-\d+$/, '');
      if (ref.startsWith('bi-')) {
        const ev = this.builtInEvents.find(e => e.id === ref.replace('bi-', ''));
        return ev?.dayId || '';
      }
      return '';
    };
    const showDay = (dayId) => {
      if (!dayId) return;
      const sel = document.getElementById('cal-add-day');
      if (sel) {
        if (![...sel.options].some(o => o.value === dayId)) {
          const opt = document.createElement('option');
          opt.value = dayId;
          if (dayId.startsWith('d-')) {
            const parts = dayId.split('-');
            const date = new Date(parseInt(parts[1]), parseInt(parts[2])-1, parseInt(parts[3]));
            const dn = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            const mn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            opt.textContent = `${dn[date.getDay()]} ${date.getDate()} ${mn[date.getMonth()]}`;
          } else {
            const wd = WEEK_DAYS.find(w => w.id === dayId);
            opt.textContent = wd ? `${wd.dayName} ${wd.date || dayId}` : dayId;
          }
          sel.appendChild(opt);
        }
        sel.value = dayId;
      }
      this.refreshDayEvents();
      document.getElementById('cal-day-events')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Week view + month view: built-in events
    body.querySelectorAll('.cal-event[data-bi], .cal-mini[data-bi]').forEach(el => {
      el.addEventListener('click', () => showDay(getDayIdFromRef(el.dataset.bi)));
    });
    // Week view + month view: user events
    body.querySelectorAll('.cal-event[data-user-id], .cal-mini[data-user-id]').forEach(el => {
      el.addEventListener('click', () => {
        const ev = this.events.find(e => e.id === parseInt(el.dataset.userId));
        if (ev) showDay(ev.dayId);
      });
    });
    // Month view: click on day cell number to show that day
    body.querySelectorAll('.cal-month-cell').forEach(cell => {
      const numEl = cell.querySelector('.cal-month-num');
      if (!numEl) return;
      const d = parseInt(numEl.textContent);
      if (isNaN(d)) return;
      const dayId = this.getDayIdForDate(this.currentYear, this.currentMonth, d);
      if (dayId) {
        numEl.style.cursor = 'pointer';
        numEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showDay(dayId);
        });
      }
    });

    // Bind filter buttons (both week and month view)
    body.querySelectorAll('.cal-legend-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.calendarView === 'week') {
          this.weekFilter = btn.dataset.filter;
        } else {
          this.monthFilter = btn.dataset.filter;
        }
        this.refreshCalendar();
      });
    });

    // Month view: month nav buttons
    body.querySelectorAll('.cal-month-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = parseInt(btn.dataset.dir);
        this.currentMonth += dir;
        if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
        if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
        // Clamp to March-December 2026
        if (this.currentYear < 2026 || (this.currentYear === 2026 && this.currentMonth < 2)) {
          this.currentMonth = 2; this.currentYear = 2026;
        }
        if (this.currentYear > 2026) {
          this.currentMonth = 11; this.currentYear = 2026;
        }
        this.refreshCalendar();
      });
    });
  }

  renderCalDay(day) {
    const events = [];
    const hidden = this.hiddenBuiltIns;
    const filter = this.weekFilter || 'all';

    // Leon's activity
    if ((filter === 'all' || filter === 'leon') && day.leonActivity) {
      const ref = `leon-${day.id}`;
      if (!hidden.includes(ref)) {
        events.push(`<div class="cal-event cal-event--leon" data-bi="${ref}">\u{1F476}\u{1F3FC} ${day.leonActivity}</div>`);
      }
    }

    // Admin events
    if ((filter === 'all' || filter === 'admin') && day.adminEvents?.length) {
      day.adminEvents.forEach((e, i) => {
        const ref = `admin-${day.id}-${i}`;
        if (!hidden.includes(ref)) {
          events.push(`<div class="cal-event cal-event--admin" data-bi="${ref}">\u{1F4CC} ${e}</div>`);
        }
      });
    }

    // Org task
    if ((filter === 'all' || filter === 'org') && day.orgTask) {
      const ref = `org-${day.id}`;
      if (!hidden.includes(ref)) {
        events.push(`<div class="cal-event cal-event--org" data-bi="${ref}">\u{1F4E6} ${day.orgTask}${day.orgTime ? ' \u2014 ' + day.orgTime : ''}</div>`);
      }
    }

    // Built-in personal events
    if (filter === 'all' || filter === 'personal') {
      const builtIn = this.builtInEvents.filter(e => e.dayId === day.id);
      builtIn.forEach(e => {
        const ref = `bi-${e.id}`;
        if (!hidden.includes(ref)) {
          events.push(`<div class="cal-event cal-event--personal" data-bi="${ref}">\u{1F481}\u200D\u2640\uFE0F ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
        }
      });
    }

    // User-added events (with category support)
    const catEmojis = { personal: '\u{1F481}\u200D\u2640\uFE0F', leon: '\u{1F476}\u{1F3FC}', admin: '\u{1F4CC}', org: '\u{1F4E6}', payment: '\u{1F4B8}' };
    const myEvents = this.events.filter(e => e.dayId === day.id);
    myEvents.forEach(e => {
      const cat = e.category || 'personal';
      if (filter !== 'all' && filter !== cat) return;
      const emoji = catEmojis[cat] || catEmojis.personal;
      events.push(`<div class="cal-event cal-event--${cat}" data-user-id="${e.id}">${emoji} ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
    });

    // Payment events -- built-in + user (unpaid only)
    if (filter === 'all' || filter === 'payment') {
      const paidMap = this.load('admin-builtin-paid') || {};
      const biPayments = this.builtInPayments.filter(p => p.dayId === day.id && !paidMap[p.id]);
      biPayments.forEach(p => {
        events.push(`<div class="cal-event cal-event--payment">\u{1F4B8} ${p.payee}${p.amount ? ' \u2014 S$' + p.amount.toFixed(0) : ''}</div>`);
      });
      const userPayments = this.payments.filter(p => p.dayId === day.id && !p.paid);
      userPayments.forEach(p => {
        events.push(`<div class="cal-event cal-event--payment">\u{1F4B8} ${p.payee} \u2014 S$${p.amount.toFixed(2)}</div>`);
      });
    }

    const isOff = day.hazelOff || day.nicaOff;
    const offLabel = day.hazelOff ? 'Hazel off' : day.nicaOff ? 'Nica off' : '';

    // Detect if this day is today
    const dateDisplay = day.date || '';
    const today = new Date();
    // Parse date display for today detection
    let isToday = false;
    if (day.id.startsWith('d-')) {
      const parts = day.id.split('-');
      isToday = today.getFullYear() === parseInt(parts[1]) && today.getMonth() === parseInt(parts[2])-1 && today.getDate() === parseInt(parts[3]);
    } else {
      const w4Dates = { 'w4-mon': 23, 'w4-tue': 24, 'w4-wed': 25, 'w4-thu': 26, 'w4-fri': 27, 'w4-sat': 28, 'w4-sun': 29 };
      const dateNum = day.date ? parseInt(day.date) : w4Dates[day.id];
      isToday = today.getMonth() === 2 && today.getFullYear() === 2026 && today.getDate() === dateNum;
    }

    const shortName = day.dayName.slice(0, 3);
    return `
      <div class="cal-day${isOff ? ' cal-day--off' : ''}${isToday ? ' cal-day--today' : ''}">
        <div class="cal-day__header">
          <span class="cal-day__name">${shortName}</span>
          <span class="cal-day__date">${dateDisplay}</span>
          ${isOff ? `<span class="cal-day__off">${offLabel}</span>` : ''}
        </div>
        <div class="cal-day__events">${events.join('')}</div>
      </div>
    `;
  }

  renderMonthView() {
    const filter = this.monthFilter || 'all';
    const year = this.currentYear;
    const month = this.currentMonth;
    const catEmojis = { personal: '\u{1F481}\u200D\u2640\uFE0F', leon: '\u{1F476}\u{1F3FC}', admin: '\u{1F4CC}', org: '\u{1F4E6}', payment: '\u{1F4B8}' };
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const header = dayNames.map(d => `<div class="cal-month-header">${d}</div>`).join('');

    // Compute first day offset (Mon-based: Mon=0, Tue=1, ..., Sun=6)
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const firstDayOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const hidden = this.hiddenBuiltIns;

    let cells = '';
    for (let i = 0; i < firstDayOffset; i++) cells += '<div class="cal-month-cell cal-month-cell--empty"></div>';

    const paidMap = this.load('admin-builtin-paid') || {};

    for (let d = 1; d <= daysInMonth; d++) {
      const weekDay = this.getTemplateForDate(year, month, d);
      const dayId = this.getDayIdForDate(year, month, d);
      const items = [];

      // Leon's activities
      if ((filter === 'all' || filter === 'leon') && weekDay?.leonActivity) {
        const ref = `leon-${dayId}`;
        if (!hidden.includes(ref)) {
          items.push(`<div class="cal-mini cal-mini--leon" data-bi="${ref}">\u{1F476}\u{1F3FC} ${weekDay.leonActivity}</div>`);
        }
      }

      // Admin / House Errands
      if ((filter === 'all' || filter === 'admin') && weekDay?.adminEvents?.length) {
        weekDay.adminEvents.forEach((e, i) => {
          const ref = `admin-${dayId}-${i}`;
          if (!hidden.includes(ref)) {
            items.push(`<div class="cal-mini cal-mini--admin" data-bi="${ref}">\u{1F4CC} ${e}</div>`);
          }
        });
      }

      // Organisation tasks
      if ((filter === 'all' || filter === 'org') && weekDay?.orgTask) {
        const ref = `org-${dayId}`;
        if (!hidden.includes(ref)) {
          items.push(`<div class="cal-mini cal-mini--org" data-bi="${ref}">\u{1F4E6} ${weekDay.orgTask}</div>`);
        }
      }

      // Built-in personal events (only for their specific dayIds)
      if (filter === 'all' || filter === 'personal') {
        const biEvents = this.builtInEvents.filter(e => this.dayIdMatchesDate(e.dayId, year, month, d));
        biEvents.forEach(e => {
          const ref = `bi-${e.id}`;
          if (!hidden.includes(ref)) {
            items.push(`<div class="cal-mini cal-mini--personal" data-bi="${ref}">\u{1F481}\u200D\u2640\uFE0F ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
          }
        });
      }

      // User-added events
      const userEvents = this.events.filter(e => this.dayIdMatchesDate(e.dayId, year, month, d));
      userEvents.forEach(e => {
        const cat = e.category || 'personal';
        if (filter !== 'all' && filter !== cat) return;
        const emoji = catEmojis[cat] || catEmojis.personal;
        items.push(`<div class="cal-mini cal-mini--${cat}" data-user-id="${e.id}">${emoji} ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
      });

      // Built-in payments
      if (filter === 'all' || filter === 'payment') {
        const biPayments = this.builtInPayments.filter(p => !paidMap[p.id] && this.dayIdMatchesDate(p.dayId, year, month, d));
        biPayments.forEach(p => {
          items.push(`<div class="cal-mini cal-mini--payment">\u{1F4B8} ${p.payee}${p.amount ? ' S$' + p.amount.toFixed(0) : ''}</div>`);
        });
        const userPayments = this.payments.filter(p => !p.paid && this.dayIdMatchesDate(p.dayId, year, month, d));
        userPayments.forEach(p => {
          items.push(`<div class="cal-mini cal-mini--payment">\u{1F4B8} ${p.payee} S$${p.amount.toFixed(0)}</div>`);
        });
      }

      const today = new Date();
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      cells += `
        <div class="cal-month-cell${isToday ? ' cal-month-cell--today' : ''}">
          <span class="cal-month-num">${d}</span>
          <div class="cal-month-items">${items.join('')}</div>
        </div>`;
    }

    const filterHtml = this.buildFilterButtons(filter);

    return `
      <div class="cal-month">
        <div class="cal-month-nav">
          <button class="cal-month-nav-btn" data-dir="-1">&larr;</button>
          <h3 class="cal-month-title">${monthNames[month]} ${year}</h3>
          <button class="cal-month-nav-btn" data-dir="1">&rarr;</button>
        </div>
        <div class="cal-month-grid">${header}${cells}</div>
        ${filterHtml}
      </div>
    `;
  }

  // ─── PROJECTS ──────────────────────────────────────────────
  // ─── SPRINT ────────────────────────────────────────────────
  getSprintDay() {
    const start = new Date(SPRINT_PLAN.startDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    const diff = Math.floor((today - start) / 86400000) + 1;
    return Math.max(1, Math.min(98, diff));
  }

  getSprintWeek() {
    return Math.ceil(this.getSprintDay() / 7);
  }

  getSprintPhase(dayNum) {
    return SPRINT_PLAN.phases.find(p => dayNum >= p.startDay && dayNum <= p.endDay) || SPRINT_PLAN.phases[0];
  }

  getSprintDateForDay(dayNum) {
    const start = new Date(SPRINT_PLAN.startDate);
    start.setDate(start.getDate() + dayNum - 1);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${start.getDate()} ${months[start.getMonth()]}`;
  }

  getTaskKey(weekNum, dayKey, idx) {
    return `w${weekNum}-${dayKey}-${idx}`;
  }

  getWeekTasks(weekNum) {
    const week = SPRINT_PLAN.weeks.find(w => w.weekNum === weekNum);
    if (!week) return null;
    return week;
  }

  calculateDeliverableProgress(delivId) {
    let total = 0, done = 0;
    SPRINT_PLAN.weeks.forEach(week => {
      const dayKeys = ['mon','tue','wed','thu','fri','sat'];
      dayKeys.forEach(dk => {
        const day = week.days[dk];
        if (!day) return;
        day.tasks.forEach((task, idx) => {
          if (task.deliverable === delivId) {
            total++;
            if (this.sprintChecks[this.getTaskKey(week.weekNum, dk, idx)]) done++;
          }
        });
        // Count custom tasks for this deliverable
        const customs = this.sprintCustomTasks[`w${week.weekNum}-${dk}`] || [];
        customs.forEach((ct, ci) => {
          if (ct.deliverable === delivId) {
            total++;
            if (this.sprintChecks[`w${week.weekNum}-${dk}-c${ci}`]) done++;
          }
        });
      });
    });
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  renderSprint() {
    const panel = document.querySelector('[data-tab-content="sprint"]');
    panel.innerHTML = `
      <div class="admin-page sprint-page">
        <div class="sprint-header" id="sprint-header"></div>
        <div class="sprint-layout">
          <div class="sprint-main" id="sprint-main"></div>
          <div class="sprint-sidebar" id="sprint-sidebar"></div>
        </div>
      </div>
    `;

    // Delegated event handler for all sprint interactions
    panel.addEventListener('click', (e) => {
      // Mode toggle
      const modeBtn = e.target.closest('.sprint-mode-btn');
      if (modeBtn) {
        this.sprintMode = modeBtn.dataset.mode;
        this.save('sprint-mode', this.sprintMode);
        this.sprintExpandedTask = null;
        this.refreshSprint();
        return;
      }
      // Week nav
      const navBtn = e.target.closest('.sprint-nav-btn');
      if (navBtn) {
        const dir = parseInt(navBtn.dataset.dir);
        this.sprintWeekNum = Math.max(1, Math.min(14, this.sprintWeekNum + dir));
        this.refreshSprint();
        return;
      }
      if (e.target.closest('.sprint-nav-today')) {
        this.sprintWeekNum = this.getSprintWeek();
        this.refreshSprint();
        return;
      }
      // Task expansion toggle (Today view)
      const taskHeader = e.target.closest('.sprint-tcard__header');
      if (taskHeader && !e.target.closest('.sprint-tcard__check')) {
        const key = taskHeader.dataset.taskKey;
        this.sprintExpandedTask = this.sprintExpandedTask === key ? null : key;
        this.refreshSprint();
        return;
      }
      // Task complete button (inside expanded detail)
      const completeBtn = e.target.closest('.sprint-tcard__complete-btn');
      if (completeBtn) {
        const key = completeBtn.dataset.key;
        this.sprintChecks[key] = true;
        this.save('sprint-checks', this.sprintChecks);
        this.sprintExpandedTask = null;
        this.refreshSprint();
        return;
      }
      // Day add button (Week view)
      const addBtn = e.target.closest('.sprint-day__add');
      if (addBtn) {
        this._addingTaskDay = addBtn.dataset.day;
        this._addingTaskWeek = parseInt(addBtn.dataset.week);
        const addForm = document.getElementById('sprint-add-task');
        if (addForm) { addForm.style.display = 'flex'; document.getElementById('sprint-new-task')?.focus(); }
        return;
      }
      // Goal edit button
      const goalEdit = e.target.closest('.sprint-goal__edit-btn');
      if (goalEdit) {
        const goalKey = goalEdit.dataset.goal;
        const input = document.getElementById(`goal-input-${goalKey}`);
        if (input) {
          input.style.display = input.style.display === 'none' ? 'flex' : 'none';
          if (input.style.display === 'flex') input.querySelector('input')?.focus();
        }
        return;
      }
      // Goal save
      const goalSave = e.target.closest('.sprint-goal__save-btn');
      if (goalSave) {
        const goalKey = goalSave.dataset.goal;
        const val = parseInt(document.getElementById(`goal-val-${goalKey}`)?.value);
        if (!isNaN(val)) {
          if (!this.sprintGoalValues[goalKey]) this.sprintGoalValues[goalKey] = [];
          this.sprintGoalValues[goalKey].push({ date: new Date().toISOString().split('T')[0], value: val });
          this.save('sprint-goal-values', this.sprintGoalValues);
          this.refreshSprint();
        }
        return;
      }
    });

    // Checkbox binding (delegated) for both views
    panel.addEventListener('change', (e) => {
      const cb = e.target.closest('.sprint-task__check') || e.target.closest('.sprint-tcard__check');
      if (cb) {
        const key = cb.dataset.key;
        this.sprintChecks[key] = cb.checked;
        this.save('sprint-checks', this.sprintChecks);
        this.refreshSprint();
        return;
      }
      // Sub-step checkboxes
      const stepCb = e.target.closest('.sprint-step__check');
      if (stepCb) {
        const stepKey = stepCb.dataset.stepKey;
        this.sprintStepChecks[stepKey] = stepCb.checked;
        this.save('sprint-step-checks', this.sprintStepChecks);
        return;
      }
    });

    this.refreshSprint();
  }

  addSprintTask() {
    const text = document.getElementById('sprint-new-task').value.trim();
    const deliverable = parseInt(document.getElementById('sprint-new-deliv').value);
    if (!text) return;
    const key = `w${this._addingTaskWeek}-${this._addingTaskDay}`;
    if (!this.sprintCustomTasks[key]) this.sprintCustomTasks[key] = [];
    this.sprintCustomTasks[key].push({ text, deliverable });
    this.save('sprint-custom-tasks', this.sprintCustomTasks);
    document.getElementById('sprint-new-task').value = '';
    document.getElementById('sprint-add-task').style.display = 'none';
    this.refreshSprint();
  }

  deleteSprintCustomTask(weekNum, dayKey, customIdx) {
    const key = `w${weekNum}-${dayKey}`;
    const arr = this.sprintCustomTasks[key];
    if (!arr) return;
    arr.splice(customIdx, 1);
    // Clean up check state
    delete this.sprintChecks[`w${weekNum}-${dayKey}-c${customIdx}`];
    this.save('sprint-custom-tasks', this.sprintCustomTasks);
    this.save('sprint-checks', this.sprintChecks);
    this.refreshSprint();
  }

  // ── Get today's tasks from sprint data ──
  getTodayTasks() {
    const currentDay = this.getSprintDay();
    const dayKeys = ['mon','tue','wed','thu','fri','sat'];
    for (const week of SPRINT_PLAN.weeks) {
      for (const dk of dayKeys) {
        const day = week.days[dk];
        if (day && day.dayNum === currentDay) {
          const tasks = day.tasks.map((t, idx) => ({
            ...t,
            key: this.getTaskKey(week.weekNum, dk, idx),
            isCustom: false,
          }));
          const customs = this.sprintCustomTasks[`w${week.weekNum}-${dk}`] || [];
          customs.forEach((ct, ci) => {
            tasks.push({ ...ct, key: `w${week.weekNum}-${dk}-c${ci}`, isCustom: true, customIdx: ci });
          });
          return { tasks, dayNum: currentDay, weekNum: week.weekNum, dayKey: dk };
        }
      }
      // Check Sunday
      if (week.sunday && week.sunday.dayNum === currentDay) {
        return { tasks: [], dayNum: currentDay, weekNum: week.weekNum, dayKey: 'sun', sundayNote: week.sunday.note };
      }
    }
    return { tasks: [], dayNum: currentDay, weekNum: 1, dayKey: 'mon' };
  }

  // ── Calculate streak (consecutive days with all tasks done) ──
  getStreak() {
    const currentDay = this.getSprintDay();
    let streak = 0;
    const dayKeys = ['mon','tue','wed','thu','fri','sat'];
    for (let d = currentDay - 1; d >= 1; d--) {
      let found = false;
      for (const week of SPRINT_PLAN.weeks) {
        for (const dk of dayKeys) {
          const day = week.days[dk];
          if (day && day.dayNum === d) {
            found = true;
            const allDone = day.tasks.every((t, idx) => this.sprintChecks[this.getTaskKey(week.weekNum, dk, idx)]);
            if (allDone && day.tasks.length > 0) { streak++; } else { return streak; }
          }
        }
        if (week.sunday && week.sunday.dayNum === d) { found = true; streak++; } // Sundays count as done
      }
      if (!found) return streak;
    }
    return streak;
  }

  // ── Generate sparkline SVG for goal trend ──
  renderSparkline(values, target) {
    if (!values || values.length < 2) return '';
    const nums = values.map(v => v.value);
    const max = Math.max(target, ...nums);
    const min = Math.min(0, ...nums);
    const range = max - min || 1;
    const w = 80, h = 24;
    const points = nums.map((v, i) => {
      const x = (i / (nums.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    }).join(' ');
    const lastVal = nums[nums.length - 1];
    const prevVal = nums.length >= 2 ? nums[nums.length - 2] : lastVal;
    const trend = lastVal > prevVal ? '\u2191' : lastVal < prevVal ? '\u2193' : '\u2192';
    const trendColor = lastVal > prevVal ? 'var(--sprint-done)' : lastVal < prevVal ? 'var(--color-admin)' : 'var(--color-text-muted)';
    return `<svg viewBox="0 0 ${w} ${h}" class="sprint-sparkline"><polyline points="${points}" fill="none" stroke="var(--color-accent)" stroke-width="1.5"/></svg><span style="color:${trendColor};font-size:var(--fs-xs)">${trend}</span>`;
  }

  refreshSprint() {
    const currentDay = this.getSprintDay();
    const currentPhase = this.getSprintPhase(currentDay);
    const remaining = Math.max(0, 98 - currentDay);
    // Calculate overall progress based on completed tasks, not just day count
    let totalTasks = 0, doneTasks = 0;
    const dayKeys = ['mon','tue','wed','thu','fri','sat'];
    SPRINT_PLAN.weeks.forEach(week => {
      dayKeys.forEach(dk => {
        const day = week.days[dk];
        if (!day) return;
        day.tasks.forEach((t, idx) => {
          totalTasks++;
          if (this.sprintChecks[this.getTaskKey(week.weekNum, dk, idx)]) doneTasks++;
        });
      });
    });
    const overallPct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

    // Calculate phase-specific progress
    let phaseTotalTasks = 0, phaseDoneTasks = 0;
    SPRINT_PLAN.weeks.forEach(week => {
      if (week.phase !== currentPhase.id) return;
      dayKeys.forEach(dk => {
        const day = week.days[dk];
        if (!day) return;
        day.tasks.forEach((t, idx) => {
          phaseTotalTasks++;
          if (this.sprintChecks[this.getTaskKey(week.weekNum, dk, idx)]) phaseDoneTasks++;
        });
      });
    });
    const phasePct = phaseTotalTasks ? Math.round((phaseDoneTasks / phaseTotalTasks) * 100) : 0;

    // ── Header (shared across all modes) ──
    document.getElementById('sprint-header').innerHTML = `
      <div class="sprint-header__top">
        <div class="sprint-day-counter">
          <span class="sprint-day-counter__num">DAY ${currentDay}</span>
          <span class="sprint-day-counter__of">/ 98</span>
        </div>
        <div class="sprint-mode-toggle">
          <button class="sprint-mode-btn${this.sprintMode === 'today' ? ' sprint-mode-btn--active' : ''}" data-mode="today">Today</button>
          <button class="sprint-mode-btn${this.sprintMode === 'week' ? ' sprint-mode-btn--active' : ''}" data-mode="week">Week</button>
          <button class="sprint-mode-btn${this.sprintMode === 'map' ? ' sprint-mode-btn--active' : ''}" data-mode="map">Map</button>
        </div>
        <span class="sprint-remaining">${remaining} days left</span>
      </div>
      <div class="sprint-progress">
        <div class="sprint-progress__bar" style="width: ${overallPct}%"></div>
        <span class="sprint-progress__label">${overallPct}% (${doneTasks}/${totalTasks} tasks)</span>
      </div>
      <div class="sprint-phase-current" style="--phase-color: ${currentPhase.color}; --phase-bg: ${currentPhase.bg}">
        <span class="sprint-phase-current__label">${currentPhase.id}: ${currentPhase.name}</span>
        <span class="sprint-phase-current__progress">${phaseDoneTasks}/${phaseTotalTasks} tasks</span>
        <div class="sprint-phase-current__bar"><div style="width: ${phasePct}%"></div></div>
      </div>
    `;

    // ── Sidebar (shared across all modes) ──
    this.renderSprintSidebar(currentDay);

    // ── Main content (mode-specific) ──
    if (this.sprintMode === 'today') {
      this.refreshSprintToday(currentDay);
    } else if (this.sprintMode === 'week') {
      this.refreshSprintWeek(currentDay);
    } else {
      this.refreshSprintMap(currentDay);
    }
  }

  // ── Sidebar: Goals + Deliverables + Milestones + Streak ──
  renderSprintSidebar(currentDay) {
    const streak = this.getStreak();
    const sidebar = document.getElementById('sprint-sidebar');
    sidebar.innerHTML = `
      <div class="sprint-sidebar__section">
        <h4 class="sprint-sidebar__title">Goals</h4>
        ${Object.entries(SPRINT_PLAN.goals).map(([key, g]) => {
          const vals = this.sprintGoalValues[key] || [];
          const current = vals.length ? vals[vals.length - 1].value : g.start;
          const pct = Math.min(100, Math.round(((current - g.start) / (g.target - g.start)) * 100));
          return `
            <div class="sprint-goal">
              <div class="sprint-goal__header">
                <span class="sprint-goal__icon">${g.icon}</span>
                <span class="sprint-goal__label">${g.label}</span>
                <button class="sprint-goal__edit-btn" data-goal="${key}" title="Update">\u270E</button>
              </div>
              <div class="sprint-goal__nums">
                <span class="sprint-goal__current">${current}</span>
                <span class="sprint-goal__target">/ ${g.target}</span>
                ${this.renderSparkline(vals, g.target)}
              </div>
              <div class="sprint-goal__bar">
                <div class="sprint-goal__fill" style="width: ${Math.max(0, pct)}%"></div>
              </div>
              <div class="sprint-goal__input" id="goal-input-${key}" style="display:none">
                <input type="number" id="goal-val-${key}" placeholder="Current value" min="0">
                <button class="sprint-goal__save-btn" data-goal="${key}">Save</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="sprint-sidebar__section">
        <h4 class="sprint-sidebar__title">Deliverables</h4>
        ${SPRINT_PLAN.deliverables.map(d => {
          const prog = this.calculateDeliverableProgress(d.id);
          const phase = SPRINT_PLAN.phases.find(p => p.id === d.phase);
          return `
            <div class="sprint-sdeliv">
              <div class="sprint-sdeliv__row">
                <span class="sprint-sdeliv__name">#${d.id} ${d.name}</span>
                <span class="sprint-sdeliv__pct">${prog.pct}%</span>
              </div>
              <div class="sprint-sdeliv__bar">
                <div class="sprint-sdeliv__fill" style="width: ${prog.pct}%; background: ${phase.color}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="sprint-sidebar__section">
        <h4 class="sprint-sidebar__title">Milestones</h4>
        <div class="sprint-smilestones">
          ${SPRINT_PLAN.milestones.map(m => {
            const isDone = currentDay >= m.day;
            const isCurrent = !isDone && currentDay >= m.day - 7;
            return `
              <div class="sprint-sm${isDone ? ' sprint-sm--done' : ''}${isCurrent ? ' sprint-sm--current' : ''}">
                <span class="sprint-sm__dot"></span>
                <span class="sprint-sm__label">${isDone ? '\u2713' : `D${m.day}`} ${m.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="sprint-sidebar__section sprint-streak">
        <span class="sprint-streak__fire">${streak > 0 ? '\ud83d\udd25' : '\u26aa'}</span>
        <span class="sprint-streak__num">${streak}</span>
        <span class="sprint-streak__label">day streak</span>
      </div>
    `;
  }

  // ── TODAY VIEW ──
  refreshSprintToday(currentDay) {
    const main = document.getElementById('sprint-main');
    const todayData = this.getTodayTasks();
    const currentPhase = this.getSprintPhase(currentDay);
    const dayContext = SPRINT_DAY_CONTEXT?.[currentDay] || {};
    const assistantMsg = SPRINT_ASSISTANT_MESSAGES?.[currentDay] || '';
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dateObj = new Date(SPRINT_PLAN.startDate);
    dateObj.setDate(dateObj.getDate() + currentDay - 1);
    const dayName = dayNames[dateObj.getDay()];
    const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

    // Count done for today
    const todayDone = todayData.tasks.filter(t => this.sprintChecks[t.key]).length;
    const todayTotal = todayData.tasks.length;
    const todayAllDone = todayTotal > 0 && todayDone === todayTotal;

    // Determine primary deliverable for today
    const delivCounts = {};
    todayData.tasks.forEach(t => { delivCounts[t.deliverable] = (delivCounts[t.deliverable] || 0) + 1; });
    const primaryDelivId = Object.entries(delivCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    const primaryDeliv = SPRINT_PLAN.deliverables.find(d => d.id === parseInt(primaryDelivId));

    // Check for missed tasks from previous days
    let missedCount = 0;
    const dayKeys = ['mon','tue','wed','thu','fri','sat'];
    SPRINT_PLAN.weeks.forEach(week => {
      dayKeys.forEach(dk => {
        const day = week.days[dk];
        if (!day || day.dayNum >= currentDay) return;
        day.tasks.forEach((t, idx) => {
          if (!this.sprintChecks[this.getTaskKey(week.weekNum, dk, idx)]) missedCount++;
        });
      });
    });
    const missedBanner = missedCount > 0 ? `
      <div class="sprint-catchup">
        <span class="sprint-catchup__icon">\u26a0</span>
        <span class="sprint-catchup__text">${missedCount} task${missedCount !== 1 ? 's' : ''} from previous days still open</span>
        <button class="sprint-catchup__btn" data-mode="week">View in Week</button>
      </div>
    ` : '';

    // Sunday handling
    if (todayData.dayKey === 'sun') {
      main.innerHTML = `
        <div class="sprint-today">
          ${missedBanner}
          ${assistantMsg ? `<div class="sprint-assistant"><div class="sprint-assistant__label">Advisor</div><p class="sprint-assistant__text">${assistantMsg}</p></div>` : ''}
          <div class="sprint-today-header">
            <h2 class="sprint-today-title">${dayName}, ${dateStr}</h2>
            <p class="sprint-today-summary">${todayData.sundayNote || 'Rest day'}</p>
          </div>
          <div class="sprint-today-rest">
            <p>Light day. Review your progress, catch up on anything from the week, or rest.</p>
          </div>
        </div>
      `;
      return;
    }

    main.innerHTML = `
      <div class="sprint-today">
        ${missedBanner}
        ${assistantMsg ? `<div class="sprint-assistant"><div class="sprint-assistant__label">Advisor</div><p class="sprint-assistant__text">${assistantMsg}</p></div>` : ''}

        <div class="sprint-today-header${todayAllDone ? ' sprint-today-header--done' : ''}">
          <h2 class="sprint-today-title">${dayName}, ${dateStr}</h2>
          <p class="sprint-today-theme">${dayContext.theme || currentPhase.name}</p>
          <div class="sprint-today-meta">
            <span>${todayTotal} task${todayTotal !== 1 ? 's' : ''}</span>
            ${dayContext.totalEstimate ? `<span>\u00b7 ~${dayContext.totalEstimate}</span>` : ''}
            ${primaryDeliv ? `<span>\u00b7 Builds <strong>#${primaryDeliv.id} ${primaryDeliv.name}</strong></span>` : ''}
          </div>
          ${todayAllDone ? '<div class="sprint-today-done-badge">\u2713 All tasks complete</div>' : ''}
        </div>

        <div class="sprint-today-tasks">
          ${todayData.tasks.map((t, idx) => {
            const checked = this.sprintChecks[t.key];
            const isExpanded = this.sprintExpandedTask === t.key;
            const detail = SPRINT_TASK_DETAILS?.[t.key];
            const deliv = SPRINT_PLAN.deliverables.find(d => d.id === t.deliverable);
            const phase = this.getSprintPhase(currentDay);

            return `
              <div class="sprint-tcard${checked ? ' sprint-tcard--done' : ''}${isExpanded ? ' sprint-tcard--expanded' : ''}">
                <div class="sprint-tcard__header" data-task-key="${t.key}">
                  <input type="checkbox" class="sprint-tcard__check" data-key="${t.key}" ${checked ? 'checked' : ''}>
                  <div class="sprint-tcard__info">
                    <span class="sprint-tcard__title">${t.text}</span>
                    ${detail?.why ? `<span class="sprint-tcard__why-preview">${detail.why.split('.')[0]}.</span>` : ''}
                  </div>
                  <div class="sprint-tcard__meta">
                    ${detail?.estimate ? `<span class="sprint-tcard__estimate">${detail.estimate}</span>` : ''}
                    ${deliv ? `<span class="sprint-tcard__tag" style="--phase-color: ${phase.color}">#${deliv.id}</span>` : ''}
                    <span class="sprint-tcard__chevron">${isExpanded ? '\u25B2' : '\u25BC'}</span>
                  </div>
                </div>
                ${isExpanded && detail ? `
                  <div class="sprint-tcard__detail">
                    <div class="sprint-tcard__section">
                      <h4 class="sprint-tcard__section-title">Why this matters</h4>
                      <p class="sprint-tcard__section-text">${detail.why}</p>
                      ${detail.buildsToward ? `<div class="sprint-tcard__builds"><strong>Builds toward:</strong> ${detail.buildsToward.join(' \u2192 ')}</div>` : ''}
                      ${detail.unlocks ? `<div class="sprint-tcard__unlocks"><strong>Unlocks:</strong> ${detail.unlocks.join(', ')}</div>` : ''}
                    </div>
                    <div class="sprint-tcard__section">
                      <h4 class="sprint-tcard__section-title">Steps</h4>
                      <div class="sprint-tcard__steps">
                        ${(detail.steps || []).map((step, si) => {
                          const stepKey = `step-${t.key}-${si}`;
                          const stepDone = this.sprintStepChecks[stepKey];
                          return `
                            <label class="sprint-step${stepDone ? ' sprint-step--done' : ''}">
                              <input type="checkbox" class="sprint-step__check" data-step-key="${stepKey}" ${stepDone ? 'checked' : ''}>
                              <span class="sprint-step__text">${si + 1}. ${step}</span>
                            </label>
                          `;
                        }).join('')}
                      </div>
                    </div>
                    <div class="sprint-tcard__section">
                      <h4 class="sprint-tcard__section-title">Expected result</h4>
                      <p class="sprint-tcard__section-text sprint-tcard__result">${detail.result || ''}</p>
                    </div>
                    ${detail.resources && detail.resources.length ? `
                      <div class="sprint-tcard__section">
                        <h4 class="sprint-tcard__section-title">Resources</h4>
                        <div class="sprint-tcard__resources">
                          ${detail.resources.map(r => {
                            const icon = r.type === 'video' ? '\ud83c\udfa5' : r.type === 'doc' ? '\ud83d\udcc4' : r.type === 'file' ? '\ud83d\udcc1' : '\ud83d\udd17';
                            return r.url
                              ? `<a class="sprint-tcard__resource sprint-tcard__resource--link" href="${r.url}" target="_blank" rel="noopener">${icon} ${r.label}</a>`
                              : `<span class="sprint-tcard__resource">${icon} ${r.label}</span>`;
                          }).join('')}
                        </div>
                      </div>
                    ` : ''}
                    ${detail.framework ? `<div class="sprint-tcard__framework">Framework: ${detail.framework}</div>` : ''}
                    ${!checked ? `<button class="sprint-tcard__complete-btn" data-key="${t.key}">\u2713 Mark Task Complete</button>` : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="sprint-scout" id="sprint-scout">
          <div class="sprint-scout__header">
            <h4 class="sprint-sidebar__title">Scout Briefing</h4>
            <span class="sprint-scout__hint">Run <code>/scout</code> in Claude Code for today's intelligence</span>
          </div>
        </div>
      </div>
    `;

    // Celebration: green glow + progress animation when all done
    if (todayAllDone) {
      const header = document.querySelector('.sprint-today-header--done');
      if (header && !header.dataset.celebrated) {
        header.dataset.celebrated = 'true';
        // Subtle glow animation
        header.style.transition = 'box-shadow 0.6s ease';
        setTimeout(() => { header.style.boxShadow = '0 0 20px rgba(46,125,50,0.3)'; }, 100);
      }
    }
  }

  // ── WEEK VIEW (existing grid, preserved) ──
  refreshSprintWeek(currentDay) {
    const main = document.getElementById('sprint-main');
    const week = this.getWeekTasks(this.sprintWeekNum);
    const weekPhase = week ? this.getSprintPhase(week.days.mon?.dayNum || 1) : this.getSprintPhase(currentDay);
    const dayKeys = ['mon','tue','wed','thu','fri','sat'];
    const dayLabels = ['Mon','Tue','Wed','Thu','Fri','Sat'];

    let weekNavHtml = `
      <div class="sprint-week-nav">
        <button class="sprint-nav-btn" data-dir="-1" ${this.sprintWeekNum <= 1 ? 'disabled' : ''}>\u2190</button>
        <span class="sprint-week-label">Week ${this.sprintWeekNum} \u2014 ${weekPhase.name}</span>
        <button class="sprint-nav-btn" data-dir="1" ${this.sprintWeekNum >= 14 ? 'disabled' : ''}>\u2192</button>
        <button class="sprint-nav-today btn-admin">Today</button>
      </div>
    `;

    if (!week) {
      main.innerHTML = weekNavHtml + '<p class="sprint-empty">No data for this week</p>';
      return;
    }

    const gridHtml = dayKeys.map((dk, i) => {
      const day = week.days[dk];
      if (!day) return `<div class="sprint-day sprint-day--empty"><div class="sprint-day__header"><span class="sprint-day__name">${dayLabels[i]}</span></div><p class="sprint-day__note">Rest day</p></div>`;

      const isToday = day.dayNum === currentDay;
      const isPast = day.dayNum < currentDay;
      const isFuture = day.dayNum > currentDay;
      const allTasks = day.tasks.map((t, idx) => ({
        ...t, key: this.getTaskKey(week.weekNum, dk, idx), isCustom: false,
      }));
      const customs = this.sprintCustomTasks[`w${week.weekNum}-${dk}`] || [];
      customs.forEach((ct, ci) => {
        allTasks.push({ ...ct, key: `w${week.weekNum}-${dk}-c${ci}`, isCustom: true, customIdx: ci });
      });
      const doneCount = allTasks.filter(t => this.sprintChecks[t.key]).length;
      const totalCount = allTasks.length;
      const allDone = totalCount > 0 && doneCount === totalCount;

      return `
        <div class="sprint-day${isToday ? ' sprint-day--today' : ''}${isPast ? ' sprint-day--past' : ''}${isFuture ? ' sprint-day--future' : ''}${allDone ? ' sprint-day--complete' : ''}">
          <div class="sprint-day__header">
            <span class="sprint-day__name">${dayLabels[i]}</span>
            <span class="sprint-day__num">Day ${day.dayNum}</span>
            <span class="sprint-day__date">${this.getSprintDateForDay(day.dayNum)}</span>
          </div>
          <div class="sprint-day__tasks">
            ${allTasks.map(t => {
              const checked = this.sprintChecks[t.key];
              const deliv = SPRINT_PLAN.deliverables.find(d => d.id === t.deliverable);
              return `
                <label class="sprint-task${checked ? ' sprint-task--done' : ''}">
                  <input type="checkbox" class="sprint-task__check" data-key="${t.key}" ${checked ? 'checked' : ''}>
                  <span class="sprint-task__text">${t.text}</span>
                  ${deliv ? `<span class="sprint-task__tag" style="--phase-color: ${this.getSprintPhase(day.dayNum).color}">#${deliv.id}</span>` : ''}
                  ${t.isCustom ? `<button class="sprint-task__del" onclick="event.preventDefault();event.stopPropagation();document.querySelector('[data-tab-content=sprint]').__panel.deleteSprintCustomTask(${week.weekNum},'${dk}',${t.customIdx})">&times;</button>` : ''}
                </label>
              `;
            }).join('')}
          </div>
          <div class="sprint-day__footer">
            <span class="sprint-day__count${allDone ? ' sprint-day__count--done' : ''}">${doneCount}/${totalCount}</span>
            <button class="sprint-day__add" data-day="${dk}" data-week="${week.weekNum}">+</button>
          </div>
        </div>
      `;
    }).join('');

    // Sunday
    let sundayHtml = '';
    if (week.sunday) {
      const isSundayToday = week.sunday.dayNum === currentDay;
      sundayHtml = `<div class="sprint-sunday__card${isSundayToday ? ' sprint-sunday--today' : ''}">
        <span class="sprint-sunday__label">Sun \u2014 Day ${week.sunday.dayNum}</span>
        <span class="sprint-sunday__note">${week.sunday.note}</span>
      </div>`;
    }

    main.innerHTML = `
      ${weekNavHtml}
      <div class="sprint-week">${gridHtml}</div>
      ${sundayHtml}
      <div class="sprint-add-task" id="sprint-add-task" style="display:none">
        <input type="text" id="sprint-new-task" placeholder="New task...">
        <select id="sprint-new-deliv">
          ${SPRINT_PLAN.deliverables.map(d => `<option value="${d.id}">#${d.id} ${d.name}</option>`).join('')}
        </select>
        <button id="sprint-add-btn" class="btn-admin" onclick="document.querySelector('[data-tab-content=sprint]').__panel.addSprintTask()">Add</button>
        <button id="sprint-add-cancel" class="btn-cancel" onclick="this.parentElement.style.display='none'">Cancel</button>
      </div>
    `;
    document.querySelector('[data-tab-content="sprint"]').__panel = this;
  }

  // ── MAP VIEW (Brand Building Roadmap) ──
  refreshSprintMap(currentDay) {
    const main = document.getElementById('sprint-main');
    const delivs = SPRINT_PLAN.deliverables;

    // Build skill tree nodes with progress
    const nodes = delivs.map(d => {
      const prog = this.calculateDeliverableProgress(d.id);
      const phase = SPRINT_PLAN.phases.find(p => p.id === d.phase);
      return { ...d, ...prog, phase, phaseObj: phase };
    });

    const node = (n) => {
      const isActive = currentDay >= n.phaseObj.startDay && currentDay <= n.phaseObj.endDay;
      return `
        <div class="sprint-map__node${n.pct === 100 ? ' sprint-map__node--done' : ''}${isActive ? ' sprint-map__node--active' : ''}" style="--node-color: ${n.phaseObj.color}">
          <span class="sprint-map__node-id">#${n.id}</span>
          <span class="sprint-map__node-name">${n.name}</span>
          <span class="sprint-map__node-tagline">${n.tagline}</span>
          <div class="sprint-map__node-bar"><div style="width:${n.pct}%;background:${n.phaseObj.color}"></div></div>
          <span class="sprint-map__node-pct">${n.pct}%</span>
        </div>
      `;
    };

    const byId = (...ids) => nodes.filter(n => ids.includes(n.id));

    main.innerHTML = `
      <div class="sprint-map">
        <div class="sprint-map__goal">
          <div class="sprint-map__goal-node">
            <strong>24/7 Content System</strong>
            <span>Works while you sleep</span>
          </div>
        </div>

        <div class="sprint-map__line"></div>
        <div class="sprint-map__phase-label" style="color: var(--sprint-phase-d)">Phase D \u2014 YouTube + Scale <span class="sprint-map__phase-days">Days 50\u201398</span></div>
        <div class="sprint-map__tier">
          ${byId(6).map(node).join('')}
        </div>

        <div class="sprint-map__line"></div>
        <div class="sprint-map__phase-label" style="color: var(--sprint-phase-c)">Phase C \u2014 Automation <span class="sprint-map__phase-days">Days 36\u201349</span></div>
        <div class="sprint-map__tier">
          ${byId(7).map(node).join('')}
        </div>

        <div class="sprint-map__line"></div>
        <div class="sprint-map__phase-label" style="color: var(--sprint-phase-b)">Phase B \u2014 Content Engine <span class="sprint-map__phase-days">Days 15\u201335</span></div>
        <div class="sprint-map__tier">
          ${byId(5, 4).map(node).join('')}
        </div>
        <div class="sprint-map__line"></div>
        <div class="sprint-map__tier">
          ${byId(3, 2).map(node).join('')}
        </div>

        <div class="sprint-map__line"></div>
        <div class="sprint-map__phase-label" style="color: var(--sprint-phase-a)">Phase A \u2014 Foundation <span class="sprint-map__phase-days">Days 1\u201314</span></div>
        <div class="sprint-map__tier">
          ${byId(8, 1).map(node).join('')}
        </div>

        <div class="sprint-map__start">\u25B2 START HERE</div>
      </div>
    `;
  }

  // ─── BUDGET TRACKER ───────────────────────────────────────
  populateBudgetDaySelector() {
    const sel = document.getElementById('budget-day');
    const w4Labels = { 'w4-mon': '23 Mar', 'w4-tue': '24 Mar', 'w4-wed': '25 Mar', 'w4-thu': '26 Mar', 'w4-fri': '27 Mar', 'w4-sat': '28 Mar', 'w4-sun': '29 Mar' };
    sel.innerHTML = WEEK_DAYS.map(d => {
      const label = d.weekNum <= 3 ? `${d.dayName} ${d.date}` : `${d.dayName} ${w4Labels[d.id] || ''}`;
      return `<option value="${d.id}">${label}</option>`;
    }).join('');
  }

  addPayment() {
    const payee = document.getElementById('budget-payee').value.trim();
    const amountStr = document.getElementById('budget-amount').value;
    const dayId = document.getElementById('budget-day').value;
    if (!payee || !amountStr) return;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return;

    const resetForm = () => {
      document.getElementById('budget-payee').value = '';
      document.getElementById('budget-amount').value = '';
      document.getElementById('budget-form-title').textContent = '\u{1F4B8} Add Payment';
      document.getElementById('budget-add-btn').textContent = 'Add Payment';
      document.getElementById('budget-cancel-btn').style.display = 'none';
      document.querySelector('.budget-add')?.classList.remove('is-editing');
    };

    if (this._convertingBiPayment) {
      // Convert built-in payment: hide original, create user copy
      const biId = this._convertingBiPayment;
      // Remove built-in from display by marking it paid and creating user replacement
      const paidMap = this.load('admin-builtin-paid') || {};
      paidMap[biId] = true;
      this.save('admin-builtin-paid', paidMap);
      this.payments.push({ id: Date.now(), payee, amount, dayId, paid: false, created: new Date().toISOString() });
      this._convertingBiPayment = null;
      resetForm();
    } else if (this.editingPaymentId !== null) {
      // Update existing user payment
      const p = this.payments.find(p => p.id === this.editingPaymentId);
      if (p) {
        p.payee = payee;
        p.amount = amount;
        p.dayId = dayId;
      }
      this.editingPaymentId = null;
      resetForm();
    } else {
      this.payments.push({ id: Date.now(), payee, amount, dayId, paid: false, created: new Date().toISOString() });
    }

    this.save('admin-payments', this.payments);
    document.getElementById('budget-payee').value = '';
    document.getElementById('budget-amount').value = '';
    this.refreshBudget();
    if (document.getElementById('cal-body')) this.refreshCalendar();
  }

  startEditPayment(id) {
    const p = this.payments.find(p => p.id === id);
    if (!p) return;
    this.editingPaymentId = id;
    this._convertingBiPayment = null;
    document.getElementById('budget-payee').value = p.payee;
    document.getElementById('budget-amount').value = p.amount;
    document.getElementById('budget-day').value = p.dayId;
    document.getElementById('budget-form-title').textContent = '\u{1F4B8} Edit Payment';
    document.getElementById('budget-add-btn').textContent = 'Save ✓';
    document.getElementById('budget-cancel-btn').style.display = '';
    const form = document.querySelector('.budget-add');
    form?.classList.add('is-editing');
    form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('budget-payee').focus();
  }

  startEditBuiltInPayment(biId) {
    const p = this.builtInPayments.find(p => p.id === biId);
    if (!p) return;
    this._convertingBiPayment = biId;
    this.editingPaymentId = null;
    document.getElementById('budget-payee').value = p.payee;
    document.getElementById('budget-amount').value = p.amount || '';
    if (p.dayId) document.getElementById('budget-day').value = p.dayId;
    document.getElementById('budget-form-title').textContent = '\u{1F4B8} Edit Payment';
    document.getElementById('budget-add-btn').textContent = 'Save ✓';
    document.getElementById('budget-cancel-btn').style.display = '';
    const form = document.querySelector('.budget-add');
    form?.classList.add('is-editing');
    form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('budget-payee').focus();
  }

  cancelEditPayment() {
    this.editingPaymentId = null;
    this._convertingBiPayment = null;
    document.getElementById('budget-payee').value = '';
    document.getElementById('budget-amount').value = '';
    document.getElementById('budget-form-title').textContent = '\u{1F4B8} Add Payment';
    document.getElementById('budget-add-btn').textContent = 'Add Payment';
    document.getElementById('budget-cancel-btn').style.display = 'none';
    document.querySelector('.budget-add')?.classList.remove('is-editing');
  }

  togglePayment(id) {
    const payment = this.payments.find(p => p.id === id);
    if (!payment) return;
    payment.paid = !payment.paid;
    this.save('admin-payments', this.payments);
    this.refreshBudget();
    if (document.getElementById('cal-body')) this.refreshCalendar();
  }

  deletePayment(id) {
    this.payments = this.payments.filter(p => p.id !== id);
    this.save('admin-payments', this.payments);
    this.refreshBudget();
    if (document.getElementById('cal-body')) this.refreshCalendar();
  }

  toggleBuiltInPayment(id) {
    // Store paid state for built-in payments in localStorage
    const paidMap = this.load('admin-builtin-paid') || {};
    paidMap[id] = !paidMap[id];
    this.save('admin-builtin-paid', paidMap);
    this.refreshBudget();
    if (document.getElementById('cal-body')) this.refreshCalendar();
  }

  refreshBudget() {
    const list = document.getElementById('budget-list');
    const summary = document.getElementById('budget-summary');
    if (!list || !summary) return;

    const paidMap = this.load('admin-builtin-paid') || {};
    // Merge built-in + user payments
    const allPayments = [
      ...this.builtInPayments.map(p => ({ ...p, paid: !!paidMap[p.id], isBuiltIn: true })),
      ...this.payments.map(p => ({ ...p, isBuiltIn: false })),
    ];

    const confirmed = allPayments.filter(p => p.amount > 0);
    const total = confirmed.reduce((s, p) => s + p.amount, 0);
    const unpaid = confirmed.filter(p => !p.paid).reduce((s, p) => s + p.amount, 0);
    const paidTotal = confirmed.filter(p => p.paid).reduce((s, p) => s + p.amount, 0);

    summary.innerHTML = allPayments.length ? `
      <div class="budget-summary__item">
        <span class="budget-summary__label">Total:</span>
        <span class="budget-summary__value">S$${total.toFixed(2)}</span>
      </div>
      <div class="budget-summary__item">
        <span class="budget-summary__label">Outstanding:</span>
        <span class="budget-summary__value" style="color: var(--color-payment)">S$${unpaid.toFixed(2)}</span>
      </div>
      <div class="budget-summary__item">
        <span class="budget-summary__label">Paid:</span>
        <span class="budget-summary__value" style="color: #16a34a">S$${paidTotal.toFixed(2)}</span>
      </div>
    ` : '';

    const sorted = [...allPayments].sort((a, b) => {
      if (a.paid !== b.paid) return a.paid ? 1 : -1;
      const aKey = a.dayId || 'zzz';
      const bKey = b.dayId || 'zzz';
      return aKey.localeCompare(bKey);
    });

    list.innerHTML = sorted.map(p => {
      const dayLabel = p.dueLabel || (() => {
        const day = WEEK_DAYS.find(d => d.id === p.dayId);
        return day ? `${day.dayName} ${day.date || ''}` : 'TBC';
      })();
      const amountStr = p.amount > 0 ? `S$${p.amount.toFixed(2)}` : 'TBC';
      const tbc = p.amount === 0 ? ' budget-card--tbc' : '';
      return `
        <div class="budget-card${p.paid ? ' budget-card--paid' : ''}${tbc}" data-id="${p.id}">
          <input type="checkbox" class="budget-card__check" data-id="${p.id}" data-builtin="${p.isBuiltIn}" ${p.paid ? 'checked' : ''}>
          <div class="budget-card__info">
            <div class="budget-card__payee">${p.payee}</div>
            <div class="budget-card__meta">\u{1F4C5} Due: ${dayLabel}</div>
          </div>
          <span class="budget-card__amount">${amountStr}</span>
          <button class="budget-card__edit" data-id="${p.id}" data-builtin="${p.isBuiltIn}">✏️</button>
          ${!p.isBuiltIn ? `<button class="budget-card__del" data-id="${p.id}">&times;</button>` : ''}
        </div>
      `;
    }).join('') || '<p class="budget-empty">No payments tracked. Add one above.</p>';

    list.querySelectorAll('.budget-card__check').forEach(cb => {
      const id = cb.dataset.id;
      const isBuiltIn = cb.dataset.builtin === 'true';
      if (isBuiltIn) {
        cb.addEventListener('change', () => this.toggleBuiltInPayment(id));
      } else {
        cb.addEventListener('change', () => this.togglePayment(parseInt(id)));
      }
    });
    list.querySelectorAll('.budget-card__edit').forEach(btn => {
      const id = btn.dataset.id;
      const isBuiltIn = btn.dataset.builtin === 'true';
      btn.addEventListener('click', () => {
        if (isBuiltIn) this.startEditBuiltInPayment(id);
        else this.startEditPayment(parseInt(id));
      });
    });
    list.querySelectorAll('.budget-card__del').forEach(btn => {
      btn.addEventListener('click', () => this.deletePayment(parseInt(btn.dataset.id)));
    });
  }

  addTask() {
    const title = document.getElementById('kanban-title').value.trim();
    const desc = document.getElementById('kanban-desc').value.trim();
    if (!title) return;

    if (this.editingTaskId !== null) {
      // Update existing task
      const task = this.tasks.find(t => t.id === this.editingTaskId);
      if (task) {
        task.title = title;
        task.desc = desc;
      }
      this.editingTaskId = null;
      document.getElementById('kanban-form-title').textContent = '\u{1F4CB} Add Task';
      document.getElementById('kanban-add-btn').textContent = 'Add Task';
      document.getElementById('kanban-cancel-btn').style.display = 'none';
      document.querySelector('.kanban-add')?.classList.remove('is-editing');
    } else {
      this.tasks.push({ id: Date.now(), title, desc, status: 'todo', created: new Date().toISOString() });
    }

    this.save('admin-tasks', this.tasks);
    document.getElementById('kanban-title').value = '';
    document.getElementById('kanban-desc').value = '';
    this.refreshProjects();
  }

  startEditTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    this.editingTaskId = id;
    document.getElementById('kanban-title').value = task.title;
    document.getElementById('kanban-desc').value = task.desc || '';
    document.getElementById('kanban-form-title').textContent = '\u{1F4CB} Edit Task';
    document.getElementById('kanban-add-btn').textContent = 'Save ✓';
    document.getElementById('kanban-cancel-btn').style.display = '';
    const form = document.querySelector('.kanban-add');
    form?.classList.add('is-editing');
    form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('kanban-title').focus();
  }

  cancelEditTask() {
    this.editingTaskId = null;
    document.getElementById('kanban-title').value = '';
    document.getElementById('kanban-desc').value = '';
    document.getElementById('kanban-form-title').textContent = '\u{1F4CB} Add Task';
    document.getElementById('kanban-add-btn').textContent = 'Add Task';
    document.getElementById('kanban-cancel-btn').style.display = 'none';
    document.querySelector('.kanban-add')?.classList.remove('is-editing');
  }

  moveTask(id, newStatus) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    const wasDone = task.status === 'done';
    task.status = newStatus;
    this.save('admin-tasks', this.tasks);
    this.refreshProjects();

    // Confetti when moved to done!
    if (newStatus === 'done' && !wasDone) {
      const card = document.querySelector(`.kanban-card[data-id="${id}"]`);
      if (card) fireConfetti(card);
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save('admin-tasks', this.tasks);
    this.refreshProjects();
  }

  refreshProjects() {
    const statuses = { todo: 'kanban-todo', progress: 'kanban-progress', done: 'kanban-done' };
    Object.entries(statuses).forEach(([status, containerId]) => {
      const container = document.getElementById(containerId);
      const items = this.tasks.filter(t => t.status === status);
      container.innerHTML = items.map(t => {
        const moveButtons = this.getMoveButtons(t.status, t.id);
        return `
          <div class="kanban-card${status === 'done' ? ' kanban-card--done' : ''}" data-id="${t.id}">
            <div class="kanban-card__header">
              <span class="kanban-card__title">${t.title}</span>
              <span class="kanban-card__btns"><button class="kanban-card__edit" data-id="${t.id}">✏️</button><button class="kanban-card__del" data-id="${t.id}">&times;</button></span>
            </div>
            ${t.desc ? `<p class="kanban-card__desc">${t.desc}</p>` : ''}
            <div class="kanban-card__actions">${moveButtons}</div>
          </div>
        `;
      }).join('') || '<p class="kanban-empty">No tasks</p>';
    });

    // Bind move, edit & delete buttons
    document.querySelectorAll('.kanban-move').forEach(btn => {
      btn.addEventListener('click', () => this.moveTask(parseInt(btn.dataset.id), btn.dataset.to));
    });
    document.querySelectorAll('.kanban-card__edit').forEach(btn => {
      btn.addEventListener('click', () => this.startEditTask(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.kanban-card__del').forEach(btn => {
      btn.addEventListener('click', () => this.deleteTask(parseInt(btn.dataset.id)));
    });
  }

  getMoveButtons(status, id) {
    // Returns arrow buttons to move task to adjacent columns
    if (status === 'todo') return `<button class="kanban-move" data-id="${id}" data-to="progress">\u2192 In Progress</button>`;
    if (status === 'progress') return `<button class="kanban-move" data-id="${id}" data-to="todo">\u2190 To Do</button><button class="kanban-move kanban-move--done" data-id="${id}" data-to="done">Done \u2713</button>`;
    if (status === 'done') return `<button class="kanban-move" data-id="${id}" data-to="progress">\u2190 Reopen</button>`;
    return '';
  }

  // ─── NOTES ─────────────────────────────────────────────────
  renderNotes() {
    const panel = document.querySelector('[data-tab-content="notes"]');
    panel.innerHTML = `
      <div class="admin-page">
        <div class="admin-page__header">
          <h2>Notes</h2>
        </div>
        <div class="notes-add">
          <input type="text" id="note-title" placeholder="Note title">
          <textarea id="note-body" placeholder="Write your note..." rows="3"></textarea>
          <button id="note-add-btn" class="btn-admin">Add Note</button>
        </div>
        <div id="notes-list" class="notes-list"></div>
      </div>
    `;

    panel.querySelector('#note-add-btn').addEventListener('click', () => this.addNote());
    this.refreshNotes();
  }

  addNote() {
    const title = document.getElementById('note-title').value.trim();
    const body = document.getElementById('note-body').value.trim();
    if (!title && !body) return;
    this.notes.unshift({ id: Date.now(), title: title || 'Untitled', body, created: new Date().toISOString() });
    this.save('admin-notes', this.notes);
    document.getElementById('note-title').value = '';
    document.getElementById('note-body').value = '';
    this.refreshNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.save('admin-notes', this.notes);
    this.refreshNotes();
  }

  refreshNotes() {
    const list = document.getElementById('notes-list');
    list.innerHTML = this.notes.map(n => `
      <div class="note-card">
        <div class="note-card__header">
          <h4 class="note-card__title">${n.title}</h4>
          <span class="note-card__date">${new Date(n.created).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
          <button class="note-card__del" data-id="${n.id}">&times;</button>
        </div>
        ${n.body ? `<p class="note-card__body">${n.body.replace(/\n/g, '<br>')}</p>` : ''}
      </div>
    `).join('') || '<p class="notes-empty">No notes yet. Add one above.</p>';

    list.querySelectorAll('.note-card__del').forEach(btn => {
      btn.addEventListener('click', () => this.deleteNote(parseInt(btn.dataset.id)));
    });
  }
}
