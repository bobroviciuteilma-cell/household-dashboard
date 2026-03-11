// ─────────────────────────────────────────────────────────────
//  data.js — Household Dashboard Data
//  All 28 days across 4 weeks + reference data
// ─────────────────────────────────────────────────────────────

// === TASK TYPES ===
export const TASK_TYPES = {
  S:   { id: 'standard',     css: '' },
  O:   { id: 'organisation', css: 'task--organisation' },
  A:   { id: 'admin',        css: 'task--admin' },
  L:   { id: 'leon',         css: 'task--leon' },
  D:   { id: 'deep-clean',   css: 'task--deep-clean' },
  SEC: { id: 'section',      css: 'slot-section' },
};

const { S, O, A, L, D, SEC } = TASK_TYPES;

// === TEAM OVERVIEW ===
export const TEAM_OVERVIEW = {
  hazel: {
    name: 'Hazel',
    focus: '90% household responsibility',
    hours: '7:30 AM – 9:00/10:00 PM',
    dayOff: 'Saturday',
    rest: '2–3 hrs, after cleaning up after lunch. Back up 4:30 PM.',
    primaryFocus: 'House is spotless and organised + smooth daily routine, no task left undone by end of day',
    responsibilitySplit: [
      { area: 'Cleaning & upkeep', pct: '50%' },
      { area: 'Laundry & ironing', pct: '20%' },
      { area: 'Cooking (primarily Sundays + as needed)', pct: '10%' },
      { area: 'Leon (primarily Sundays + as needed)', pct: '10%' },
      { area: 'Outdoor areas (plants, floors, outside furniture, windows)', pct: '10%' },
    ],
    note: 'During weeks 1–3, a significant portion of Hazel\u2019s time goes to organising the house with Nica. The split above reflects her ongoing responsibilities from week 4 onwards, where she focuses on regular cleaning and one area of deep cleaning for a few hrs per week Mon–Fri. Once baby arrives (June 2026), responsibilities will be re-evaluated. Nica\u2019s household duties will likely shift to Hazel so Nica can focus fully on Leon and the newborn. The goal is a fair and balanced workload for both helpers.',
  },
  nica: {
    name: 'Nica',
    focus: '10% household responsibility',
    hours: '9:00 AM – 9:00/10:00 PM',
    dayOff: 'Sunday',
    rest: 'During Leon\u2019s nap (as much as Leon rests). Aim for Leon to sleep not later than 2 PM.',
    primaryFocus: 'Leon is happy, fed, and developing + delicious and timely meals and well-organised stocking of groceries',
    householdDuties: [
      'Pans maintained as per instructions',
      'All fridges organised at all times',
      'Daily floor mopping + vacuum',
      'Leon\u2019s toy rotation and area kept clean and organised',
      'Leon\u2019s room + bathroom',
      'Back kitchen',
    ],
    responsibilitySplit: [
      { area: 'Leon (care, outdoor, activities, bedtime, development — potty & language)', pct: '60%' },
      { area: 'Cooking + groceries (breakfast, lunch, dinner, flagging when products need to be bought)', pct: '30%' },
      { area: 'Daily household (fridge cleaning & organisation, floors — mopping & vacuuming, back kitchen)', pct: '10%' },
    ],
    note: 'During weeks 1–3, Nica also teaches Hazel to cook and helps with house organisation. The split above reflects her ongoing responsibilities from week 4 onwards. Once baby arrives (June 2026), responsibilities will be re-evaluated. Nica\u2019s household duties will likely shift to Hazel so Nica can focus fully on Leon and the newborn. The goal is a fair and balanced workload for both helpers.',
  },
  comparison: [
    { label: 'Hours', hazel: '7:30 AM – 9:00/10:00 PM', nica: '9:00 AM – 9:00/10:00 PM' },
    { label: 'Day off', hazel: 'Saturday', nica: 'Sunday' },
    { label: 'Rest', hazel: '2–3 hrs, after cleaning up after lunch. Back up 4:30 PM.', nica: 'During Leon\u2019s nap (as much as Leon rests). Aim for Leon to sleep not later than 2 PM.' },
    { label: 'Primary focus', hazel: 'House is spotless and organised + smooth daily routine, no task left undone by end of day', nica: 'Leon is happy, fed, and developing + delicious and timely meals and well-organised stocking of groceries' },
    { label: 'Morning', hazel: 'Kitchen island + living room reset + elevator area \u2192 laundry load \u2192 office \u2192 master bedroom + bathroom \u2192 guest bedroom + bathroom \u2192 guest bathroom (all done by midday / 1 PM)', nica: 'Fridge check \u2192 breakfast serving \u2192 breakfast cleaning up \u2192 Leon\u2019s morning outing (back home no later than 12:30 to prep lunch)' },
    { label: 'Midday / 1 PM', hazel: 'Lunch + rest (after kitchen clean-up). Back up 4:30 PM.', nica: 'Lunch (served no later than 1:30 PM) + rest (after Leon sleeps \u2014 he should sleep no later than 2 PM)' },
    { label: 'Afternoon (from 4:30 PM)', hazel: 'Organisation or deep clean (1.5–2 hrs) \u2192 outdoor areas (30 min) \u2192 ironing (1.5–2 hrs)', nica: 'After Leon wakes up: Floors (mopping + vacuuming) \u2192 Leon eats a fruit snack (grapes, apple, berries) \u2192 Leon\u2019s afternoon outing (back no later than 6:30 PM)' },
    { label: 'Evening (from 7:00 PM)', hazel: 'Set dinner table for Emi + Ilma + Leon (whilst Nica cooks) \u2192 7:30 \u2014 Prep dinner for herself and Nica \u2192 9:00 \u2014 Main island + main kitchen clean & organised \u2192 9:30 \u2014 Living room + shoe area clean & organised \u2192 9:30–10:00 \u2014 Final walkthrough of the house (sort anything you didn\u2019t have time for, or if all finished, rest)', nica: 'Dinner serving (no later than 7:30 PM) \u2192 back kitchen cleaning \u2192 Leon\u2019s bedtime (no later than 9:00 PM)' },
  ],
};

// === HAZEL ROUTINE ===
export const HAZEL_ROUTINE = {
  workingHours: {
    start: '7:30 AM sharp',
    end: '9:00–10:00 PM (after final walkthrough)',
    rest: '2–3 hours, after cleaning up after lunch. Back up 4:30 PM.',
    dayOff: 'Saturday',
    publicHolidays: '50 SGD per day',
    sunday: 'Covers Leon + kitchen (Nica\u2019s day off)',
  },
  daily: {
    morning: {
      label: 'MORNING (7:30 — all done by midday / 1 PM)',
      items: [
        { num: 1, title: 'Kitchen island reset', desc: 'Clear, clean, wipe — nothing left from night. All appliances clean (incl. coffee machine). Paper towel stocked. No unnecessary items on counter. Cutting board, lemon squeezer and fruit peeler in drawer. Leon\u2019s feeding items in designated places. Stovetop clean. Counters clean (incl. cupboards behind island). Sink empty. Fruit platter checked.' },
        { num: 2, title: 'Living room reset', desc: 'Clear of clutter + clean. Glass dining table, side glass table, wooden table clean. Sofa and cushions organised. Carpet clean. Toy area clutter-free. No remains of laundry / ironing (if something unfinished keep in the back room / storage).' },
        { num: 3, title: 'Elevator area', desc: 'Clear of clutter. No unnecessary items laying around, all shoes inside the shoe box except Leon\u2019s (make sure Leon\u2019s shoes are clean).' },
        { num: 4, title: 'Laundry load', desc: 'Load, hang, fold (daily, ongoing throughout morning)' },
        { num: 5, title: 'Office', desc: 'Keep the area clear of clutter (Nica cleans floors; clean tables and dust off cupboards)' },
        { num: 6, title: 'Master bedroom + bathroom', desc: 'Bed made, side tables & wooden island cleared. Leon\u2019s books back on bookshelf in organised manner. Bathroom: remove unnecessary clothes, clean all surfaces, organise shower area, put everything back in cupboards. Always stock up diapers and muslins. I will brief you what stays out what goes inside cupboards during a week when you start organising master + bathroom.' },
        { num: 7, title: 'Guest bedroom (Emi) + bathroom', desc: 'Bed + scattered clothes. Bathroom: clean surfaces, organise shower, put things back to cupboards.' },
        { num: 8, title: 'Guest bathroom', desc: 'Clean surfaces, check supplies. Always stock up diapers and wet cloths.' },
      ],
      endNote: '(All of the above done by midday / 1 PM)',
    },
    midday: {
      label: 'MIDDAY / 1 PM',
      items: ['Lunch + kitchen clean-up (must be done before rest)'],
    },
    rest: 'Back up 4:30 PM.',
    afternoon: {
      label: 'AFTERNOON (from 4:30 PM)',
      items: [
        { task: 'Organisation (weeks 1–3) or deep clean focus (week 4+)', duration: '1.5–2 hrs' },
        { task: 'Outdoor areas', duration: '30 min' },
        { task: 'Ironing (daily — today\u2019s laundry + any backlog)', duration: '1.5–2 hrs' },
      ],
    },
    evening: {
      label: 'EVENING (from 7:00 PM)',
      items: [
        { time: '7:00', task: 'Set dinner table for Emi + Ilma + Leon (whilst Nica is cooking)' },
        { time: '7:30', task: 'Prep dinner for herself and Nica' },
        { time: '9:00', task: 'Main island + main kitchen clean & organised' },
        { time: '9:30', task: 'Living room + shoe area clean & organised' },
        { time: '9:30–10:00', task: 'Final walkthrough of the house (sort anything you didn\u2019t have time for, or if all finished, rest)' },
      ],
    },
  },
};

// === NICA ROUTINE ===
export const NICA_ROUTINE = {
  workingHours: {
    start: '9:00 AM sharp (if Leon sleeps in \u2192 do fridge check, help Hazel)',
    end: '9:00/10:00 PM (after Leon is asleep)',
    rest: 'During Leon\u2019s nap (as much as Leon rests). Aim for Leon to sleep not later than 2 PM.',
    dayOff: 'Sunday',
    publicHolidays: '50 SGD per day',
  },
  daily: {
    morning: {
      label: 'MORNING (9:00–12:30)',
      sequence: [
        'Fridge check (all 4 fridges — clean, organised, nothing expired)',
        'Leon\u2019s breakfast + brush teeth',
        'Breakfast cleaning up',
        'Leon\u2019s room + bathroom (clean and tidy)',
        'Morning outing (playground, walk, playdate) or activity (Eaton House, Music class, Swimming)',
        'Back home no later than 12:30 to prep lunch',
      ],
      endNote: null,
    },
    midday: {
      label: 'MIDDAY (12:30–2:00 PM)',
      items: [
        'Lunch (served no later than 1:30 PM)',
        'Milk + brush teeth + put Leon to sleep (not later than 2 PM)',
      ],
    },
    rest: 'While Leon naps (as much as Leon rests)',
    afternoon: {
      label: 'AFTERNOON (after Leon wakes up)',
      sequence: [
        'Floors: mopping + vacuuming (entire house)',
        'Leon eats a fruit snack (grapes, apple, berries)',
        'Evening outing (playground, walk, playdate) or activity (Football)',
        'Back home (no later than 6:30 PM)',
      ],
    },
    evening: {
      label: 'EVENING (6:30–9:00 PM)',
      items: [
        { time: '6:30', task: 'Leon\u2019s dinner + Emi\u2019s dinner prep (dinner served no later than 7:30 PM)' },
        { time: 'After dinner', task: 'Back kitchen clean + organised (daily)' },
        { time: '~8:30', task: 'Milk + teeth + Leon bedtime routine (pajamas, wind down) \u2192 asleep no later than 9:00 PM' },
      ],
    },
  },
};

// === LEON ===
export const LEON = {
  schedule: [
    { time: '', activity: 'MORNING' },
    { time: '~9:00 AM', activity: 'Leon wakes' },
    { time: '9:00–9:30', activity: 'Breakfast + brush teeth' },
    { time: '9:30 onwards', activity: 'Morning outing or activity', sub: [
      'Tue 9:00–10:30 — Eaton House',
      'Fri 10:30–11:30 — Music class',
      'Sat 11:30–12:00 — Swimming',
    ]},
    { time: '', activity: 'MIDDAY' },
    { time: '12:30–1:30', activity: 'Lunch (served no later than 1:30 PM)' },
    { time: '1:30–2:00', activity: 'Milk + brush teeth + down for nap (not later than 2 PM)' },
    { time: '', activity: 'AFTERNOON' },
    { time: 'After nap', activity: 'Fruit snack (grapes, apple, berries)' },
    { time: 'Afternoon', activity: 'Afternoon outing (back no later than 6:30 PM)', sub: [
      'Wed 4:00–4:45 — Football',
    ]},
    { time: '', activity: 'EVENING' },
    { time: '7:00', activity: 'Dinner (served no later than 7:30 PM)' },
    { time: '9:00', activity: 'Milk + teeth + bedtime routine \u2192 asleep (no later than 9:00 PM)' },
  ],
  standards: [
    'Hands washed every time he comes back from outside',
    'Brush teeth 3x daily — after breakfast, after lunch, before bed (<strong>importantly — after milk</strong>)',
    'Regular diaper change during the day (every <strong>2 hrs</strong>)',
    'Potty — minimum 2x daily, building up over time',
    'Outdoor time — minimum 2x daily (morning + afternoon)',
    'Weekly language theme — see Nica\u2019s separate development document (working on it)',
  ],
  development: {
    pottyTraining: [
      'Minimum 2x daily on the potty (after breakfast, after nap — then build up)',
      'Positive reinforcement — praise, never scold',
      'Take Leon to the toilet regularly: after meals, after nap, before bed, before going out',
      'Track progress and share with Ilma weekly',
    ],
    languageDev: [
      'Weekly language theme — see Nica\u2019s separate development document (working on it)',
      'Daily habits: name everything, read books, sing songs, narrate activities',
      'Encourage Leon to use words instead of pointing — if he says \u201Cmilkie\u201D, add \u201CTita pls give milkie\u201D (I heard you are doing that already!)',
    ],
  },
};

// === STANDARDS ===
export const STANDARDS = {
  fridge: {
    intro: '4 fridges — each has a strict purpose. Items must be in the correct fridge at all times.',
    fridges: [
      {
        name: 'Fridge 1 — Small Fridge #1 — Drinks (Coconut Fridge)',
        rules: [
          'Coconuts first — this fridge\u2019s primary purpose',
          'All other drinks go here too: sparkling water, juice — no bottles in the main kitchen fridge',
          'Opened drinks: store here if not finished, consume within a reasonable time',
        ],
      },
      {
        name: 'Fridge 2 — Small Fridge #2 — Meat, Fish & Broth',
        rules: [
          'Meat and fish ONLY, plus chimichurri and broth in glass containers. Nothing else goes in here',
          'Small jars of jams / peas / tuna etc — keep at the top level so Leon doesn\u2019t break them',
          'Temperature must be maintained at the correct level for meat and fish safety',
          'Unfinished meat/fish: transfer to a glass container with a lid — this signals it must be consumed FIRST before opening new meat or fish',
        ],
      },
      {
        name: 'Fridge 3 — Main Kitchen Fridge',
        rules: [
          'NO bottles — all drinks go in the coconut fridge',
          'Dairy: all dairy products stored together',
          'Vegetables: stored together — zucchinis and carrots grouped, chives and coriander in the herb/spice container',
          'Cut/opened vegetables: MUST go in a glass container with a lid. Label them "use first." This includes cut onions, lemons, and any loose veg',
          'No loose items — if it\u2019s been opened, cut, or has a smell, it goes in a glass container with a lid (if there is a glass container available with a lid — you should always put a lid <strong>not a cling wrap</strong>)',
          'Be mindful that fridges are small — store things in appropriate sizes, glass containers vs big pots',
          'Fridge organisers: use the organisation items Ilma has ordered for categorisation',
        ],
      },
      {
        name: 'Fridge 4 — Back Kitchen Fridge',
        rules: [
          'Mostly flexible — organise between Hazel and Nica however works best (for Ilma\u2019s family only store items that Ilma suggests — no daily storage there for everyday use)',
        ],
      },
    ],
    dailyCheck: [
      'All 4 fridges: clean, organised, nothing expired',
      'Wipe spills immediately',
      'Items in correct fridge — nothing in the wrong fridge',
      'Nothing uncovered — all open items in glass containers with lids',
      'Check dates — remove anything expired',
      'Unfinished items in glass containers so we know to use first',
    ],
  },
  laundry: {
    handWash: [
      'All shirts and polos',
      'All nice tops',
      'All dresses and skirts (Ilma)',
      'Any delicate or structured clothing',
      'When in doubt \u2192 hand-wash',
    ],
    machineWash: [
      'Pants / trousers — Emi and Leon only (not Ilma\u2019s)',
      'Always separate into 3 loads: blacks | whites | colours',
      'Ilma\u2019s daily home clothes can go in the machine',
      'Leon\u2019s play clothes can go in the machine',
    ],
    stainProtocol: [
      'Spot a stain \u2192 read and learn about product labels for cleaning',
      'Use the appropriate product for the stain type',
      'Never put a stained item in the machine — treat it first',
    ],
    linenSchedule: [
      'Towels: Changed every Friday for everyone + bathroom carpets',
      'Bedsheets: Changed every 2 weeks on Fridays for everyone',
      'Exception: Leon\u2019s bedsheets changed immediately if he makes a mess',
      'Laundry should be done daily — never let it pile up',
    ],
  },
  kitchen: {
    general: [
      'Island completely clear at start and end of each day',
      'Sink empty — no dishes sitting',
      'Stovetop wiped after every use',
      'Counters clear — only daily-use items out',
      'Back kitchen cleaned and organised every evening (no storage of daily use items on the drying rack)',
    ],
    castIron: {
      videoUrl: 'https://www.youtube.com/watch?v=ThEVx7HUsdo',
      rustRemoval: [
        'Use a potato and coarse kosher salt to scrub away rust',
        'The potato\u2019s oxalic acid + abrasive salt effectively removes rust',
        'Scrub thoroughly until all rust is gone, then rinse',
        'For stubborn rust, use a steel scour daddy (steel wool)',
      ],
      seasoning: [
        'Preheat oven to 450\u00B0F (230\u00B0C)',
        'Dry the pan completely with a towel, then place in preheated oven for ~5 minutes to remove all moisture',
        'Once slightly cooled (~5 min), apply an even layer of high smoke point oil (e.g. avocado oil) with a paper towel \u2014 cover every part',
        'Wipe off excess oil with a clean, dry paper towel to prevent dripping',
        'Place pan upside down on a baking sheet in the oven for 30 minutes',
        'Let cool, then repeat the oiling and baking process 3\u20135 times for a great non-stick coating',
      ],
    },
  },
  organisation: {
    principles: [
      { title: 'Ease of Access', question: 'Can I get to what I need without moving something else first?' },
      { title: 'Visually Declutter', question: 'Does this space feel calm when I look at it?' },
      { title: 'Ease of Maintenance', question: 'Can I put this back in 5 seconds or less?' },
      { title: 'Category Importance', question: 'Do I already have a designated spot for this category? Where? Put it there. Orphan? Put in orphan box.' },
    ],
    zones: [
      { name: 'Active Zone', freq: 'daily to weekly use', examples: 'Front of cabinet, eye-level shelf, top drawer, countertop, hook by the door. You shouldn\u2019t have to think or reach. It\u2019s just there.' },
      { name: 'Passive Zone', freq: 'monthly to seasonal use', examples: 'Back of the shelf, high cabinet, under the bed, garage, top of the closet. It\u2019s okay if it takes a minute to retrieve. You rarely need it.' },
    ],
    houseRules: [
      'Ilma labels, helpers propose. Suggest changes \u2014 don\u2019t just move things.',
      'Open deliveries sent to Ilma and put them on a side for Ilma (if food, store).',
    ],
  },
  moldHumidity: {
    windows: [
      'Keep windows closed at all times.',
      'Only open briefly if it is dry, breezy, no rain.',
      'When in doubt, keep windows closed. Use the fan instead.',
    ],
    dehumidifier: [
      'Target humidity: 50\u201360%',
      'Turn ON the dehumidifier if humidity reads 60% or above.',
      'Turn OFF once it drops below 60%.',
      'Below 50% = too dry. Above 60% = too humid. Mold risk.',
    ],
    fans: [
      'Keep fans on whenever people are home in that room.',
      'Turn off only when everyone leaves the room / house.',
    ],
    wardrobes: [
      'Leave doors slightly open when rooms are not in use.',
      'Closed furniture traps moisture and causes mold.',
    ],
  },
  deepCleanSchedule: {
    intro: 'Weekly deep cleaning is essential to maintaining a clean and organised home. Daily upkeep keeps things tidy, but deep cleaning ensures nothing builds up. Each day has a focus area for Hazel:',
    schedule: [
      { day: 'Monday', focus: 'Kitchen & back kitchen', includes: 'Inside appliances, cabinet fronts, grout, back kitchen scrub, drawer check', when: '4:30\u20136:00 PM', who: 'Hazel' },
      { day: 'Tuesday', focus: 'All bathrooms (x3 — not Leon\u2019s, Nica does his)', includes: 'Descale taps, tiles & grout, mirrors, restock, bins, floors', when: '4:30\u20136:00 PM', who: 'Hazel' },
      { day: 'Wednesday', focus: 'Bedrooms, living room & office', includes: 'Under furniture, wardrobes, surfaces, windows, upholstery, office desk & shelves', when: '4:30\u20136:00 PM', who: 'Hazel' },
      { day: 'Thursday', focus: 'Outdoor areas & windows', includes: 'Both areas deep cleaned, plant care, exterior windows', when: '4:30\u20136:00 PM', who: 'Hazel' },
      { day: 'Friday', focus: 'Ironing & linen rotation', includes: 'Iron backlog, <strong>towel swap + bathroom carpets cleaned weekly</strong>, <strong>bathroom sheets if due (every 2nd Friday)</strong>, linen cupboard tidy', when: '4:30\u20136:00 PM', who: 'Hazel' },
    ],
  },
};

// === COOKING HANDOVER ===
export const COOKING_HANDOVER = [
  { meal: 'Lunch (12:00)', w1: 'Hazel observes Nica', w2: 'Hazel cooks with Nica', w3: 'Hazel cooks solo, Nica supervises' },
  { meal: 'Dinner (7:00)', w1: 'Hazel observes informally', w2: 'Hazel helps informally', w3: 'Hazel cooks informally, Nica available' },
];

// === ORG OVERVIEW ===
export const ORG_OVERVIEW = {
  intro: 'Joint org: Mon / Wed / Thu mornings 11:00–1:00 PM — Hazel + Nica (Leon plays nearby) = 2 hrs. Solo org: Every weekday afternoon 4:30–6:00 — Hazel only = 1.5–2 hrs. Total: ~3.5–4 hrs on joint days, ~1.5–2 hrs on solo-only days.',
  schedule: [
    { week: 1, day: 'Mon 2',  focus: '📌 No org (medical check-up)',                   when: '—',                             who: '—' },
    { week: 1, day: 'Tue 3',  focus: 'Back kitchen — start',                                      when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
    { week: 1, day: 'Wed 4',  focus: '📌 No org (SIP — Hazel away)',                    when: '—',                             who: '—' },
    { week: 1, day: 'Thu 5',  focus: 'Back kitchen (finish) + Storage room (start)',               when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 1, day: 'Fri 6',  focus: 'Storage room (finish)',                                      when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
    { week: 2, day: 'Mon 9',  focus: 'Main kitchen cupboards',                                    when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 2, day: 'Tue 10', focus: 'Main kitchen drawers',                                      when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
    { week: 2, day: 'Wed 11', focus: 'Living room storage',                                       when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 2, day: 'Thu 12', focus: 'Master bedroom — drawers, wardrobe',                        when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 2, day: 'Fri 13', focus: 'Master bathroom — cabinets',                                when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
    { week: 3, day: 'Mon 16', focus: 'Leon\u2019s room — reorganise, toy rotation',               when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 3, day: 'Tue 17', focus: 'Leon\u2019s room — clothes by size/season',                 when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
    { week: 3, day: 'Wed 18', focus: 'Office — drawers, shelves, cables',                         when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 3, day: 'Thu 19', focus: 'Guest room (Emi) — wardrobe, bathroom',                     when: 'AM 11:00–1:00 PM + PM 4:30–6:00', who: 'Hazel + Nica / Hazel solo' },
    { week: 3, day: 'Fri 20', focus: 'FINAL REVIEW — walk all spaces',                            when: 'PM 4:30–6:00',                  who: 'Hazel solo' },
  ],
};

// === DEEP CLEAN OVERVIEW ===
export const DEEP_CLEAN_OVERVIEW = [
  { day: 'Monday',    focus: 'Kitchen & back kitchen',                            includes: 'Inside appliances, cabinet fronts, grout, back kitchen scrub, drawer check',                                                  when: '4:30\u20136:00 PM', who: 'Hazel' },
  { day: 'Tuesday',   focus: 'All bathrooms (x3 — not Leon\u2019s, Nica does his)', includes: 'Descale taps, tiles & grout, mirrors, restock, bins, floors',                                                               when: '4:30\u20136:00 PM', who: 'Hazel' },
  { day: 'Wednesday', focus: 'Bedrooms, living room & office',                    includes: 'Under furniture, wardrobes, surfaces, windows, upholstery, office desk & shelves',                                              when: '4:30\u20136:00 PM', who: 'Hazel' },
  { day: 'Thursday',  focus: 'Outdoor areas & windows',                           includes: 'Both areas deep cleaned, plant care, exterior windows',                                                                        when: '4:30\u20136:00 PM', who: 'Hazel' },
  { day: 'Friday',    focus: 'Ironing & linen rotation',                          includes: 'Iron backlog, <strong>towel swap + bathroom carpets cleaned weekly</strong>, <strong>bathroom sheets if due (every 2nd Fri)</strong>, linen cupboard tidy',        when: '4:30\u20136:00 PM', who: 'Hazel' },
];


// ─────────────────────────────────────────────────────────────
//  WEEK_DAYS — All 28 days
// ─────────────────────────────────────────────────────────────

// Helper: standard morning section divider
function mornSec() {
  return { section: 'MORNING (7:30 — all done by midday / 1 PM)', nicaSection: 'MORNING (9:00–12:30)' };
}
function midSec() {
  return { section: 'MIDDAY / 1 PM', nicaSection: 'MIDDAY (12:30–2:00)' };
}
function restSec() {
  return { section: 'REST', nicaSection: 'REST' };
}
function aftSec() {
  return { section: 'AFTERNOON (from 4:30)', nicaSection: 'AFTERNOON (after Leon wakes up)' };
}
function eveSec() {
  return { section: 'EVENING (from 7:00)', nicaSection: 'EVENING (6:30–9:00)' };
}

// Helper: standard midday rows
function stdMidday() {
  return [
    midSec(),
    { hazel: 'Lunch + kitchen clean-up (must be done before rest)', nica: 'Lunch (served no later than 1:30)' },
    { hazel: '', nica: 'Milk + brush teeth + put Leon to sleep (not later than 2:00)' },
  ];
}

// Helper: standard rest rows
function stdRest() {
  return [
    restSec(),
    { hazel: 'Back up 4:30 PM.', nica: 'While Leon naps' },
  ];
}

// Helper: standard evening rows
function stdEvening() {
  return [
    eveSec(),
    { time: '7:00', hazel: 'Set dinner table for Emi + Ilma + Leon', nica: 'Leon\u2019s dinner + Emi\u2019s dinner prep (served no later than 7:30)' },
    { time: '7:30', hazel: 'Prep dinner for herself and Nica', nica: 'Back kitchen clean + organised' },
    { time: '9:00', hazel: 'Main island + main kitchen clean & organised', nica: 'Milk + teeth + bedtime routine \u2192 asleep (no later than 9:00)' },
    { time: '9:30', hazel: 'Living room + shoe area clean & organised', nica: '' },
    { time: '9:30–10:00', hazel: 'Final walkthrough (sort anything you didn\u2019t have time for, or if all finished, rest)', nica: '' },
  ];
}

// Helper: standard weekday afternoon with org task
function orgAfternoon(orgLabel) {
  return [
    aftSec(),
    { time: '4:30', hazel: '📦 Org: ' + orgLabel + ' (1.5–2 hrs)', nica: 'Floors: mopping + vacuuming (entire house)', type: O },
    { hazel: 'Outdoor areas (30 min)', nica: 'Leon eats a fruit snack' },
    { hazel: 'Ironing (daily) (1.5–2 hrs)', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
  ];
}

// Helper: standard weekday afternoon with deep clean
function deepCleanAfternoon(dcLabel) {
  return [
    aftSec(),
    { time: '4:30', hazel: '\uD83E\uDDF9 Deep clean: ' + dcLabel + ' (1.5–2 hrs)', nica: 'Floors: mopping + vacuuming (entire house)', type: D },
    { hazel: 'Outdoor areas (30 min)', nica: 'Leon eats a fruit snack' },
    { hazel: 'Ironing (daily) (1.5–2 hrs)', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
  ];
}

// Helper: Wednesday afternoon with Football
function wedOrgAfternoon(orgLabel) {
  return [
    aftSec(),
    { time: '4:00', hazel: '📦 Org: ' + orgLabel + ' (1.5–2 hrs)', nica: 'Floors: mopping + vacuuming (entire house)', type: O },
    { hazel: 'Outdoor areas (30 min)', nica: 'Leon eats a fruit snack' },
    { hazel: 'Ironing (daily) (1.5–2 hrs)', nica: '👶🏼 Football with Leon (4:00–4:45)', type: L },
    { hazel: '', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
  ];
}

function wedDeepCleanAfternoon(dcLabel) {
  return [
    aftSec(),
    { time: '4:00', hazel: '\uD83E\uDDF9 Deep clean: ' + dcLabel + ' (1.5–2 hrs)', nica: 'Floors: mopping + vacuuming (entire house)', type: D },
    { hazel: 'Outdoor areas (30 min)', nica: 'Leon eats a fruit snack' },
    { hazel: 'Ironing (daily) (1.5–2 hrs)', nica: '👶🏼 Football with Leon (4:00–4:45)', type: L },
    { hazel: '', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
  ];
}

// Helper: standard morning rows (Mon/Thu — no Leon activity, no org in morning)
function stdMorningRows() {
  return [
    mornSec(),
    { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
    { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
    { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
    { hazel: 'Office', nica: '👶🏼 Morning outing with Leon' },
    { hazel: 'Master bedroom + bathroom', nica: '' },
    { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
    { hazel: 'Guest bathroom', nica: '' },
  ];
}

// Helper: morning with joint org (inserted after Master bedroom)
function jointOrgMorningRows(orgLabel) {
  return [
    mornSec(),
    { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
    { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
    { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
    { hazel: 'Office', nica: '👶🏼 Morning outing with Leon' },
    { hazel: 'Master bedroom + bathroom', nica: 'Back home no later than 11 for organisation' },
    { hazel: 'Guest bedroom (Emi) + bathroom', nica: '' },
    { hazel: 'Guest bathroom', nica: '' },
    { time: '11:00', hazel: '📦 Joint org 11:00–1:00 PM (Leon plays nearby)', nica: '📦 Helping Hazel', type: O },
    { hazel: '📦 ' + orgLabel, nica: '', type: O },
  ];
}

// Helper: Tuesday morning (Eaton House)
function tueMorningRows() {
  return [
    mornSec(),
    { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
    { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
    { hazel: 'Laundry load (ongoing)', nica: '👶🏼 Eaton House with Leon (9:00–10:30)', type: L },
    { hazel: 'Office', nica: 'Back home (wash Leon\u2019s hands)' },
    { hazel: 'Master bedroom + bathroom', nica: 'Leon\u2019s room + bathroom' },
    { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
    { hazel: 'Guest bathroom', nica: '' },
  ];
}

// Helper: Friday morning (Music class)
function friMorningRows() {
  return [
    mornSec(),
    { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
    { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
    { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
    { hazel: 'Office', nica: '👶🏼 Music class with Leon (10:30–11:30)', type: L },
    { hazel: 'Master bedroom + bathroom', nica: 'Back home (wash Leon\u2019s hands)' },
    { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
    { hazel: 'Guest bathroom', nica: '' },
  ];
}

// Helper: Wednesday morning with joint org (Football is afternoon only)
function wedJointOrgMorningRows(orgLabel) {
  return [
    mornSec(),
    { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
    { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
    { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
    { hazel: 'Office', nica: '👶🏼 Morning outing with Leon' },
    { hazel: 'Master bedroom + bathroom', nica: 'Back home no later than 11 for organisation' },
    { hazel: 'Guest bedroom (Emi) + bathroom', nica: '' },
    { hazel: 'Guest bathroom', nica: '' },
    { time: '11:00', hazel: '📦 Joint org 11:00–1:00 PM (Leon plays nearby)', nica: '📦 Helping Hazel', type: O },
    { hazel: '📦 ' + orgLabel, nica: '', type: O },
  ];
}

// Helper: Saturday rows (Hazel day off, only Nica)
function satRows(hasSwimming) {
  const rows = [
    { section: 'HAZEL DAY OFF', nicaSection: 'MORNING (9:00–12:30)' },
    { hazel: '', nica: 'Fridge check (all 4)' },
    { hazel: '', nica: 'Leon\u2019s breakfast + brush teeth' },
    { hazel: '', nica: 'Breakfast cleaning up' },
    { hazel: '', nica: 'Leon\u2019s room + bathroom' },
  ];
  if (hasSwimming) {
    rows.push({ hazel: '', nica: '👶🏼 Swimming with Leon (11:30–12:00)', type: L });
  }
  rows.push(
    { hazel: '', nica: 'Back home no later than 12:30 to prep lunch' },
    { section: '', nicaSection: 'MIDDAY (12:30–2:00)' },
    { hazel: '', nica: 'Lunch (served no later than 1:30)' },
    { hazel: '', nica: 'Milk + brush teeth + put Leon to sleep (not later than 2:00)' },
    { section: '', nicaSection: 'REST' },
    { hazel: '', nica: 'While Leon naps' },
    { section: '', nicaSection: 'AFTERNOON (after Leon wakes up)' },
    { hazel: '', nica: 'Floors: mopping + vacuuming (entire house)' },
    { hazel: '', nica: 'Leon eats a fruit snack' },
    { hazel: '', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
    { section: '', nicaSection: 'EVENING (6:30–9:00)' },
    { hazel: '', nica: 'Leon\u2019s dinner + Emi\u2019s dinner prep (served no later than 7:30)' },
    { hazel: '', nica: 'Back kitchen clean + organised' },
    { hazel: '', nica: 'Milk + teeth + bedtime routine \u2192 asleep (no later than 9:00)' },
  );
  return rows;
}

// Helper: Sunday rows (Nica day off, Hazel covers everything)
function sunRows() {
  return [
    { section: 'MORNING (7:30 \u2014 all done by 12:30)', nicaSection: '' },
    { hazel: 'Kitchen island reset', nica: 'DAY OFF' },
    { hazel: 'Living room reset', nica: '' },
    { hazel: 'Elevator area', nica: '' },
    { hazel: 'Office', nica: '' },
    { hazel: 'Leon\u2019s breakfast + brush teeth', nica: '', type: L },
    { hazel: '👶🏼 Morning outing with Leon (back home no later than 12:30)', nica: '', type: L },
    { section: 'MIDDAY (12:30\u20132:00)', nicaSection: '' },
    { hazel: 'Lunch (served no later than 1:30)', nica: '', type: L },
    { hazel: 'Milk + brush teeth + put Leon to sleep (not later than 2:00)', nica: '', type: L },
    { section: 'REST', nicaSection: '' },
    { hazel: 'While Leon naps', nica: '' },
    { section: 'AFTERNOON (after Leon wakes up)', nicaSection: '' },
    { hazel: 'Clean up kitchens', nica: '' },
    { hazel: 'Leon eats a fruit snack', nica: '', type: L },
    { hazel: 'Mostly Emi and Ilma take Leon out for afternoon outing (back no later than 6:30) \u2014 you do a house task that needs most attention', nica: '' },
    { section: 'EVENING (6:30\u20139:00)', nicaSection: '' },
    { hazel: 'Leon\u2019s dinner + Emi\u2019s dinner prep (served no later than 7:30)', nica: '', type: L },
    { hazel: 'Back & Main kitchen / dining table clean + organised', nica: '' },
    { hazel: 'Milk + teeth + bedtime routine \u2192 asleep (no later than 9:00)', nica: '', type: L },
  ];
}


export const WEEK_DAYS = [

  // ═══════════════════════════════════════════════════════════
  //  WEEK 1
  // ═══════════════════════════════════════════════════════════

  // ── W1 Monday 2 March ──────────────────────────────────────
  {
    id: 'w1-mon',
    weekNum: 1,
    dayName: 'Monday',
    date: '2 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: ['Medical check-up at 4:00 PM. Nica takes Hazel to clinic. Replaces afternoon org.'],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...stdMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      aftSec(),
      { time: '', hazel: '📌 Medical check-up — 4:00 PM', nica: '📌 Nica takes Hazel to clinic', type: A },
      { hazel: 'Outdoor areas (30 min)', nica: '' },
      { hazel: 'Ironing (daily) (1.5–2 hrs)', nica: 'Leon eats a fruit snack' },
      { hazel: '', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
      ...stdEvening(),
    ],
  },

  // ── W1 Tuesday 3 March ─────────────────────────────────────
  {
    id: 'w1-tue',
    weekNum: 1,
    dayName: 'Tuesday',
    date: '3 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Back kitchen — start',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Eaton House — likely CANCELLED (9:00–10:30)',
    deepClean: null,
    specialNote: 'Eaton House likely cancelled — Nica does solo organisation of the back kitchen instead',
    reflection: true,
    rows: [
      ...stdMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Back kitchen — start'),
      ...stdEvening(),
    ],
  },

  // ── W1 Wednesday 4 March (SIP Day) ─────────────────────────
  {
    id: 'w1-wed',
    weekNum: 1,
    dayName: 'Wednesday',
    date: '4 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: ['SIP (Settling-In Programme). Hazel away 8:00 AM–~6:45 PM.'],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: null,
    specialNote: 'SIP — Hazel away 8:00 AM–~6:45 PM.',
    reflection: true,
    rows: [
      { section: 'MORNING', nicaSection: 'MORNING (9:00–12:30)' },
      { time: '7:30', hazel: 'Kitchen island reset + living room check', nica: 'Fridge check (all 4)' },
      { time: '📌 8:00', hazel: '📌 Leave for SIP (away all day)', nica: 'Leon\u2019s breakfast + brush teeth', type: A },
      { hazel: '', nica: 'Breakfast cleaning up' },
      { hazel: '', nica: 'Leon\u2019s room + bathroom' },
      { hazel: '', nica: '👶🏼 Morning outing with Leon' },
      { hazel: '', nica: 'Back home no later than 12:30 to prep lunch' },
      { section: '', nicaSection: 'MIDDAY (12:30–2:00)' },
      { hazel: '', nica: 'Lunch (served no later than 1:30)' },
      { hazel: '', nica: 'Milk + brush teeth + put Leon to sleep (not later than 2:00)' },
      { section: '', nicaSection: 'REST' },
      { hazel: '', nica: 'While Leon naps' },
      { section: '', nicaSection: 'AFTERNOON (after Leon wakes up)' },
      { hazel: '', nica: 'Floors: mopping + vacuuming (entire house)' },
      { hazel: '', nica: 'Leon eats a fruit snack' },
      { hazel: '', nica: '👶🏼 Afternoon outing (back no later than 6:30)' },
      { section: 'EVENING', nicaSection: 'EVENING (6:30–9:00)' },
      { time: '~6:45', hazel: '📌 Back from SIP', nica: 'Leon\u2019s dinner + Emi\u2019s dinner prep (served no later than 7:30)', type: A },
      { time: '7:30', hazel: 'Prep dinner for herself and Nica', nica: 'Back kitchen clean + organised' },
      { time: '9:00', hazel: 'Main island + main kitchen clean & organised', nica: 'Milk + teeth + bedtime routine \u2192 asleep (no later than 9:00)' },
      { time: '9:30', hazel: 'Living room + shoe area clean & organised', nica: '' },
      { time: '9:30–10:00', hazel: 'Final walkthrough (sort anything you didn\u2019t have time for, or if all finished, rest)', nica: '' },
    ],
  },

  // ── W1 Thursday 5 March ────────────────────────────────────
  {
    id: 'w1-thu',
    weekNum: 1,
    dayName: 'Thursday',
    date: '5 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Back kitchen (finish) + Storage room (start)',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      mornSec(),
      { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
      { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
      { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
      { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
      { hazel: 'Office', nica: '👶🏼 Morning outing with Leon' },
      { hazel: 'Master bedroom + bathroom', nica: 'Back home no later than 11 for organisation' },
      { hazel: 'Guest bedroom (Emi) + bathroom', nica: '' },
      { hazel: 'Guest bathroom', nica: '' },
      { time: '11:00', hazel: '📦 Joint org 11:00\u20131:00 PM (Leon plays nearby)', nica: '📦 Helping Hazel', type: O },
      { hazel: '📦 Back kitchen (finish) + Storage room (start)', nica: '', type: O },
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Storage room — continue'),
      ...stdEvening(),
    ],
  },

  // ── W1 Friday 6 March ──────────────────────────────────────
  {
    id: 'w1-fri',
    weekNum: 1,
    dayName: 'Friday',
    date: '6 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Storage room (finish)',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Music class (10:30–11:30)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...friMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Storage room (finish)'),
      ...stdEvening(),
    ],
  },

  // ── W1 Saturday 7 March ────────────────────────────────────
  {
    id: 'w1-sat',
    weekNum: 1,
    dayName: 'Saturday',
    date: '7 March',
    hazelOff: true,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Swimming (11:30–12:00)',
    deepClean: null,
    specialNote: null,
    reflection: false,
    rows: satRows(true),
  },

  // ── W1 Sunday 8 March ──────────────────────────────────────
  {
    id: 'w1-sun',
    weekNum: 1,
    dayName: 'Sunday',
    date: '8 March',
    hazelOff: false,
    nicaOff: true,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: sunRows(),
  },

  // ═══════════════════════════════════════════════════════════
  //  WEEK 2
  // ═══════════════════════════════════════════════════════════

  // ── W2 Monday 9 March ──────────────────────────────────────
  {
    id: 'w2-mon',
    weekNum: 2,
    dayName: 'Monday',
    date: '9 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Main kitchen cupboards',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...jointOrgMorningRows('Main kitchen cupboards'),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Main kitchen cupboards (continue)'),
      ...stdEvening(),
    ],
  },

  // ── W2 Tuesday 10 March ────────────────────────────────────
  {
    id: 'w2-tue',
    weekNum: 2,
    dayName: 'Tuesday',
    date: '10 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: ['Card registration at 8:50 AM. Hazel leaves 8:15, back ~10:15 AM (~2 hrs)'],
    orgTask: 'Main kitchen drawers',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Oceanfront Playdate by Kirsty (9:00–10:30)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      mornSec(),
      { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
      { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
      { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
      { hazel: 'Laundry load (ongoing)', nica: '\u{1F476}\u{1F3FC} Oceanfront Playdate by Kirsty (9:00\u201310:30)', type: L },
      { hazel: 'Office', nica: 'Back home (wash Leon\u2019s hands)' },
      { hazel: '\u{1F4CC} Card registration (8:50 AM \u2014 leaves 8:15, back ~10:15)', nica: '', type: A },
      { hazel: 'Master bedroom + bathroom', nica: 'Leon\u2019s room + bathroom' },
      { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
      { hazel: 'Guest bathroom', nica: '' },
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Main kitchen drawers'),
      ...stdEvening(),
    ],
  },

  // ── W2 Wednesday 11 March ──────────────────────────────────
  {
    id: 'w2-wed',
    weekNum: 2,
    dayName: 'Wednesday',
    date: '11 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: ['Aircon service \u2014 estimated arrival 10:00\u201310:30 AM'],
    orgTask: 'Living room storage',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: 'Football (4:00–4:45)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      mornSec(),
      { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
      { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
      { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
      { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
      { hazel: 'Office', nica: '\u{1F476}\u{1F3FC} Morning outing with Leon' },
      { hazel: '\u{1F4CC} Aircon service (est. arrival 10:00\u201310:30 AM)', nica: '\u{1F4CC} Aircon service (est. arrival 10:00\u201310:30 AM)', type: A },
      { hazel: 'Master bedroom + bathroom', nica: 'Back home no later than 11 for organisation' },
      { hazel: 'Guest bedroom (Emi) + bathroom', nica: '' },
      { hazel: 'Guest bathroom', nica: '' },
      { time: '11:00', hazel: '\u{1F4E6} Joint org 11:00\u20131:00 PM (Leon plays nearby)', nica: '\u{1F4E6} Helping Hazel', type: O },
      { hazel: '\u{1F4E6} Living room storage', nica: '', type: O },
      ...stdMidday(),
      ...stdRest(),
      ...wedOrgAfternoon('Living room storage \u2014 continue'),
      ...stdEvening(),
    ],
  },

  // ── W2 Thursday 12 March ───────────────────────────────────
  {
    id: 'w2-thu',
    weekNum: 2,
    dayName: 'Thursday',
    date: '12 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Master bedroom — drawers, wardrobe',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...jointOrgMorningRows('Master bedroom — drawers, wardrobe'),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Master bedroom — continue'),
      ...stdEvening(),
    ],
  },

  // ── W2 Friday 13 March ─────────────────────────────────────
  {
    id: 'w2-fri',
    weekNum: 2,
    dayName: 'Friday',
    date: '13 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Master bathroom — cabinets',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Music class (10:30–11:30)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...friMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Master bathroom — cabinets'),
      ...stdEvening(),
    ],
  },

  // ── W2 Saturday 14 March ───────────────────────────────────
  {
    id: 'w2-sat',
    weekNum: 2,
    dayName: 'Saturday',
    date: '14 March',
    hazelOff: true,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Swimming (11:30–12:00)',
    deepClean: null,
    specialNote: null,
    reflection: false,
    rows: satRows(true),
  },

  // ── W2 Sunday 15 March ─────────────────────────────────────
  {
    id: 'w2-sun',
    weekNum: 2,
    dayName: 'Sunday',
    date: '15 March',
    hazelOff: false,
    nicaOff: true,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: sunRows(),
  },

  // ═══════════════════════════════════════════════════════════
  //  WEEK 3
  // ═══════════════════════════════════════════════════════════

  // ── W3 Monday 16 March ─────────────────────────────────────
  {
    id: 'w3-mon',
    weekNum: 3,
    dayName: 'Monday',
    date: '16 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Leon\u2019s room \u2014 reorganise, toy rotation',
    orgType: 'joint',
    orgTime: 'AM 11:00\u20131:00 PM + PM 4:30\u20136:00',
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...jointOrgMorningRows('Leon\u2019s room \u2014 reorganise, toy rotation'),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Leon\u2019s room \u2014 continue'),
      ...stdEvening(),
    ],
  },

  // ── W3 Tuesday 17 March ────────────────────────────────────
  {
    id: 'w3-tue',
    weekNum: 3,
    dayName: 'Tuesday',
    date: '17 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Leon\u2019s room — clothes by size/season',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Eaton House (9:00–10:30)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      mornSec(),
      { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
      { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
      { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
      { hazel: 'Laundry load (ongoing)', nica: '\u{1F476}\u{1F3FC} Eaton House with Leon (9:00\u201310:30)', type: L },
      { hazel: 'Office', nica: 'Back home (wash Leon\u2019s hands)' },
      { hazel: 'Master bedroom + bathroom', nica: 'Leon\u2019s room + bathroom' },
      { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
      { hazel: 'Guest bathroom', nica: '' },
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Leon\u2019s room \u2014 clothes by size/season'),
      ...stdEvening(),
    ],
  },

  // ── W3 Wednesday 18 March ──────────────────────────────────
  {
    id: 'w3-wed',
    weekNum: 3,
    dayName: 'Wednesday',
    date: '18 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Office — drawers, shelves, cables',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: 'Football (4:00–4:45)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...wedJointOrgMorningRows('Office — drawers, shelves, cables'),
      ...stdMidday(),
      ...stdRest(),
      ...wedOrgAfternoon('Office — continue'),
      ...stdEvening(),
    ],
  },

  // ── W3 Thursday 19 March ───────────────────────────────────
  {
    id: 'w3-thu',
    weekNum: 3,
    dayName: 'Thursday',
    date: '19 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'Guest room (Emi) — wardrobe, bathroom',
    orgType: 'joint',
    orgTime: 'AM 11:00–1:00 PM + PM 4:30–6:00',
    leonActivity: null,
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...jointOrgMorningRows('Guest room (Emi) — wardrobe, bathroom'),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('Guest room — continue'),
      ...stdEvening(),
    ],
  },

  // ── W3 Friday 20 March ─────────────────────────────────────
  {
    id: 'w3-fri',
    weekNum: 3,
    dayName: 'Friday',
    date: '20 March',
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: 'FINAL REVIEW — walk all spaces',
    orgType: 'solo',
    orgTime: 'PM 4:30–6:00',
    leonActivity: 'Music class (10:30–11:30)',
    deepClean: null,
    specialNote: null,
    reflection: true,
    rows: [
      ...friMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...orgAfternoon('FINAL REVIEW — all spaces'),
      ...stdEvening(),
    ],
  },

  // ── W3 Saturday 21 March ───────────────────────────────────
  {
    id: 'w3-sat',
    weekNum: 3,
    dayName: 'Saturday',
    date: '21 March',
    hazelOff: true,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Swimming (11:30–12:00)',
    deepClean: null,
    specialNote: null,
    reflection: false,
    rows: satRows(true),
  },

  // ── W3 Sunday 22 March ─────────────────────────────────────
  {
    id: 'w3-sun',
    weekNum: 3,
    dayName: 'Sunday',
    date: '22 March',
    hazelOff: false,
    nicaOff: true,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: null,
    specialNote: 'Final Sunday before Nica\u2019s trip. Hazel should be fully ready.',
    reflection: true,
    rows: sunRows(),
  },

  // ═══════════════════════════════════════════════════════════
  //  WEEK 4 (template — date: null)
  // ═══════════════════════════════════════════════════════════

  // ── W4 Monday ──────────────────────────────────────────────
  {
    id: 'w4-mon',
    weekNum: 4,
    dayName: 'Monday',
    date: null,
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: 'Kitchen & back kitchen',
    specialNote: null,
    reflection: true,
    rows: [
      ...stdMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...deepCleanAfternoon('Kitchen & back kitchen'),
      ...stdEvening(),
    ],
  },

  // ── W4 Tuesday ─────────────────────────────────────────────
  {
    id: 'w4-tue',
    weekNum: 4,
    dayName: 'Tuesday',
    date: null,
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Eaton House (9:00–10:30)',
    deepClean: 'All bathrooms (x3 — not Leon\u2019s, Nica does his)',
    specialNote: null,
    reflection: true,
    rows: [
      ...tueMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...deepCleanAfternoon('All bathrooms'),
      ...stdEvening(),
    ],
  },

  // ── W4 Wednesday ───────────────────────────────────────────
  {
    id: 'w4-wed',
    weekNum: 4,
    dayName: 'Wednesday',
    date: null,
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Football (4:00–4:45)',
    deepClean: 'Bedrooms, living room & office',
    specialNote: null,
    reflection: true,
    rows: [
      mornSec(),
      { hazel: 'Kitchen island reset', nica: 'Fridge check (all 4)' },
      { hazel: 'Living room reset', nica: 'Leon\u2019s breakfast + brush teeth' },
      { hazel: 'Elevator area', nica: 'Breakfast cleaning up' },
      { hazel: 'Laundry load (ongoing)', nica: 'Leon\u2019s room + bathroom' },
      { hazel: 'Office', nica: '👶🏼 Morning outing with Leon' },
      { hazel: 'Master bedroom + bathroom', nica: '' },
      { hazel: 'Guest bedroom (Emi) + bathroom', nica: 'Back home no later than 12:30 to prep lunch' },
      { hazel: 'Guest bathroom', nica: '' },
      ...stdMidday(),
      ...stdRest(),
      ...wedDeepCleanAfternoon('Bedrooms, living room & office'),
      ...stdEvening(),
    ],
  },

  // ── W4 Thursday ────────────────────────────────────────────
  {
    id: 'w4-thu',
    weekNum: 4,
    dayName: 'Thursday',
    date: null,
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: 'Outdoor areas & windows',
    specialNote: null,
    reflection: true,
    rows: [
      ...stdMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...deepCleanAfternoon('Outdoor areas & windows'),
      ...stdEvening(),
    ],
  },

  // ── W4 Friday ──────────────────────────────────────────────
  {
    id: 'w4-fri',
    weekNum: 4,
    dayName: 'Friday',
    date: null,
    hazelOff: false,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Music class (10:30–11:30)',
    deepClean: 'Ironing & linen rotation (towel swap + sheets every 2nd Fri)',
    specialNote: null,
    reflection: true,
    rows: [
      ...friMorningRows(),
      ...stdMidday(),
      ...stdRest(),
      ...deepCleanAfternoon('Ironing catch-up + towel swap + sheets (every 2nd Fri)'),
      ...stdEvening(),
    ],
  },

  // ── W4 Saturday ────────────────────────────────────────────
  {
    id: 'w4-sat',
    weekNum: 4,
    dayName: 'Saturday',
    date: null,
    hazelOff: true,
    nicaOff: false,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: 'Swimming (11:30–12:00)',
    deepClean: null,
    specialNote: null,
    reflection: false,
    rows: satRows(true),
  },

  // ── W4 Sunday ──────────────────────────────────────────────
  {
    id: 'w4-sun',
    weekNum: 4,
    dayName: 'Sunday',
    date: null,
    hazelOff: false,
    nicaOff: true,
    adminEvents: [],
    orgTask: null,
    orgType: null,
    orgTime: null,
    leonActivity: null,
    deepClean: 'Light duties',
    specialNote: 'Nica\u2019s day off. Hazel covers Leon + kitchen + all duties. \uD83E\uDDF9 Light duties — daily routine only, check supplies, note restocking for Nica. Remember: Open Ilma\u2019s deliveries immediately — could be food.',
    reflection: true,
    rows: sunRows(),
  },

];

// ─────────────────────────────────────────────────────────────
//  SPRINT PLAN — 98-Day Sprint for EA Workspace
//  Start: March 9, 2026 (Day 1) → End: June 14, 2026 (Day 98)
// ─────────────────────────────────────────────────────────────

export const SPRINT_PLAN = {
  startDate: '2026-03-09',
  endDate: '2026-06-14',
  phases: [
    { id: 'A', name: 'Foundation',       startDay: 1,  endDay: 14, color: 'var(--sprint-phase-a)', bg: 'var(--sprint-phase-a-bg)' },
    { id: 'B', name: 'Content Engine',   startDay: 15, endDay: 35, color: 'var(--sprint-phase-b)', bg: 'var(--sprint-phase-b-bg)' },
    { id: 'C', name: 'Automation',       startDay: 36, endDay: 49, color: 'var(--sprint-phase-c)', bg: 'var(--sprint-phase-c-bg)' },
    { id: 'D', name: 'YouTube + Scale',  startDay: 50, endDay: 98, color: 'var(--sprint-phase-d)', bg: 'var(--sprint-phase-d-bg)' },
  ],
  deliverables: [
    { id: 8, name: 'Configuration',     phase: 'A', tagline: 'The foundation everything runs on' },
    { id: 1, name: 'Brand Identity',    phase: 'A', tagline: 'Visual + verbal DNA for everything' },
    { id: 3, name: 'Website',           phase: 'B', tagline: 'Authority hub — all content links here' },
    { id: 5, name: 'Twitter/X',         phase: 'B', tagline: 'Discovery engine — threads + replies' },
    { id: 4, name: 'Substack',          phase: 'B', tagline: 'Depth + newsletter — weekly Fridays' },
    { id: 2, name: 'Social Guidelines', phase: 'B', tagline: 'Per-platform voice + content calendar' },
    { id: 7, name: 'Agents',            phase: 'C', tagline: 'Automate what you\'ve been doing manually' },
    { id: 6, name: 'YouTube',           phase: 'D', tagline: '3 formats: on-camera, avatar, screen capture' },
  ],
  goals: {
    subscribers: { target: 150, stretch: 200, label: 'Newsletter Subs', start: 0, icon: '\u2709' },
    twitter:     { target: 750, stretch: 1000, label: 'Twitter Followers', start: 369, icon: '\ud835\udd4f' },
    youtube:     { target: 250, stretch: 500, label: 'YouTube Subs', start: 0, icon: '\u25b6' },
    website:     { target: 500, stretch: 1000, label: 'Monthly Visitors', start: 0, icon: '\ud83c\udf10' },
    articles:    { target: 10, stretch: 13, label: 'Articles Published', start: 0, icon: '\ud83d\udcdd' },
  },
  milestones: [
    { day: 5,  label: 'D8 Configuration Complete' },
    { day: 14, label: 'Brand Guidelines Finalized' },
    { day: 21, label: 'Website v1 Live' },
    { day: 35, label: 'Content Platforms Active' },
    { day: 49, label: 'Agents Operational' },
    { day: 70, label: 'YouTube Channel Live' },
    { day: 84, label: 'Full Content Pipeline Running' },
    { day: 98, label: 'System Handoff Complete' },
  ],
  weeks: [
    // ── WEEK 1 (Days 1-7) — Phase A: Foundation — D8 Configuration ──
    {
      weekNum: 1, phase: 'A',
      days: {
        mon: { dayNum: 1, tasks: [
          { text: 'Set up EA_Workspace folder structure (context/, decisions/, projects/, references/, templates/, .claude/)', deliverable: 8 },
          { text: 'Create updates.md + current-priorities.md', deliverable: 8 },
          { text: 'Save sprint_brief.md + BLAST master prompt to context/', deliverable: 8 },
        ]},
        tue: { dayNum: 2, tasks: [
          { text: 'Download Jack Skool assets (28+ prompts from Google Docs)', deliverable: 8 },
          { text: 'Write project CLAUDE.md (150-200 lines: identity, priorities, tools, skills)', deliverable: 8 },
          { text: 'Install YouTube Transcript MCP (verify working)', deliverable: 8 },
        ]},
        wed: { dayNum: 3, tasks: [
          { text: 'Download Nate Skool assets (6 SKILL.md files + 3 CLAUDE.md files)', deliverable: 8 },
          { text: 'Install Frontend Design SKILL.md', deliverable: 8 },
          { text: 'Install Skill Builder SKILL.md + reference.md', deliverable: 8 },
        ]},
        thu: { dayNum: 4, tasks: [
          { text: 'Install Nano Banana 2 (5 files: SKILL.md, GEMINI.md, Master Prompt, 2 Python scripts)', deliverable: 8 },
          { text: 'Create brand_config.json with empty token structure', deliverable: 8 },
          { text: 'Create platform template shells (Twitter, LinkedIn, Substack, YouTube)', deliverable: 8 },
        ]},
        fri: { dayNum: 5, tasks: [
          { text: 'Connect Firecrawl MCP (API key + test scrape)', deliverable: 8 },
          { text: 'Connect Perplexity MCP (API key + test search)', deliverable: 8 },
          { text: 'Install Skill Creator 2.0 skill (built-in evals for testing Claude skills)', deliverable: 8 },
          { text: 'Add brand enforcement rules to CLAUDE.md + final D8 verification', deliverable: 8 },
        ]},
        sat: { dayNum: 6, tasks: [
          { text: 'Gather 3-5 Emi lecture transcripts (spoken > written)', deliverable: 1 },
          { text: 'Download Segmentation Prompt + TOV Prompt from Jack Skool', deliverable: 1 },
          { text: 'Study Andrew Lane mood board method (watch YT 17 min)', deliverable: 1 },
        ]},
      },
      sunday: { dayNum: 7, note: 'Light day: Run segmentation on first transcript + read Emi\'s top papers' },
    },
    // ── WEEK 2 (Days 8-14) — Phase A: Foundation — D1 Brand Identity + D7 Seedlings ──
    {
      weekNum: 2, phase: 'A',
      days: {
        mon: { dayNum: 8, tasks: [
          { text: 'Run Segmentation Prompt on transcript #1 (9 categories)', deliverable: 1 },
          { text: 'Run Segmentation Prompt on transcript #2', deliverable: 1 },
          { text: 'Optimize LinkedIn profile (headline, about, banner)', deliverable: 1 },
        ]},
        tue: { dayNum: 9, tasks: [
          { text: 'Compile TOV document: Do\'s/Don\'ts from segmentation results', deliverable: 1 },
          { text: 'Test voice: generate sample LinkedIn post → check against TOV', deliverable: 1 },
          { text: 'Generate mood board v1 in ChatGPT (Andrew Lane 3-step)', deliverable: 1 },
        ]},
        wed: { dayNum: 10, tasks: [
          { text: 'Emi session: review TOV document + mood board v1', deliverable: 1 },
          { text: 'Extract hex codes via Coolors.co from mood board', deliverable: 1 },
          { text: 'Build Morning Briefing Agent v1 (reads project status → daily agenda)', deliverable: 7 },
          { text: 'Run eval: test briefing agent with 3 project-state variations', deliverable: 7 },
        ]},
        thu: { dayNum: 11, tasks: [
          { text: 'Generate mood board v2 (refined from Emi feedback)', deliverable: 1 },
          { text: 'Select font pairing (display/serif + sans)', deliverable: 1 },
          { text: 'Build YouTube Scout Agent v1 (check 4 channels weekly)', deliverable: 7 },
          { text: 'Run eval: test scout agent with 3 channel sets', deliverable: 7 },
        ]},
        fri: { dayNum: 12, tasks: [
          { text: 'Emi session: final brand direction approval', deliverable: 1 },
          { text: 'Create brand_guidelines.md (colors, fonts, spacing, tone, imagery)', deliverable: 1 },
          { text: 'Populate brand_config.json with actual values from brand decisions', deliverable: 1 },
        ]},
        sat: { dayNum: 13, tasks: [
          { text: 'Apply Anti-Generic Guardrails to visual specs', deliverable: 1 },
          { text: 'Sample content test: 1 tweet + 1 LinkedIn + 1 Substack paragraph → Emi approves', deliverable: 1 },
        ]},
      },
      sunday: { dayNum: 14, note: 'Milestone: Brand Guidelines Finalized' },
    },
    // ── WEEK 3 (Days 15-21) — Phase B: Content Engine — Website Polish ──
    {
      weekNum: 3, phase: 'B',
      days: {
        mon: { dayNum: 15, tasks: [
          { text: 'Website v2: apply brand guidelines to all pages', deliverable: 3 },
          { text: 'Add publications / research section to site', deliverable: 3 },
          { text: 'Mobile responsive testing + fixes', deliverable: 3 },
        ]},
        tue: { dayNum: 16, tasks: [
          { text: 'Website: add newsletter signup (Substack embed)', deliverable: 3 },
          { text: 'Set up Substack account + configure branding', deliverable: 4 },
          { text: 'Write Substack welcome email draft', deliverable: 4 },
        ]},
        wed: { dayNum: 17, tasks: [
          { text: 'Emi session: review website v2 + Substack setup', deliverable: 3 },
          { text: 'Website final fixes from Emi feedback', deliverable: 3 },
          { text: 'Draft first Substack article outline', deliverable: 4 },
        ]},
        thu: { dayNum: 18, tasks: [
          { text: 'Write first Substack article draft', deliverable: 4 },
          { text: 'Set up Twitter/X profile: bio, banner, pinned post', deliverable: 5 },
        ]},
        fri: { dayNum: 19, tasks: [
          { text: 'Emi session: review Substack draft + Twitter bio', deliverable: 4 },
          { text: 'Create Twitter/X content templates (thread, insight, question)', deliverable: 5 },
          { text: 'Deploy website v2 live', deliverable: 3 },
        ]},
        sat: { dayNum: 20, tasks: [
          { text: 'Write first 3 Twitter/X threads (batch)', deliverable: 5 },
          { text: 'Finalize + schedule Substack #1', deliverable: 4 },
        ]},
      },
      sunday: { dayNum: 21, note: 'Milestone: Website v1 Live' },
    },
    // ── WEEK 4 (Days 22-28) — Phase B: Content Engine — Launch Content ──
    {
      weekNum: 4, phase: 'B',
      days: {
        mon: { dayNum: 22, tasks: [
          { text: 'Publish Substack #1', deliverable: 4 },
          { text: 'Post first Twitter/X thread', deliverable: 5 },
          { text: 'LinkedIn profile optimization (headline, about, banner)', deliverable: 2 },
        ]},
        tue: { dayNum: 23, tasks: [
          { text: 'Write LinkedIn article (repurpose Substack #1)', deliverable: 2 },
          { text: 'Draft social branded guidelines doc', deliverable: 2 },
          { text: 'Post Twitter/X thread #2', deliverable: 5 },
        ]},
        wed: { dayNum: 24, tasks: [
          { text: 'Emi session: review first week of content + engagement', deliverable: 4 },
          { text: 'Draft Substack #2 outline', deliverable: 4 },
          { text: 'Post Twitter/X thread #3', deliverable: 5 },
        ]},
        thu: { dayNum: 25, tasks: [
          { text: 'Write Substack #2 draft', deliverable: 4 },
          { text: 'Create content calendar template (4 weeks out)', deliverable: 2 },
        ]},
        fri: { dayNum: 26, tasks: [
          { text: 'Emi session: review Substack #2 + content calendar', deliverable: 4 },
          { text: 'Batch write Twitter/X threads #4-6', deliverable: 5 },
        ]},
        sat: { dayNum: 27, tasks: [
          { text: 'Finalize social branded guidelines doc', deliverable: 2 },
          { text: 'Publish Substack #2', deliverable: 4 },
        ]},
      },
      sunday: { dayNum: 28, note: 'Light day: Review analytics + engagement metrics' },
    },
    // ── WEEK 5 (Days 29-35) — Phase B: Content Engine — Pipeline ──
    {
      weekNum: 5, phase: 'B',
      days: {
        mon: { dayNum: 29, tasks: [
          { text: 'Analyze first 2 weeks of content metrics', deliverable: 2 },
          { text: 'Draft Substack #3 outline (data-driven topic)', deliverable: 4 },
          { text: 'Post Twitter/X thread #4', deliverable: 5 },
        ]},
        tue: { dayNum: 30, tasks: [
          { text: 'Write Substack #3 draft', deliverable: 4 },
          { text: 'LinkedIn post #2 (repurpose best Twitter thread)', deliverable: 2 },
        ]},
        wed: { dayNum: 31, tasks: [
          { text: 'Emi session: review content pipeline + plan automation', deliverable: 7 },
          { text: 'Publish Substack #3', deliverable: 4 },
          { text: 'Post Twitter/X threads #5-6', deliverable: 5 },
        ]},
        thu: { dayNum: 32, tasks: [
          { text: 'Document content creation workflow (SOP)', deliverable: 2 },
          { text: 'Batch write next 3 Twitter/X threads', deliverable: 5 },
        ]},
        fri: { dayNum: 33, tasks: [
          { text: 'Emi session: record practice on-camera video', deliverable: 6 },
          { text: 'Draft Substack #4 outline', deliverable: 4 },
        ]},
        sat: { dayNum: 34, tasks: [
          { text: 'Write Substack #4 draft', deliverable: 4 },
          { text: 'Plan YouTube channel structure (3 formats)', deliverable: 6 },
        ]},
      },
      sunday: { dayNum: 35, note: 'Milestone: First Substack + Twitter Active' },
    },
    // ── WEEK 6 (Days 36-42) — Phase C: Automation — Claude Code Setup ──
    {
      weekNum: 6, phase: 'C',
      days: {
        mon: { dayNum: 36, tasks: [
          { text: 'Install WAT CLAUDE.md framework', deliverable: 8 },
          { text: 'Install Web Design CLAUDE.md', deliverable: 8 },
          { text: 'Publish Substack #4', deliverable: 4 },
        ]},
        tue: { dayNum: 37, tasks: [
          { text: 'Install Skill Builder SKILL.md + reference.md', deliverable: 8 },
          { text: 'Install Video to Website SKILL.md', deliverable: 8 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        wed: { dayNum: 38, tasks: [
          { text: 'Emi session: review automation plan + content', deliverable: 7 },
          { text: 'Create first custom workflow (content scheduler)', deliverable: 7 },
          { text: 'Draft Substack #5 outline', deliverable: 4 },
        ]},
        thu: { dayNum: 39, tasks: [
          { text: 'Build morning briefing agent v1', deliverable: 7 },
          { text: 'Test morning briefing output quality', deliverable: 7 },
        ]},
        fri: { dayNum: 40, tasks: [
          { text: 'Emi session: review morning briefing + Substack #5', deliverable: 7 },
          { text: 'Write Substack #5 draft', deliverable: 4 },
        ]},
        sat: { dayNum: 41, tasks: [
          { text: 'Build YouTube scout agent (trending topic monitor)', deliverable: 7 },
          { text: 'Publish Substack #5', deliverable: 4 },
        ]},
      },
      sunday: { dayNum: 42, note: 'Light day: Review agent outputs + iterate prompts' },
    },
    // ── WEEK 7 (Days 43-49) — Phase C: Automation — Agent Building ──
    {
      weekNum: 7, phase: 'C',
      days: {
        mon: { dayNum: 43, tasks: [
          { text: 'Build overnight research agent (paper scanner)', deliverable: 7 },
          { text: 'Build content pipeline agent (draft from notes)', deliverable: 7 },
        ]},
        tue: { dayNum: 44, tasks: [
          { text: 'Test all agents end-to-end, fix edge cases', deliverable: 7 },
          { text: 'Draft Substack #6 outline', deliverable: 4 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        wed: { dayNum: 45, tasks: [
          { text: 'Emi session: review agent outputs + approve samples', deliverable: 7 },
          { text: 'Write Substack #6 draft', deliverable: 4 },
        ]},
        thu: { dayNum: 46, tasks: [
          { text: 'Refine agent prompts based on Emi feedback', deliverable: 7 },
          { text: 'Connect morning briefing to daily workflow', deliverable: 7 },
        ]},
        fri: { dayNum: 47, tasks: [
          { text: 'Emi session: content review + book chapter outline', deliverable: 4 },
          { text: 'Publish Substack #6', deliverable: 4 },
        ]},
        sat: { dayNum: 48, tasks: [
          { text: 'LinkedIn post #3 (repurpose Substack highlight)', deliverable: 2 },
          { text: 'Document agent architecture (for maintenance)', deliverable: 7 },
        ]},
      },
      sunday: { dayNum: 49, note: 'Light day: Review agent logs + plan pipeline integration' },
    },
    // ── WEEK 8 (Days 50-56) — Phase D: YouTube + Scale — Pipeline Integration ──
    {
      weekNum: 8, phase: 'D',
      days: {
        mon: { dayNum: 50, tasks: [
          { text: 'Connect agents to Substack workflow', deliverable: 7 },
          { text: 'Connect agents to Twitter/X workflow', deliverable: 7 },
        ]},
        tue: { dayNum: 51, tasks: [
          { text: 'LinkedIn automation setup', deliverable: 7 },
          { text: 'Draft Substack #7 outline (agent-assisted)', deliverable: 4 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        wed: { dayNum: 52, tasks: [
          { text: 'Emi session: approve automated content samples', deliverable: 7 },
          { text: 'Full pipeline test run (end-to-end)', deliverable: 7 },
        ]},
        thu: { dayNum: 53, tasks: [
          { text: 'Fix pipeline issues from test run', deliverable: 7 },
          { text: 'Write Substack #7 draft', deliverable: 4 },
        ]},
        fri: { dayNum: 54, tasks: [
          { text: 'Emi session: final agent review before YouTube phase', deliverable: 7 },
          { text: 'Publish Substack #7', deliverable: 4 },
        ]},
        sat: { dayNum: 55, tasks: [
          { text: 'Deploy Trigger.dev scheduled tasks (if applicable)', deliverable: 7 },
          { text: 'Create agent maintenance runbook', deliverable: 7 },
        ]},
      },
      sunday: { dayNum: 56, note: 'Milestone: Agents Operational' },
    },
    // ── WEEK 9 (Days 57-63) — Phase D: YouTube + Scale — Channel Setup ──
    {
      weekNum: 9, phase: 'D',
      days: {
        mon: { dayNum: 57, tasks: [
          { text: 'Create YouTube channel, apply branding', deliverable: 6 },
          { text: 'Design channel banner + profile in brand system', deliverable: 6 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 58, tasks: [
          { text: 'Plan first 5 video topics with Emi', deliverable: 6 },
          { text: 'Create YouTube intro/outro template', deliverable: 6 },
        ]},
        wed: { dayNum: 59, tasks: [
          { text: 'Emi session: record first on-camera video', deliverable: 6 },
          { text: 'Draft Substack #8 outline', deliverable: 4 },
        ]},
        thu: { dayNum: 60, tasks: [
          { text: 'Edit first video: cuts, branded overlays, captions', deliverable: 6 },
          { text: 'Write Substack #8 draft', deliverable: 4 },
        ]},
        fri: { dayNum: 61, tasks: [
          { text: 'Emi session: review video edit + approve for upload', deliverable: 6 },
          { text: 'Publish Substack #8', deliverable: 4 },
        ]},
        sat: { dayNum: 62, tasks: [
          { text: 'Upload first YouTube video', deliverable: 6 },
          { text: 'Create YouTube description template + SEO tags', deliverable: 6 },
        ]},
      },
      sunday: { dayNum: 63, note: 'Light day: Monitor YouTube analytics + engagement' },
    },
    // ── WEEK 10 (Days 64-70) — Phase D: YouTube — Multi-Format ──
    {
      weekNum: 10, phase: 'D',
      days: {
        mon: { dayNum: 64, tasks: [
          { text: 'Set up HeyGen / Blotato AI avatar', deliverable: 6 },
          { text: 'Create first AI avatar test video', deliverable: 6 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 65, tasks: [
          { text: 'Refine AI avatar: voice, style, branding', deliverable: 6 },
          { text: 'OBS screen capture setup + test recording', deliverable: 6 },
        ]},
        wed: { dayNum: 66, tasks: [
          { text: 'Emi session: review AI avatar + screen capture formats', deliverable: 6 },
          { text: 'Record first screen capture explainer video', deliverable: 6 },
        ]},
        thu: { dayNum: 67, tasks: [
          { text: 'Edit AI avatar video + screen capture video', deliverable: 6 },
          { text: 'Draft Substack #9 outline', deliverable: 4 },
        ]},
        fri: { dayNum: 68, tasks: [
          { text: 'Emi session: approve all 3 video formats', deliverable: 6 },
          { text: 'Write + publish Substack #9', deliverable: 4 },
        ]},
        sat: { dayNum: 69, tasks: [
          { text: 'Upload 2 more YouTube videos (avatar + screen capture)', deliverable: 6 },
          { text: 'LinkedIn post #4 (video announcement)', deliverable: 2 },
        ]},
      },
      sunday: { dayNum: 70, note: 'Milestone: YouTube Channel Live' },
    },
    // ── WEEK 11 (Days 71-77) — Phase D: Scale — Content Flywheel ──
    {
      weekNum: 11, phase: 'D',
      days: {
        mon: { dayNum: 71, tasks: [
          { text: 'Create YouTube content calendar (4 weeks out)', deliverable: 6 },
          { text: 'Batch record 2 on-camera videos', deliverable: 6 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 72, tasks: [
          { text: 'Edit + schedule video batch', deliverable: 6 },
          { text: 'Create AI avatar video from latest research', deliverable: 6 },
        ]},
        wed: { dayNum: 73, tasks: [
          { text: 'Emi session: content review + book chapter progress', deliverable: 6 },
          { text: 'Cross-platform content repurposing (YT to Twitter)', deliverable: 5 },
        ]},
        thu: { dayNum: 74, tasks: [
          { text: 'Draft Substack #10 outline', deliverable: 4 },
          { text: 'Upload next YouTube video', deliverable: 6 },
        ]},
        fri: { dayNum: 75, tasks: [
          { text: 'Emi session: review metrics + adjust strategy', deliverable: 2 },
          { text: 'Write + publish Substack #10', deliverable: 4 },
        ]},
        sat: { dayNum: 76, tasks: [
          { text: 'OBS screen capture: record explainer #2', deliverable: 6 },
          { text: 'Analytics review across all platforms', deliverable: 2 },
        ]},
      },
      sunday: { dayNum: 77, note: 'Light day: Review week + plan optimization' },
    },
    // ── WEEK 12 (Days 78-84) — Phase D: Scale — Optimization ──
    {
      weekNum: 12, phase: 'D',
      days: {
        mon: { dayNum: 78, tasks: [
          { text: 'Analyze metrics across all platforms', deliverable: 2 },
          { text: 'Optimize YouTube thumbnails + SEO', deliverable: 6 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 79, tasks: [
          { text: 'Refine content pipeline based on data', deliverable: 7 },
          { text: 'Build interactive prototype #1 (book concept)', deliverable: 3 },
        ]},
        wed: { dayNum: 80, tasks: [
          { text: 'Emi session: prototype review + book progress', deliverable: 3 },
          { text: 'Draft Substack #11 outline', deliverable: 4 },
        ]},
        thu: { dayNum: 81, tasks: [
          { text: 'Create interactive prototypes #2-3', deliverable: 3 },
          { text: 'Write + publish Substack #11', deliverable: 4 },
        ]},
        fri: { dayNum: 82, tasks: [
          { text: 'Emi session: review prototypes + content batch', deliverable: 3 },
          { text: 'Upload 2 YouTube videos', deliverable: 6 },
        ]},
        sat: { dayNum: 83, tasks: [
          { text: 'Create interactive prototypes #4-5', deliverable: 3 },
          { text: 'LinkedIn post #5 (prototype preview)', deliverable: 2 },
        ]},
      },
      sunday: { dayNum: 84, note: 'Milestone: Full Content Pipeline Running' },
    },
    // ── WEEK 13 (Days 85-91) — Phase D: Scale — Growth ──
    {
      weekNum: 13, phase: 'D',
      days: {
        mon: { dayNum: 85, tasks: [
          { text: 'Guest outreach for cross-promotion (3 contacts)', deliverable: 5 },
          { text: 'University licensing research + prospect list', deliverable: 4 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 86, tasks: [
          { text: 'Platform MVP scoping document', deliverable: 3 },
          { text: 'Batch content production (next week ahead)', deliverable: 4 },
        ]},
        wed: { dayNum: 87, tasks: [
          { text: 'Emi session: growth strategy + university contacts', deliverable: 4 },
          { text: 'Draft Substack #12 outline', deliverable: 4 },
        ]},
        thu: { dayNum: 88, tasks: [
          { text: 'Write + publish Substack #12', deliverable: 4 },
          { text: 'Create interactive prototypes #6-7', deliverable: 3 },
        ]},
        fri: { dayNum: 89, tasks: [
          { text: 'Emi session: review prototypes + plan handoff', deliverable: 3 },
          { text: 'Upload 2 YouTube videos', deliverable: 6 },
        ]},
        sat: { dayNum: 90, tasks: [
          { text: 'Documentation of all systems and processes', deliverable: 8 },
          { text: 'LinkedIn post #6 (milestone update)', deliverable: 2 },
        ]},
      },
      sunday: { dayNum: 91, note: 'Light day: Prepare handoff documentation' },
    },
    // ── WEEK 14 (Days 92-98) — Phase D: Scale — Handoff ──
    {
      weekNum: 14, phase: 'D',
      days: {
        mon: { dayNum: 92, tasks: [
          { text: 'Final system documentation (all agents + workflows)', deliverable: 8 },
          { text: 'Troubleshooting guide for all agents', deliverable: 7 },
          { text: 'Post Twitter/X weekly batch', deliverable: 5 },
        ]},
        tue: { dayNum: 93, tasks: [
          { text: 'Solo maintenance test run (simulate Emi-only week)', deliverable: 8 },
          { text: 'Draft Substack #13 (final sprint article)', deliverable: 4 },
        ]},
        wed: { dayNum: 94, tasks: [
          { text: 'Emi session: test run review + fix issues', deliverable: 8 },
          { text: 'Write + publish Substack #13', deliverable: 4 },
        ]},
        thu: { dayNum: 95, tasks: [
          { text: 'Fix any issues from maintenance test run', deliverable: 8 },
          { text: 'Upload final YouTube videos of sprint', deliverable: 6 },
        ]},
        fri: { dayNum: 96, tasks: [
          { text: 'Emi session: final review + celebration', deliverable: 8 },
          { text: 'Compile final metrics report', deliverable: 2 },
        ]},
        sat: { dayNum: 97, tasks: [
          { text: 'System handoff: transfer all credentials + access', deliverable: 8 },
          { text: 'Create 30-day post-sprint maintenance calendar', deliverable: 8 },
        ]},
      },
      sunday: { dayNum: 98, note: 'Milestone: System Handoff Complete' },
    },
  ],
};
