/**
 * Admin Panel — Personal dashboard (hidden behind ?admin URL param)
 * Tabs: Household | Calendar | Projects | Notes
 */
import { WEEK_DAYS } from './data.js?v=43';

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
  }

  detectCurrentWeek() {
    const today = new Date();
    const day = today.getDate();
    if (day <= 8) return 1;
    if (day <= 15) return 2;
    if (day <= 22) return 3;
    return 4;
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
      <button class="admin-tab" data-tab="projects">Projects</button>
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
    ['calendar', 'projects', 'notes'].forEach(id => {
      const panel = document.createElement('div');
      panel.className = `admin-panel-content admin-panel-content--${id}${id === 'calendar' ? ' is-active' : ''}`;
      panel.dataset.tabContent = id;
      body.appendChild(panel);
    });

    // Render personal tabs
    this.renderCalendar();
    this.renderProjects();
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
      this.currentWeek = Math.max(1, Math.min(4, this.currentWeek + parseInt(btn.dataset.dir)));
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
    const w4Labels = { 'w4-mon': '23 Mar', 'w4-tue': '24 Mar', 'w4-wed': '25 Mar', 'w4-thu': '26 Mar', 'w4-fri': '27 Mar', 'w4-sat': '28 Mar', 'w4-sun': '29 Mar' };
    sel.innerHTML = WEEK_DAYS.map(d => {
      const label = d.weekNum <= 3 ? `${d.dayName} ${d.date}` : `${d.dayName} ${w4Labels[d.id] || ''}`;
      return `<option value="${d.id}">${label}</option>`;
    }).join('');
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

    // Built-in data from WEEK_DAYS
    const wd = WEEK_DAYS.find(w => w.id === dayId);
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

    const w4Labels = { 'w4-mon': '23 March', 'w4-tue': '24 March', 'w4-wed': '25 March', 'w4-thu': '26 March', 'w4-fri': '27 March', 'w4-sat': '28 March', 'w4-sun': '29 March' };
    const dayLabel = wd ? `${wd.dayName} ${wd.date || w4Labels[dayId] || ''}` : dayId;
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

    if (biRef.startsWith('leon-')) {
      dayId = biRef.replace('leon-', '');
      const wd = WEEK_DAYS.find(w => w.id === dayId);
      title = wd?.leonActivity || '';
      category = 'leon';
    } else if (biRef.startsWith('admin-')) {
      const parts = biRef.split('-'); // admin-w1-mon-0
      const idx = parseInt(parts.pop());
      dayId = parts.slice(1).join('-');
      const wd = WEEK_DAYS.find(w => w.id === dayId);
      title = wd?.adminEvents?.[idx] || '';
      category = 'admin';
    } else if (biRef.startsWith('org-')) {
      dayId = biRef.replace('org-', '');
      const wd = WEEK_DAYS.find(w => w.id === dayId);
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

  /** Resolve whether a dayId matches a specific date number in March 2026 */
  dayIdMatchesDate(dayId, d) {
    if (!dayId) return false;
    const wd = WEEK_DAYS.find(w => w.id === dayId);
    if (!wd) return false;
    if (wd.weekNum <= 3) return parseInt(wd.date) === d;
    // Week 4 template: match by day-of-week for d >= 23
    if (d < 23) return false;
    const date = new Date(2026, 2, d);
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

  refreshCalendar() {
    const body = document.getElementById('cal-body');
    const label = document.getElementById('cal-week-label');
    // Reset form + clear day events panel on any calendar refresh
    this.resetCalendarForm();
    if (this.calendarView === 'week') {
      const weekDays = WEEK_DAYS.filter(d => d.weekNum === this.currentWeek);
      const weekTitles = { 1: 'Week 1 — 2\u20138 Mar', 2: 'Week 2 — 9\u201315 Mar', 3: 'Week 3 — 16\u201322 Mar', 4: 'Week 4+ — 23\u201329 Mar' };
      label.textContent = weekTitles[this.currentWeek];
      body.innerHTML = `<div class="cal-week">${weekDays.map(d => this.renderCalDay(d)).join('')}</div>`;
    } else {
      body.innerHTML = this.renderMonthView();
    }

    // Click event → show that day's events in the edit panel
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
      if (sel) sel.value = dayId;
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
      // Find the WEEK_DAYS entry for this date
      const wd = WEEK_DAYS.find(w => {
        const dateNum = parseInt(w.date);
        return dateNum === d && w.weekNum <= 3;
      }) || WEEK_DAYS.find(w => {
        if (w.weekNum !== 4) return false;
        const date = new Date(2026, 2, d);
        const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
        return w.dayName === dayName && d >= 23;
      });
      if (wd) {
        numEl.style.cursor = 'pointer';
        numEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showDay(wd.id);
        });
      }
    });

    // Bind legend filter buttons (month view)
    body.querySelectorAll('.cal-legend-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.monthFilter = btn.dataset.filter;
        this.refreshCalendar();
      });
    });
  }

  renderCalDay(day) {
    const events = [];
    const hidden = this.hiddenBuiltIns;

    // Leon's activity
    if (day.leonActivity) {
      const ref = `leon-${day.id}`;
      if (!hidden.includes(ref)) {
        events.push(`<div class="cal-event cal-event--leon" data-bi="${ref}">\u{1F476}\u{1F3FC} ${day.leonActivity}</div>`);
      }
    }

    // Admin events
    if (day.adminEvents?.length) {
      day.adminEvents.forEach((e, i) => {
        const ref = `admin-${day.id}-${i}`;
        if (!hidden.includes(ref)) {
          events.push(`<div class="cal-event cal-event--admin" data-bi="${ref}">\u{1F4CC} ${e}</div>`);
        }
      });
    }

    // Org task
    if (day.orgTask) {
      const ref = `org-${day.id}`;
      if (!hidden.includes(ref)) {
        events.push(`<div class="cal-event cal-event--org" data-bi="${ref}">\u{1F4E6} ${day.orgTask}${day.orgTime ? ' \u2014 ' + day.orgTime : ''}</div>`);
      }
    }

    // Built-in personal events
    const builtIn = this.builtInEvents.filter(e => e.dayId === day.id);
    builtIn.forEach(e => {
      const ref = `bi-${e.id}`;
      if (!hidden.includes(ref)) {
        events.push(`<div class="cal-event cal-event--personal" data-bi="${ref}">\u{1F481}\u200D\u2640\uFE0F ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
      }
    });

    // User-added events (with category support)
    const catEmojis = { personal: '\u{1F481}\u200D\u2640\uFE0F', leon: '\u{1F476}\u{1F3FC}', admin: '\u{1F4CC}', org: '\u{1F4E6}', payment: '\u{1F4B8}' };
    const myEvents = this.events.filter(e => e.dayId === day.id);
    myEvents.forEach(e => {
      const cat = e.category || 'personal';
      const emoji = catEmojis[cat] || catEmojis.personal;
      events.push(`<div class="cal-event cal-event--${cat}" data-user-id="${e.id}">${emoji} ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
    });

    // Payment events — built-in + user (unpaid only)
    const paidMap = this.load('admin-builtin-paid') || {};
    const biPayments = this.builtInPayments.filter(p => p.dayId === day.id && !paidMap[p.id]);
    biPayments.forEach(p => {
      events.push(`<div class="cal-event cal-event--payment">\u{1F4B8} ${p.payee}${p.amount ? ' \u2014 S$' + p.amount.toFixed(0) : ''}</div>`);
    });
    const userPayments = this.payments.filter(p => p.dayId === day.id && !p.paid);
    userPayments.forEach(p => {
      events.push(`<div class="cal-event cal-event--payment">\u{1F4B8} ${p.payee} \u2014 S$${p.amount.toFixed(2)}</div>`);
    });

    const isOff = day.hazelOff || day.nicaOff;
    const offLabel = day.hazelOff ? 'Hazel off' : day.nicaOff ? 'Nica off' : '';

    // Detect if this day is today — week 4 days don't have .date, use fallback
    const w4Dates = { 'w4-mon': '23', 'w4-tue': '24', 'w4-wed': '25', 'w4-thu': '26', 'w4-fri': '27', 'w4-sat': '28', 'w4-sun': '29' };
    const dateDisplay = day.date || w4Dates[day.id] || '';
    const today = new Date();
    const dateNum = parseInt(dateDisplay);
    const isToday = today.getMonth() === 2 && today.getFullYear() === 2026 && today.getDate() === dateNum;

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
    const catEmojis = { personal: '\u{1F481}\u200D\u2640\uFE0F', leon: '\u{1F476}\u{1F3FC}', admin: '\u{1F4CC}', org: '\u{1F4E6}', payment: '\u{1F4B8}' };
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const header = dayNames.map(d => `<div class="cal-month-header">${d}</div>`).join('');
    const firstDayOffset = 6; // March 1, 2026 = Sunday → index 6 in Mon-based week
    const daysInMonth = 31;
    const hidden = this.hiddenBuiltIns;

    let cells = '';
    for (let i = 0; i < firstDayOffset; i++) cells += '<div class="cal-month-cell cal-month-cell--empty"></div>';

    const paidMap = this.load('admin-builtin-paid') || {};

    for (let d = 1; d <= daysInMonth; d++) {
      const weekDay = WEEK_DAYS.find(wd => {
        const dateNum = parseInt(wd.date);
        return dateNum === d && wd.weekNum <= 3;
      }) || WEEK_DAYS.find(wd => {
        if (wd.weekNum !== 4) return false;
        const date = new Date(2026, 2, d);
        const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
        return wd.dayName === dayName && d >= 23;
      });

      const items = [];

      // Leon's activities
      if ((filter === 'all' || filter === 'leon') && weekDay?.leonActivity) {
        const ref = `leon-${weekDay.id}`;
        if (!hidden.includes(ref)) {
          items.push(`<div class="cal-mini cal-mini--leon" data-bi="${ref}">\u{1F476}\u{1F3FC} ${weekDay.leonActivity}</div>`);
        }
      }

      // Admin / House Errands
      if ((filter === 'all' || filter === 'admin') && weekDay?.adminEvents?.length) {
        weekDay.adminEvents.forEach((e, i) => {
          const ref = `admin-${weekDay.id}-${i}`;
          if (!hidden.includes(ref)) {
            items.push(`<div class="cal-mini cal-mini--admin" data-bi="${ref}">\u{1F4CC} ${e}</div>`);
          }
        });
      }

      // Organisation tasks
      if ((filter === 'all' || filter === 'org') && weekDay?.orgTask) {
        const ref = `org-${weekDay.id}`;
        if (!hidden.includes(ref)) {
          items.push(`<div class="cal-mini cal-mini--org" data-bi="${ref}">\u{1F4E6} ${weekDay.orgTask}</div>`);
        }
      }

      // Built-in personal events (Gym, Steffi-Leica, Emi's Birthday)
      if (filter === 'all' || filter === 'personal') {
        const biEvents = this.builtInEvents.filter(e => this.dayIdMatchesDate(e.dayId, d));
        biEvents.forEach(e => {
          const ref = `bi-${e.id}`;
          if (!hidden.includes(ref)) {
            items.push(`<div class="cal-mini cal-mini--personal" data-bi="${ref}">\u{1F481}\u200D\u2640\uFE0F ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
          }
        });
      }

      // User-added events (category-aware)
      const userEvents = this.events.filter(e => this.dayIdMatchesDate(e.dayId, d));
      userEvents.forEach(e => {
        const cat = e.category || 'personal';
        if (filter !== 'all' && filter !== cat) return;
        const emoji = catEmojis[cat] || catEmojis.personal;
        items.push(`<div class="cal-mini cal-mini--${cat}" data-user-id="${e.id}">${emoji} ${e.time ? e.time + ' ' : ''}${e.title}</div>`);
      });

      // Built-in payments (unpaid only)
      if (filter === 'all' || filter === 'payment') {
        const biPayments = this.builtInPayments.filter(p => !paidMap[p.id] && this.dayIdMatchesDate(p.dayId, d));
        biPayments.forEach(p => {
          items.push(`<div class="cal-mini cal-mini--payment">\u{1F4B8} ${p.payee}${p.amount ? ' S$' + p.amount.toFixed(0) : ''}</div>`);
        });
        const userPayments = this.payments.filter(p => !p.paid && this.dayIdMatchesDate(p.dayId, d));
        userPayments.forEach(p => {
          items.push(`<div class="cal-mini cal-mini--payment">\u{1F4B8} ${p.payee} S$${p.amount.toFixed(0)}</div>`);
        });
      }

      const isToday = d === new Date().getDate() && new Date().getMonth() === 2;
      cells += `
        <div class="cal-month-cell${isToday ? ' cal-month-cell--today' : ''}">
          <span class="cal-month-num">${d}</span>
          <div class="cal-month-items">${items.join('')}</div>
        </div>`;
    }

    const filters = [
      { key: 'all', label: 'All' },
      { key: 'leon', label: '\u{1F476}\u{1F3FC} Leon' },
      { key: 'admin', label: '\u{1F4CC} Errands' },
      { key: 'org', label: '\u{1F4E6} Organisation' },
      { key: 'personal', label: '\u{1F481}\u200D\u2640\uFE0F Personal' },
      { key: 'payment', label: '\u{1F4B8} Payment' },
    ];
    const legend = filters.map(f =>
      `<button class="cal-legend-btn${filter === f.key ? ' is-active' : ''}" data-filter="${f.key}">${f.label}</button>`
    ).join('');

    return `
      <div class="cal-month">
        <h3 class="cal-month-title">March 2026</h3>
        <div class="cal-month-grid">${header}${cells}</div>
        <div class="cal-month-legend">${legend}</div>
      </div>
    `;
  }

  // ─── PROJECTS ──────────────────────────────────────────────
  renderProjects() {
    const panel = document.querySelector('[data-tab-content="projects"]');
    panel.innerHTML = `
      <div class="admin-page">
        <div class="admin-page__header">
          <h2>Projects</h2>
        </div>

        <!-- BUDGET TRACKER -->
        <h3 class="projects-section-title" id="budget-form-title">\u{1F4B8} Add Payment</h3>
        <div class="budget-add">
          <input type="text" id="budget-payee" placeholder="What is it for?">
          <input type="number" id="budget-amount" placeholder="Amount (S$)" min="0" step="0.01">
          <select id="budget-day"></select>
          <button id="budget-add-btn" class="btn-admin">Add Payment</button>
          <button id="budget-cancel-btn" class="btn-cancel" style="display:none">Cancel</button>
        </div>
        <div class="budget-summary" id="budget-summary"></div>
        <div class="budget-list" id="budget-list"></div>

        <!-- TASK BOARD -->
        <h3 class="projects-section-title" id="kanban-form-title">\u{1F4CB} Add Task</h3>
        <div class="kanban-add">
          <input type="text" id="kanban-title" placeholder="New task title">
          <input type="text" id="kanban-desc" placeholder="Description (optional)">
          <button id="kanban-add-btn" class="btn-admin">Add Task</button>
          <button id="kanban-cancel-btn" class="btn-cancel" style="display:none">Cancel</button>
        </div>
        <div class="kanban" id="kanban-board">
          <div class="kanban-col" data-status="todo">
            <h3 class="kanban-col__title">To Do</h3>
            <div class="kanban-col__items" id="kanban-todo"></div>
          </div>
          <div class="kanban-col" data-status="progress">
            <h3 class="kanban-col__title">In Progress</h3>
            <div class="kanban-col__items" id="kanban-progress"></div>
          </div>
          <div class="kanban-col" data-status="done">
            <h3 class="kanban-col__title kanban-col__title--done">Done \u{1F389}</h3>
            <div class="kanban-col__items" id="kanban-done"></div>
          </div>
        </div>
      </div>
    `;

    // Budget tracker bindings
    this.populateBudgetDaySelector();
    panel.querySelector('#budget-add-btn').addEventListener('click', () => this.addPayment());
    panel.querySelector('#budget-cancel-btn').addEventListener('click', () => this.cancelEditPayment());
    panel.querySelector('#budget-payee').addEventListener('keydown', (e) => { if (e.key === 'Enter') this.addPayment(); });
    this.refreshBudget();

    // Kanban bindings
    panel.querySelector('#kanban-add-btn').addEventListener('click', () => this.addTask());
    panel.querySelector('#kanban-cancel-btn').addEventListener('click', () => this.cancelEditTask());
    panel.querySelector('#kanban-title').addEventListener('keydown', (e) => { if (e.key === 'Enter') this.addTask(); });
    this.refreshProjects();
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
