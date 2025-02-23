export const userData = $state({
  activities: { id: "0" },
  events: { id: "0" },
  tasks: { id: "0" },
  journal: {},
  notes: [],
  habits: { id: "0" },
  goals: { id: "0" },
  records: { id: "0" },
  preferences: {
    timeFormat: "format24",
    hiddenMorningHours: 8,
  },
  calendar: {},

  // Sets a value in the data, creating any objects that don't exist
  set: (location, value) => {
    let keys = location.split(".");
    let endKey = keys.splice(keys.length - 1);
    let references = [userData];

    for (let key of keys) {
      if (!(key in references[0])) {
        references[0][key] = {};
        references.unshift(references[0][key]);
      }
    }
    references[0][endKey] = value;
  }
});

export const sessionData = $state({
  checkedHabits: [],
  habitStreaks: {},
});

export function setUserData(data) {
  for (let [key, value] of Object.entries(data)) {
    userData[key] = value;
  }
}

export const calendarData = $state({
  format: "weekly",
  today: new Date(),
  hours: 0,
  minutes: 0,
  selected: new Date(),
  itemAdding: false,
  itemAddData: { day: -1 },
  updateJournal: null,
});

export const menuData = $state({
  submenus: [],
  clickWindow: { component: null, x: -1, y: -1, onSelect: null },
  closing: false,
});

export const toasts = $state([]);

export function addToast(type, text) {
  toasts.push({ type, text });
}

export const mDisplay = $state({
  month: 0,
  year: 0,

  set: (date) => {
    mDisplay.month = date.getMonth();
    mDisplay.year = date.getFullYear();
  }
});

export const wDisplay = $state({
  day: 0,
  month: 0,
  year: 0,

  set: (date) => {
    let dayOfWeek = date.getDay() - 1;
    if (dayOfWeek < 0) {
      dayOfWeek += 7;
    }
    wDisplay.day = date.getDate() - dayOfWeek;
    wDisplay.month = date.getMonth();
    wDisplay.year = date.getFullYear();
  }
});