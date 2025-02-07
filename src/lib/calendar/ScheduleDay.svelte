<script>
  import { calendarData, mDisplay } from "../../shared.svelte";
  let { data, date, month, year } = $props();

  let dayClass = $derived.by(() => {
    let val = "day";

    let isSelected =
      calendarData.selected.getMonth() === month &&
      calendarData.selected.getFullYear() === year &&
      calendarData.selected.getDate() === date;
    let today = new Date();
    let isToday =
      today.getMonth() === month &&
      today.getFullYear() === year &&
      today.getDate() === date;

    val += isSelected ? " selected" : "";
    val += isToday ? " today" : "";

    return val;
  });

  function handleDateClick() {
    calendarData.selected = new Date(year, month, date);
    // Update the month display to easily get to the selected date in the other format
    mDisplay.set(calendarData.selected);
  }
</script>

<button class={dayClass} aria-label="Select Day" onclick={handleDateClick}>
</button>

<style>
  .day {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;
  }
</style>
