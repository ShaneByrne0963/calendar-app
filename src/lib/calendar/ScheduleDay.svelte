<script>
  import { compareDates } from "../../helpers";
  import { calendarData, mDisplay } from "../../shared.svelte";
  import ScheduleSlot from "./ScheduleSlot.svelte";
  let { data } = $props();

  let date = data.date.getDate();
  let month = data.date.getMonth();
  let year = data.date.getFullYear();

  let dayClass = $derived.by(() => {
    let val = "day";

    let isSelected = compareDates(data.date, calendarData.selected) === "Equal";
    let isToday = compareDates(data.date, new Date()) === "Equal";

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
  {#each data.fixedActivities as activity}
    <ScheduleSlot name={activity.name}></ScheduleSlot>
  {/each}
</button>

<style>
  .day {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;
  }
</style>
