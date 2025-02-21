<script>
  import { compareDates, dateToInputValue } from "../../helpers.js";
  import { calendarData, mDisplay, userData } from "../../shared.svelte";
  import ScheduleSlot from "./ScheduleSlot.svelte";
  import TimeMarker from "./TimeMarker.svelte";
  let { data, index } = $props();

  let dayClass = $derived.by(() => {
    let val = "day";

    let isSelected = compareDates(data.date, calendarData.selected) === "Equal";
    let isToday = compareDates(data.date, calendarData.today) === "Equal";

    val += isSelected ? " selected" : "";
    val += isToday ? " today" : "";
    val += userData.preferences.fitEntireSchedule ? " full" : "";

    return val;
  });

  let slots = $derived.by(() => {
    let amounts = {};
    let activities = [];

    let activityData = [...data.fixedActivities];
    let key = dateToInputValue(data.date);

    if (key in userData.calendar) {
      activityData.push(
        ...userData.calendar[key].userEntered.map((entry) => ({
          ...userData.activities[entry.id],
          ...entry,
          isDuration: true,
        }))
      );
    }

    for (let activity of activityData) {
      let newId = activity.id;
      if (newId in amounts) {
        newId += `-${amounts[newId]}`;
        amounts[newId]++;
      } else {
        amounts[newId] = 0;
      }
      activities.push({
        data: activity,
        key,
        id: newId,
        start: activity.startTime,
        end: activity.endTime,
        isDuration: "isDuration" in activity,
      });
    }
    return activities;
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
  {#each slots as slot}
    <ScheduleSlot day={index} date={data.date} {...slot}></ScheduleSlot>
  {/each}
  {#if dayClass.includes("today")}
    <TimeMarker {index}></TimeMarker>
  {/if}
</button>

<style>
  .day {
    height: calc(100% * 24 / (24 - var(--hidden-morning-hours)));
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;
    cursor: default;

    &.full {
      height: 100%;
    }
  }
</style>
