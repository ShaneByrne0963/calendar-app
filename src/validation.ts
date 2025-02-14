import {compareDates, inputToArray} from "./helpers.js";

export const inputFeedback = {
  required: "Please fill out this field",
  date: "Start date cannot be after end date",
  time: "Start time cannot be equal to end time",
  zeroDuration: "Duration cannot be zero",
}

// Returns a feedback message if an input is empty
export function handleRequired(input: {value: string, valid?: boolean}) {
  return input.value ? "" : inputFeedback.required;
}

// Returns a feedback message if a start date is entered after an end date
export function handleDateOrder(startDate: string, endDate: string) {
  return compareDates(inputToArray(startDate), inputToArray(endDate)) === "After" ? inputFeedback.date : "";
}