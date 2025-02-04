export const calendarData = $state({
  format: "weekly",
  selected: new Date()
});

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