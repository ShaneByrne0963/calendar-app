import { compareDates, convertDateToArray, dateToInputValue, habitComplete, inputToArray } from "./helpers";
import { calendarData, userData, sessionData } from "./shared.svelte";

export function init() {
  habitInit(true);
}

// Calculates the streaks of all the habits
export function habitInit(forceAll = false) {
  let [year, month, day] = convertDateToArray(calendarData.today);
  let todaysDay = calendarData.today.getDay() - 1;
  if (todaysDay < 0) todaysDay += 7;
  // Update all habits if specified
  if (forceAll) sessionData.checkedHabits = [];
  
  for (let [key, data] of Object.entries(userData.habits)) {
    if (key === "id") continue;
    if (sessionData.checkedHabits.includes(key)) continue;
    
    let startDate = inputToArray(data.startDate);
    let streakLast = inputToArray(data.streakLast || data.startDate);
    let streak = 0;
    let foundStreakLast = false;
    // Stores whether the target has been reached since the last evaluation. Prevents double counts
    let completedStreak = false;
    let completeHabits = 0;
    let isStart = true;
    
    for (let i = 1; true; i++) {
      let result = null;
      let date;
      if (data.occurence === "Every day") {
        // For every day, decrement the date by 1 until the start of the streak is found
        date = new Date(year, month, day - i);
      } else if (data.occurence === "Specific days of the week" ||
        data.occurence === "Specific days of the month") {
        // Do the same for specific days of the week/month, but only the days that are selected
        let specificType = data.occurence.replace("Specific days of the ", "");
        while (!foundStreakLast) {
          date = new Date(year, month, day - i);
          let checkDay = specificType === "week" ? date.getDay() - 1 : date.getDate() - 1;
          if (checkDay < 0) checkDay += 7;
          if (!data.days.includes(checkDay)) {
            i++;
            // Check to see if the selected date is the date where the habit was last checked
            if (compareDates(date, streakLast) === "Equal") {
              foundStreakLast = true;
              streak += data.streak;
              break;
            }
            continue;
          }
          break;
        }
        // Don't check if the habit is valid if the last date it was evaluated doesn't fall on a day it was checked
        if (foundStreakLast) break;
      } else {
        date = new Date(year, month, day - i);
        let nextDayDate = new Date(year, month, day - i + 1);

        // When the current iteration day is the last day of the period length, evaluate the results
        const isEval = data.periodLength === "Week" ? (date.getDay() === 0) : (date.getMonth() !== nextDayDate.getMonth());
        if (isEval) {
          if (foundStreakLast) {
            streak += data.streak;
            break;
          }
          // End the streak check when the target is not met
          if (!isStart && completeHabits < data.frequency) {
            break;
          }
          completeHabits = 0;
          completedStreak = false;
          isStart = false;
        }
      }
      // Ensure the checking date is not before the start date or the date where the streak was last evaluated
      if (compareDates(date, startDate) === "Before"
        || (compareDates(date, streakLast) === "Before" && data.occurence !== "Times per period")) {
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
        if (data.occurence === "Times per period") {
          continue;
        }
        // Accept missing data as a continued streak if the default is complete
        if (!((data.format === "Checkbox" && data.defaultChecked) ||
          (data.format === "Number" && data.limit === "No more than"))) {
          break;
        }
      }
      // If the code makes it this far, the day's habits have been completed
      if (data.occurence === "Times per period") {
        completeHabits++;
        if (completeHabits === data.frequency) {
          if (completedStreak) {
            // Takes 1 away from the streak as it will be added again from the previous evaluation
            streak--;
          }
          else {
            streak++;
          }
          completedStreak = true;
        }
        if (compareDates(date, streakLast) ===  "Equal") {
          foundStreakLast = true;
          // Resets the completed habit count to check if the previous recorded streak already counted this period
          if (completedStreak) {
            completeHabits = 0;
          }
        }
      }
      else { 
        streak++;
        if (compareDates(date, streakLast) ===  "Equal") {
          streak += data.streak;
          break;
        }
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