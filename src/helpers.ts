/**
 * Gets the first 3 letters of a string
 * @param val The value to be processed
 * @returns The first 3 letters
 */
export function first3(val: string) {
  return val.slice(0, 3);
}

// Converts a date to a string format that can be used in an input value
export function dateToInputValue(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
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