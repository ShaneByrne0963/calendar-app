import { days, months } from "./types"
import {menuData, userData} from "./shared.svelte";

/**
 * Gets the first 3 letters of a string
 * @param val The value to be processed
 * @returns The first 3 letters
 */
export function first3(val) {
  return val.slice(0, 3);
}


// Clamps a number between min and max
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}


// Gets the place of a number, i.e. 1st, 2nd, 3rd
export function getNumberPlace(number) {
  let digit = number % 10;
  if (digit === 1) {
    return `${number}st`;
  }
  if (digit === 2) {
    return `${number}nd`;
  }
  if (digit === 3) {
    return `${number}rd`;
  }
  return `${number}th`;
}


// Picks a random item from an array and returns it
export function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// Converts a possible proxy array into an array that can be used
export function removeProxy(val) {
  if (val[0]) {
    return val;
  }
  let result = [];
  let storage = [];
  for (let [key, value] of Object.entries(val)) {
    let number = value;
    if (parseInt(key) === result.length) {
      result.push(number);
    }
    else {
      storage.push({ key, value: number });
    }
  }
  return result.push(...storage.map(item => item.value));
}


export function addItemToData(key, value) {
  const id = userData[key].id;
  userData[key][id] = value;
  userData[key].id = incrementId(id);
}


export function incrementId(id) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let newId = id.split("");
  let idIndices = newId.map(item => chars.findIndex(char => item === char));

  for (let i = idIndices.length - 1; i >= 0; i--) {
    let index = idIndices[i];
    index++;
    if (index >= chars.length) {
      index = 0;
      newId[i] = "0";
      if (i === 0) {
        idIndices.unshift("0");
        break;
      }
      continue;
    }
    newId[i] = chars[index];
    break;
  }
  return newId.join("");
}


export function openSubmenu(component, props = {}) {
  const componentIndex = menuData.submenus.findIndex((item) => item.component == component);
  if (componentIndex === -1) {
    menuData.submenus.push({component, props, closing: false});
  } else {
    let submenu = menuData.submenus[componentIndex];
    if (componentIndex < menuData.submenus.length - 1) {
      // Trigger the closing animation directly back to the found component
      let i = componentIndex + 1;
      // Delete every submenu between the found component and the current submenu
      while (i < menuData.submenus.length - 1) {
        menuData.submenus.splice(i, 1);
      }
      menuData.submenus[componentIndex + 1].closing = true;
    }
    if ("updateProps" in submenu) {
      submenu.updateProps(props);
    }
  }
}


export function closeSubmenu() {
  menuData.submenus[menuData.submenus.length - 1].closing = true;
}


// Converts a date to a string format that can be used in an input value
export function dateToInputValue(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}


// Converts a date format received from a date input to a user-friendly date format
export function inputToDateDisplay(date) {
  let dates = date.split("-").map(val => parseInt(val));
  dates[1] -= 1;

  return arrayToDateDisplay(dates);
}


// Converts a date format as an array [y, m, d] input to a user-friendly date format
export function arrayToDateDisplay(dates) {
  return `${dates[2]} ${first3(months[dates[1]])} ${dates[0]}`;
}


export function dateArrayToInput(date) {
  return `${date[0]}-${date[1]}-${date[2]}`;
}


// Converts a date object to an array of numbers [y, m, d]
export function convertDateToArray(date) {
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}


// Converts a date input to a [y, m, d] array
export function inputToArray(input) {
  let result = input.split("-").map((item) => parseInt(item));
  // Subtract one month to account for the 0 start
  result[1] -= 1;
  return result
}


// Compares two dates, returning if the first date is before, the same as or after the second
export function compareDates(date1, date2) {
  let pDate1 = (date1 instanceof Date ? convertDateToArray(date1) : removeProxy(date1));
  let pDate2 = (date2 instanceof Date ? convertDateToArray(date2) : removeProxy(date2));
  
  for (let i = 0; i < 3; i++) {
    let time1 = pDate1[i];
    let time2 = pDate2[i];

    if (time1 < time2) {
      return "Before";
    }
    if (time1 > time2) {
      return "After";
    }
  }
  return "Equal";
}


// Displays a list of days in a readable format
export function displaySelectedDays(dayList) {
  let parsedDays = dayList
    .map((item) => ({
      start: item,
      end: item,
      startLabel: first3(days[item]),
      endLabel: first3(days[item]),
    }))
    .reduce((acc, item) => {
      // Stack the days together if they are checked one after the other
      if (acc.length === 0 || item.start > acc[acc.length - 1].end + 1) {
        acc.push(item);
      } else {
        let endAcc = acc[acc.length - 1];
        endAcc.end = item.start;
        endAcc.endLabel = item.startLabel;
      }
      return acc;
    }, []);
  let formattedDays = "";
  // Convert the data to a readable string format
  for (let day of parsedDays) {
    if (formattedDays !== "") {
      formattedDays += ", ";
    }
    formattedDays += day.startLabel;
    if (day.startLabel !== day.endLabel) {
      // Only include the dash if the start day and end day are not beside each other
      formattedDays +=
        (day.end > day.start + 1 ? " - " : ", ") + day.endLabel;
    }
  }
  return formattedDays;
}


// Returns a number as a string, adding a 0 to the beginning if it is only one digit
export function addZeroToNumber(num) {
  return `${num < 10 ? 0 : ""}${num}`;
}


// Calculates the date of Easter Sunday for a given year
export function calculateEaster(year) {
  let c = Math.floor(year / 100);
  let n = year - 19 * Math.floor( year / 19 );
  let k = Math.floor(( c - 17 ) / 25);
  let i = c - Math.floor(c / 4) - Math.floor(( c - k ) / 3) + 19 * n + 15;
  i = i - 30 * Math.floor( i / 30 );
  i = i - Math.floor( i / 28 ) * ( 1 - Math.floor( i / 28 )
      * Math.floor( 29 / ( i + 1 ) )
      * Math.floor( ( 21 - n ) / 11 ) );
  let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4);
  j = j - 7 * Math.floor( j / 7 );
  let l = i - j;
  let month = 3 + Math.floor(( l + 40 ) / 44);
  let day = l + 28 - 31 * Math.floor( month / 4 );

  return [year, month - 1, day];
}


// Converts a time object { hours, minutes } into a user-friendly text format
export function convertTimeToDisplay(time) {
  let preference = userData.preferences.timeFormat;
  let minute = typeof time === "number" ? time % 60 : time.minutes;
  let hour = typeof time === "number" ? (time - minute) / 60 : time.hours;
  let parsedHour = "";
  let suffix = "";
  if (preference === "format12") {
    parsedHour = "" + (hour === 0 ? 12 : hour);
    suffix = hour < 12 ? "am" : "pm";
  }
  else {
    parsedHour = addZeroToNumber(hour);
  }
  let parsedMinute = addZeroToNumber(minute);
  return `${parsedHour}:${parsedMinute}${suffix}`;
}


// Converts a time object { hours, minutes } to a decimal number between 0 and 24, or a whole number of minutes
export function timeAsNumber(time, inMinutes = false) {
  return inMinutes ? time.hours * 60 + time.minutes : time.hours + (time.minutes / 60);
}

// Converts a value in minutes to a time object { hours, minutes }
export function numberAsTime(value) {
  let minutes = value % 60;
  return { hours: Math.round((value - minutes) / 60), minutes };
}


// Downloads a file to the user's computer
export function downloadTextFile(filename, text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


export function habitComplete(id, data, isFromData = false) {
  let habitData = userData.habits[id];
  // Checkboxes
  if (habitData.format === "Checkbox") {
    return data;
  }
  // Checklist
  if (habitData.format === "Checklist") {
    if (isFromData) {
      return data.every((item) => item);
    }
    return data.every((item) => item.value);
  }
  // Number
  if (habitData.format === "Number") {
    let num = parseInt(isFromData ? data : data.value);
    let target = habitData.numberAmount;
    if (habitData.limit === "At least") {
      return num >= target;
    }
    if (habitData.limit === "No more than") {
      return num <= target;
    }
    if (habitData.limit === "Exactly") {
      return num === target;
    }
  }
  return false;
}