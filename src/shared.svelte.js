export const userData = $state({
  activities: [],
  events: [],
  tasks: [],
  journal: {},
  notes: [],
  habits: [],
  goals: [],
  records: [],
  preferences: {
    timeFormat: "format24",
  },
  calendar: {}
});

export function setUserData(data) {
  for (let [key, value] of Object.entries(data)) {
    userData[key] = value;
  }
}

export const calendarData = $state({
  format: "weekly",
  selected: new Date(),
  itemAdding: false,
  itemAddData: { day: -1 }
});

export const menuData = $state({
  submenu: null,
  props: {},
  colorPicker: { x: -1, y: -1, onSelect: null },
  closing: false
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