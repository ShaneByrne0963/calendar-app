/**
 * Gets the first 3 letters of a string
 * @param val The value to be processed
 * @returns The first 3 letters
 */
export function first3(val: string) {
  return val.slice(0, 3);
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