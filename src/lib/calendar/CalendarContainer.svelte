<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Graphic from "../Graphic.svelte";
  import Calendar from "./Calendar.svelte";
  import Schedule from "./Schedule.svelte";
  import { calendarData, mDisplay, wDisplay } from "../../shared.svelte";

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  mDisplay.month = month;
  mDisplay.year = year;

  wDisplay.set(today);
  let weekData = $derived.by(() => {
    let arr: Date[] = [];

    for (let i = 0; i < 7; i++) {
      arr.push(new Date(wDisplay.year, wDisplay.month, wDisplay.day + i));
    }
    return arr;
  });

  function handleDateDisplayChange(direction: 1 | -1) {
    if (calendarData.format === "weekly") {
      let newWeek = new Date(
        wDisplay.year,
        wDisplay.month,
        wDisplay.day + 7 * direction
      );
      wDisplay.set(newWeek);
    } else {
      mDisplay.month += direction;
      if (mDisplay.month < 0) {
        mDisplay.month += 12;
        mDisplay.year -= 1;
      } else if (mDisplay.month > 11) {
        mDisplay.month -= 12;
        mDisplay.year += 1;
      }
    }
  }

  function handleFormatChange() {
    calendarData.format = this.id;
  }
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel">
      <div class="tooltip tooltip-bottom" data-tip="Schedule">
        <button
          id="weekly"
          class="btn btn-square{calendarData.format === 'weekly'
            ? ' btn-accent'
            : ''}"
          aria-label="Switch to Weekly Schedule"
          onclick={handleFormatChange}
        >
          <Graphic width="24" height="24" pathWidth={448} path={"weeklyView"}
          ></Graphic>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Calendar">
        <button
          id="monthly"
          class="btn btn-square{calendarData.format === 'monthly'
            ? ' btn-accent'
            : ''}"
          aria-label="Switch to Monthly Calendar"
          onclick={handleFormatChange}
        >
          <Graphic width="24" height="24" pathWidth={448} path={"monthlyView"}
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
          width="24"
          height="24"
          pathWidth={24}
          pathHeight={24}
          path={"back"}
          extraClass="fill-current"
        ></Graphic>
      </button>
      <div id="date-label">
        {calendarData.format === "weekly"
          ? `${weekData[0].getDate()} ${months[weekData[0].getMonth()]} ${weekData[0].getFullYear()} - ${weekData[6].getDate()} ${months[weekData[6].getMonth()]} ${weekData[6].getFullYear()}`
          : `${months[mDisplay.month]} ${mDisplay.year}`}
      </div>
      <button
        aria-label="Go to the next month"
        class="btn btn-sm"
        onclick={() => handleDateDisplayChange(1)}
      >
        <Graphic
          width="24"
          height="24"
          pathWidth={24}
          pathHeight={24}
          path={"forward"}
          extraClass="fill-current"
        ></Graphic>
      </button>
    </div>
    <div id="date-headings" class="border-1 text-white bg-primary">
      {#each days as day, i}
        <div class="ml-1">
          {first3(day)}
          {calendarData.format === "weekly"
            ? ` ${weekData[i].getDate()} ${first3(months[weekData[i].getMonth()])}`
            : ""}
        </div>
      {/each}
    </div>
  </div>
  {#if calendarData.format === "weekly"}
    <Schedule data={weekData} />
  {:else}
    <Calendar />
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
