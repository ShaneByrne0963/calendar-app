<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Graphic from "../Graphic.svelte";
  import Calendar from "./Calendar.svelte";

  let today = new Date();

  let format: "weekly" | "monthly" = $state("monthly");
  let mDisplayMonth = $state(today.getMonth());
  let mDisplayYear = $state(today.getFullYear());
  let selectedDate = $state(today);

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

  function handleDateClick() {
    let day = parseInt(this.querySelector(".date-number").innerText);
    selectedDate = new Date(mDisplayYear, mDisplayMonth, day);
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
        <Graphic
          width="6"
          height="6"
          pathWidth={24}
          pathHeight={24}
          path={"back"}
          extraClass="fill-current"
        ></Graphic>
      </button>
      <div id="date-label">{months[mDisplayMonth]} {mDisplayYear}</div>
      <button
        aria-label="Next"
        class="cursor-pointer"
        onclick={() => handleDateDisplayChange(1)}
      >
        <Graphic
          width="6"
          height="6"
          pathWidth={24}
          pathHeight={24}
          path={"forward"}
          extraClass="fill-current"
        ></Graphic>
      </button>
    </div>
    <div id="date-headings" class="border-1 border-blue-300 bg-blue-200">
      {#each days as day}
        <div>{first3(day)}</div>
      {/each}
    </div>
  </div>
  {#if format === "monthly"}
    <Calendar
      month={mDisplayMonth}
      year={mDisplayYear}
      {selectedDate}
      {handleDateClick}
    ></Calendar>
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
</style>
