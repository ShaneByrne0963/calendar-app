<script lang="ts">
  let { month, year, selectedDate, handleDateClick } = $props();

  interface dateInfo {
    date: number;
    class: string;
  }

  let days: dateInfo[] = $derived.by(() => {
    let arr: dateInfo[] = [];
    // Find the date of the first day of the month
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0).getDate();

    // Find which day the first of this month lands on, with 0 being Monday and 6 being Sunday
    let startDate = firstDay.getDay() - 1;

    if (startDate < 0) {
      startDate += 7;
    }

    // Add each date cell to the calendar
    let selectedOnDisplay =
      selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    let today = new Date();
    let todayOnDisplay =
      today.getMonth() === month && today.getFullYear() === year;
    for (let i = 1; i <= 42; i++) {
      let currentDay = i - startDate;
      let dateData = {
        date: 0,
        class: "day flex align-items-start",
      };

      // Get the background color of the date
      dateData.class +=
        selectedOnDisplay && selectedDate.getDate() === currentDay
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
    padding: 2px;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-300);
    position: relative;

    &.blank {
      cursor: default;
    }

    &.blank::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-stone-200);
    }
  }
</style>
