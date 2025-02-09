<script>
  import { compareDates, dateToInputValue } from "../../helpers";
  import { calendarData, mDisplay, userData } from "../../shared.svelte";
  import ScheduleSlot from "./ScheduleSlot.svelte";
  let { data, index } = $props();

  let dayClass = $derived.by(() => {
    let val = "day";

    let isSelected = compareDates(data.date, calendarData.selected) === "Equal";
    let isToday = compareDates(data.date, new Date()) === "Equal";

    val += isSelected ? " selected" : "";
    val += isToday ? " today" : "";

    return val;
  });

  let userActivities = $derived.by(() => {
    let key = dateToInputValue(data.date);

    if (key in userData.calendar) {
      return userData.calendar[key].userEntered;
    }
    return [];
  });

  function handleDateClick() {
    calendarData.selected = data.date;
    // Update the month display to easily get to the selected date in the other format
    mDisplay.set(calendarData.selected);
  }

  function onmouseenter() {
    calendarData.itemAddData.day = index;
  }

  function onmouseleave() {
    if (calendarData.itemAddData.day === index) {
      calendarData.itemAddData.day = -1;
    }
  }
</script>

<button
  class={dayClass}
  aria-label="Select Day"
  onclick={handleDateClick}
  {onmouseenter}
  {onmouseleave}
>
  {#each data.fixedActivities as activity}
    <ScheduleSlot
      title={activity.name}
      start={activity.startTime}
      end={activity.endTime}
      isDuration={false}
    ></ScheduleSlot>
  {/each}
  {#each userActivities as activity}
    <ScheduleSlot
      title={activity.title}
      start={activity.startTime}
      end={activity.duration}
    ></ScheduleSlot>
  {/each}
</button>

<style>
  .day {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;
    cursor: default;
  }
</style>
