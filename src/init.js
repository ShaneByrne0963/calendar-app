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
    let streakLast = inputToArray(data.streakLast);
    let streak = 0;
    
    for (let i = 1; true; i++) {
      let result = null;
      let date;
      // For every day, decrement the date by 1 until the start of the streak is found
      if (data.occurence === "Every day") {
        date = new Date(year, month, day - i);
      } else {
        break;
      }
      // Ensure the checking date is not before the start date or the date where the streak was last evaluated
      if (compareDates(date, startDate) === "Before"
        || compareDates(date, streakLast) === "Before") {
        break;
      }

      let dateKey = dateToInputValue(date);
      // Attempt to find the data of the current date iteration
      try {
        result = userData.calendar[dateKey].habitData[key];
        if (!habitComplete(key, result)) {
          throw new Error("F");
        }
      } catch (error) {
        // Accept missing data as a continued streak if the default is complete
        if (!((data.format === "Checkbox" && data.defaultChecked) ||
          (data.format === "Number" && data.limit === "No more than"))) {
          break;
        }
      }
      // If the code makes it this far, the day's habits have been completed
      streak++;
      if (compareDates(date, streakLast) ===  "Equal") {
        streak += data.streak;
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
    data.streak = streak;
    data.streakLast = dateToInputValue(calendarData.today);
    sessionData.habitStreaks[key] = streak;
    sessionData.checkedHabits.push(key);
  }
}