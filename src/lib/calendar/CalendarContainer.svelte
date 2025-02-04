<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Graphic from "../Graphic.svelte";
  import Calendar from "./Calendar.svelte";

  let today = new Date();

  let format: "weekly" | "monthly" = $state("monthly");
  let mDisplayMonth = $state(today.getMonth());
  let mDisplayYear = $state(today.getFullYear());

  function handleDateDisplayChange(direction: 1 | -1) {
    mDisplayMonth += direction;
    if (mDisplayMonth < 0) {
      mDisplayMonth += 12;
      mDisplayYear -= 1;
    } else if (mDisplayMonth > 11) {
      mDisplayMonth -= 12;
      mDisplayYear += 1;
    }
  }
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel">
      <button class="btn btn-square" aria-label="Switch to Weekly Schedule">
        <Graphic width="6" height="6" pathWidth={448} path={"weeklyView"}
        ></Graphic>
      </button>
      <button class="btn btn-square" aria-label="Switch to Monthly Calendar">
        <Graphic width="6" height="6" pathWidth={448} path={"monthlyView"}
        ></Graphic>
      </button>
    </div>
    <div id="calendar-navigation">
      <button
        aria-label="Previous"
        class="cursor-pointer"
        onclick={() => handleDateDisplayChange(-1)}
      >
        <svg
          class="h-6 w-6 fill-current md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          ></path></svg
        >
      </button>
      <div id="date-label">{months[mDisplayMonth]} {mDisplayYear}</div>
      <button
        aria-label="Next"
        class="cursor-pointer"
        onclick={() => handleDateDisplayChange(1)}
      >
        <svg
          class="h-6 w-6 fill-current md:h-8 md:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          ></path></svg
        >
      </button>
    </div>
    <div id="date-headings" class="border-1 border-blue-300 bg-blue-200">
      {#each days as day}
        <div>{first3(day)}</div>
      {/each}
    </div>
  </div>
  {#if format === "monthly"}
    <Calendar month={mDisplayMonth} year={mDisplayYear}></Calendar>
  {/if}
</div>

<style>
  #calendar-container {
    height: calc(100vh - 1.5em);
    display: grid;
    grid-template-rows: 6.6em 1fr;
  }

  #calendar-header {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  #date-headings {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  #calendar-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #date-label {
    min-width: 30%;
    text-align: center;
  }

  svg {
    width: 3em;
    aspect-ratio: 1 / 1;
  }
</style>
