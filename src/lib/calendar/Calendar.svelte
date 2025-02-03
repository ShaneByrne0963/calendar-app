<script lang="ts">
  import CalendarHeader from "./CalendarHeader.svelte";
  let days: number[] = [];

  // Find the date of the first day of this month
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  // Find which day the first of this month lands on, with 0 being Monday and 6 being Sunday
  let startDate = firstDay.getDay() - 1;

  if (startDate < 0) {
    startDate += 7;
  }

  // Add each date cell to the calendar
  for (let i = 1; i <= 42; i++) {
    if (i >= startDate && i - startDate <= lastDay) {
      days.push(i - startDate);
    } else {
      days.push(0);
    }
  }
</script>

<CalendarHeader>
  <div id="calendar">
    {#each days as day}
      <div
        class="day border-1 border-indigo-200 {day === 0
          ? 'bg-indigo-100'
          : ''}"
      >
        {#if day > 0}
          {day}
        {/if}
      </div>
    {/each}
  </div>
</CalendarHeader>

<style>
  #calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .day {
    width: 100%;
    padding: 2px;
    text-align: right;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
  }
</style>
