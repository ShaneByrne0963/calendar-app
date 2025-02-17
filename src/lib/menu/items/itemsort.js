import { dateToInputValue } from "../../../helpers";
import {userData} from "../../../shared.svelte";

// Sorts the habits by ones that need to be checked today and ones that don't
export function sortHabits() {
  let result = {
    todaysHabits: {
      title: "Today's habits",
      items: [],
    },
    otherHabits: {
      title: "Other habits",
      items: [],
    }
  }
  for (let [key, entry] of Object.entries(userData.habits)) {
    if (key === "id") continue;
    let today = new Date();
    const [day, date] = [today.getDay(), today.getDate()];

    // Daily activities
    if (entry.occurence === "Every day") {
      result.todaysHabits.items.push(entry);
      continue;
    }
    // Specific days of the week
    if (entry.occurence === "Specific days of the week") {
      if (entry.days.includes(day - 1)) {
        result.todaysHabits.items.push(entry);
        continue;
      }
    }
    // Specific days of the month
    if (entry.occurence === "Specific days of the month") {
      if (entry.days.includes(date - 1)) {
        result.todaysHabits.items.push(entry);
        continue;
      }
    }
    // Times per period
    if (entry.occurence === "Times per period") {
      // Subtract the current day (i.e. Wednesday) to get the start of the week (Sunday), then add 1 to get Monday
      // let startDay = entry.periodLength === "Week" ? date - day + 1 : 1;
      // let numChecks = entry.periodLength === "Week" ? day : date;

      // const periodStart = new Date(today.getFullYear(), today.getMonth(), startDay);
      // let times = 0;
      // // Check each day since the start of the period to see if the target has been met
      // for (let i = 0; i < numChecks - 1; i++) {
      //   const key = dateToInputValue(new Date(periodStart.getFullYear(), periodStart.getMonth(), periodStart.getDate() + i));
      //   if (key in userData.habits) {
      //     let data = userData.habits[key];

          
      //   }
      // }
    }
    result.otherHabits.items.push(entry);
  }
  return result;
}