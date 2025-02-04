<script lang="ts">
  import { calendarData, mDisplay, wDisplay } from "../../shared.svelte";
  import HourMarkings from "./HourMarkings.svelte";
  let { data } = $props();

  let days = $derived.by(() => {
    let arr: string[] = [];

    let today = new Date();

    for (let day of data) {
      let dayClass = "day";
      let month = day.getMonth();
      let year = day.getFullYear();
      let currentDay = day.getDate();

      let isSelected =
        calendarData.selected.getMonth() === month &&
        calendarData.selected.getFullYear() === year &&
        calendarData.selected.getDate() === currentDay;
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

  function handleDateClick() {
    let day = parseInt(this.getAttribute("data-date"));
    let month = parseInt(this.getAttribute("data-month"));
    let year = parseInt(this.getAttribute("data-year"));
    calendarData.selected = new Date(year, month, day);
    // Update the month display to easily get to the selected date in the other format
    mDisplay.set(calendarData.selected);
  }
</script>

<div id="schedule">
  <HourMarkings extrude={true} />
  {#each days as day, i}
    <button
      class={day}
      data-date={data[i].getDate()}
      data-month={data[i].getMonth()}
      data-year={data[i].getFullYear()}
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
  }
</style>
