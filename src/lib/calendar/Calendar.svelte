<script lang="ts">
  let { month, year } = $props();

  let days: number[] = $derived.by(() => {
    let arr: number[] = [];
    // Find the date of the first day of the month
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0).getDate();

    // Find which day the first of this month lands on, with 0 being Monday and 6 being Sunday
    let startDate = firstDay.getDay() - 1;

    if (startDate < 0) {
      startDate += 7;
    }

    // Add each date cell to the calendar
    for (let i = 1; i <= 42; i++) {
      if (i >= startDate && i - startDate <= lastDay) {
        arr.push(i - startDate);
      } else {
        arr.push(0);
      }
    }
    return arr;
  });
</script>

<div id="calendar">
  {#each days as day}
    <div class="day {day === 0 ? 'bg-indigo-100' : ''}">
      {#if day > 0}
        {day}
      {/if}
    </div>
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
    text-align: right;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
    border: 1px solid var(--color-indigo-200);
  }
</style>
