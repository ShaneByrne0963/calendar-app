<script lang="ts">
  import { calendarData, wDisplay, mDisplay } from "../../shared.svelte";

  interface dateInfo {
    date: number;
    class: string;
  }

  let days: dateInfo[] = $derived.by(() => {
    let arr: dateInfo[] = [];
    // Find the date of the first day of the mDisplay.month
    let firstDay = new Date(mDisplay.year, mDisplay.month, 1);
    let lastDay = new Date(mDisplay.year, mDisplay.month + 1, 0).getDate();

    // Find which day the first of this mDisplay.month lands on, with 0 being Monday and 6 being Sunday
    let startDate = firstDay.getDay() - 1;

    if (startDate < 0) {
      startDate += 7;
    }

    // Add each date cell to the calendar
    let selectedOnDisplay =
      calendarData.selected.getMonth() === mDisplay.month &&
      calendarData.selected.getFullYear() === mDisplay.year;
    let today = new Date();
    let todayOnDisplay =
      today.getMonth() === mDisplay.month &&
      today.getFullYear() === mDisplay.year;
    for (let i = 1; i <= 42; i++) {
      let currentDay = i - startDate;
      let dateData = {
        date: 0,
        class: "day flex align-items-start",
      };

      // Get the background color of the date
      dateData.class +=
        selectedOnDisplay && calendarData.selected.getDate() === currentDay
          ? " selected"
          : "";
      dateData.class +=
        todayOnDisplay && today.getDate() === currentDay ? " today" : "";

      // Find the correct date number for the current cell
      if (i > startDate && currentDay <= lastDay) {
        dateData.date = currentDay;
      } else {
        dateData.class += " blank";
      }
      arr.push(dateData);
    }
    return arr;
  });

  function handleDateClick() {
    let day = parseInt(this.querySelector(".date-number").innerText);
    calendarData.selected = new Date(mDisplay.year, mDisplay.month, day);
    wDisplay.set(calendarData.selected);
  }
</script>

<div id="calendar">
  {#each days as day}
    <button class={day.class} onclick={day.date ? handleDateClick : null}>
      {#if day.date}
        <div class="date-number w-full text-right">{day.date}</div>
      {/if}
    </button>
  {/each}
</div>

<style>
  #calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .day {
    width: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;

    &.blank {
      cursor: default;
      background-color: black;
      border-color: var(--color-stone-700);
    }
  }
</style>
