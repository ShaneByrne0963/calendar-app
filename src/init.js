import { compareDates, dateToInputValue, habitComplete } from "./helpers";
import { calendarData, userData, sessionData } from "./shared.svelte";

export function init() {
  habitInit();
}

// Calculates the streaks of all the habits
function habitInit() {
  let year = calendarData.today.getFullYear();
  let month = calendarData.today.getMonth();
  let day = calendarData.today.getDate();
  let weekDay = calendarData.today.getDay() - 1;
  if (weekDay < 0) weekDay += 7;
  for (let [key, data] of Object.entries(userData.habits)) {
    if (key === "id") {
      continue;
    }
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
      if (compareDates(date, data.startDate) === "Before") {
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
        if (
          error === "F" ||
          !(data.format === "Checkbox" && data.defaultChecked)
        ) {
          break;
        }
      }
    }
    sessionData.habitStreaks[key] = streak;
  }
}