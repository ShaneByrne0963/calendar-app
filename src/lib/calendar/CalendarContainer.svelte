<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Graphic from "../Graphic.svelte";
  import Calendar from "./Calendar.svelte";
  import Schedule from "./Schedule.svelte";

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

  function handleFormatChange() {
    format = this.id;
  }
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel">
      <div class="tooltip tooltip-bottom" data-tip="Schedule">
        <button
          id="weekly"
          class="btn btn-square{format === 'weekly' ? ' btn-secondary' : ''}"
          aria-label="Switch to Weekly Schedule"
          onclick={handleFormatChange}
        >
          <Graphic
            width="6"
            height="6"
            pathWidth={448}
            path={"weeklyView"}
            fill={format === "weekly" ? "#ffffff" : "#000000"}
          ></Graphic>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Calendar">
        <button
          id="monthly"
          class="btn btn-square{format === 'monthly' ? ' btn-secondary' : ''}"
          aria-label="Switch to Monthly Calendar"
          onclick={handleFormatChange}
        >
          <Graphic
            width="6"
            height="6"
            pathWidth={448}
            path={"monthlyView"}
            fill={format === "monthly" ? "#ffffff" : "#000000"}
          ></Graphic>
        </button>
      </div>
    </div>
    <div id="calendar-navigation">
      <button
        aria-label="Go to the previous month"
        class="btn btn-sm"
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
        aria-label="Go to the next month"
        class="btn btn-sm"
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
    <div id="date-headings" class="border-1 text-white bg-primary">
      {#each days as day}
        <div class="ml-1">{first3(day)}</div>
      {/each}
    </div>
  </div>
  {#if format === "weekly"}
    <Schedule />
  {:else}
    <Calendar
      month={mDisplayMonth}
      year={mDisplayYear}
      {selectedDate}
      {handleDateClick}
    />
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
