import { months } from "./types"

/**
 * Gets the first 3 letters of a string
 * @param val The value to be processed
 * @returns The first 3 letters
 */
export function first3(val: string) {
  return val.slice(0, 3);
}

// Converts a possible proxy array into an array that can be used
export function removeProxy(val: any) {
  if (val[0]) {
    return val;
  }
  let result: number[] = [];
  let storage: { key: string, value: number }[] = [];
  for (let [key, value] of Object.entries(val)) {
    let number = value as number;
    if (parseInt(key) === result.length) {
      result.push(number);
    }
    else {
      storage.push({ key, value: number });
    }
  }
  return result.push(...storage.map(item => item.value));
}

// Converts a date to a string format that can be used in an input value
export function dateToInputValue(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}

// Converts a date format received from a date input to a user-friendly date format
export function inputToDateDisplay(date: string) {
  let dates = date.split("-").map(val => parseInt(val));

  return arrayToDateDisplay(dates);
}

// Converts a date format as an array [y, m, d] input to a user-friendly date format
export function arrayToDateDisplay(dates: number[]) {
  return `${dates[2]} ${first3(months[dates[1] - 1])} ${dates[0]}`;
}

// Converts a date object to an array of numbers [y, m, d]
export function convertDateToArray(date: Date) {
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}

// Converts a date input to a [y, m, d] array
export function inputToArray(input: string) {
  let result = input.split("-").map((item) => parseInt(item));
  // Subtract one month to account for the 0 start
  result[1] -= 1;
  return result
}

// Compares two dates, returning if the first date is before, the same as or after the second
export function compareDates(date1: Date | number[], date2: Date | number[]) {
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

// Initialize a submenu state. Unfortunately no other way to do this other than boilerplate code
/*
let submenu = $state({
  component: null,
  props: {},
  closing: false,
  handleBack: () => {
    submenu.closing = true;
  },
  handleTransitionEnd: (event: TransitionEvent) => {
    if (submenu.closing && event.propertyName === "left") {
      submenu.component = null;
      submenu.props = {};
      submenu.closing = false;
    }
  },
});
*/