<script lang="ts">
  import HourMarkings from "./HourMarkings.svelte";
  let { data, selectedDate, handleDateClick } = $props();

  let days = $derived.by(() => {
    let arr: string[] = [];

    let today = new Date();

    for (let day of data) {
      let dayClass = "day";
      let month = day.getMonth();
      let year = day.getFullYear();
      let currentDay = day.getDate();

      let isSelected =
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year &&
        selectedDate.getDate() === currentDay;
      let isToday =
        today.getMonth() === month &&
        today.getFullYear() === year &&
        today.getDate() === currentDay;

      dayClass += isSelected ? " selected" : "";
      dayClass += isToday ? " today" : "";

      arr.push(dayClass);
    }

    return arr;
  });
</script>

<div id="schedule">
  <HourMarkings extrude={true} />
  {#each days as day, i}
    <button
      class={day}
      data-date={data[i].getDate()}
      aria-label="Select Day"
      onclick={handleDateClick}
    ></button>
  {/each}
</div>

<style>
  #schedule {
    margin-left: 3em;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    position: relative;
  }

  .day {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-300);
    position: relative;

    /* Allow the hour marks to appear over the day */
    &.today {
      z-index: -2;
    }
  }
</style>
