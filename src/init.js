import { compareDates, dateToInputValue, habitComplete, inputToArray } from "./helpers";
import { calendarData, userData, sessionData } from "./shared.svelte";

export function init() {
  habitInit(true);
}

// Calculates the streaks of all the habits
export function habitInit(forceAll = false) {
  let year = calendarData.today.getFullYear();
  let month = calendarData.today.getMonth();
  let day = calendarData.today.getDate();
  let weekDay = calendarData.today.getDay() - 1;
  if (weekDay < 0) weekDay += 7;
  // Update all habits if specified
  if (forceAll) sessionData.checkedHabits = [];

  for (let [key, data] of Object.entries(userData.habits)) {
    if (key === "id") continue;
    if (sessionData.checkedHabits.includes(key)) continue;

    let startDate = inputToArray(data.startDate);
    let streak = 0;

    for (let i = 1; true; i++) {
      let date;
      let result = null;
      // For every day, decrement the date by 1 until the start of the streak is found
      if (data.occurence === "Every day") {
        date = new Date(year, month, day - i);
      } else {
        break;
      }
      // Ensure the checking date is not before the start date
      if (compareDates(date, startDate) === "Before") {
        break;
      }

      let dateKey = dateToInputValue(date);
      // Attempt to find the data of the current date iteration
      try {
        result = userData.calendar[dateKey].habitData[key];
        if (!habitComplete(key, result)) {
          throw new Error("F");
        }
        streak++;
      } catch (error) {
        // Accept missing data as a continued streak if the default is complete
        if ((data.format === "Checkbox" && data.defaultChecked) ||
          (data.format === "Number" && data.limit === "No more than")) {
          streak++;
          continue;
        }
        break;
      }
    }
    if (streak > data.record) {
      data.record = streak;
    }
    // Remove the goal when reached
    if ("goal" in data && streak >= data.goal) {
      delete data.goal;
    }
    sessionData.habitStreaks[key] = streak;
    sessionData.checkedHabits.push(key);
  }
}