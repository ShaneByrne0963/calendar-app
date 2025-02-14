<script lang="ts">
  import { first3 } from "../../helpers.js";
  import { days, months } from "../../types";
  import Calendar from "./Calendar.svelte";
  import Schedule from "./Schedule.svelte";
  import {
    userData,
    calendarData,
    mDisplay,
    wDisplay,
  } from "../../shared.svelte";
  import DateFormat from "./DateFormat.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import DateController from "./DateController.svelte";

  const hourPreference = userData.preferences.timeFormat;
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
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel">
      <ToolTip text="Schedule">
        <DateFormat format="weekly" />
      </ToolTip>
      <ToolTip text="Calendar">
        <DateFormat format="monthly" />
      </ToolTip>
    </div>
    <DateController
      dateLength={calendarData.format[0]}
      startDate={calendarData.format === "weekly"
        ? weekData[0]
        : new Date(mDisplay.year, mDisplay.month, 1)}
      endDate={weekData[6]}
      onDateChange={handleDateDisplayChange}
    ></DateController>
  </div>
  <div id="calendar-main">
    <div id="date-headings" class="border-1 text-white bg-neutral">
      {#each days as day, i}
        <div class="ml-1">
          {first3(day)}
          {calendarData.format === "weekly"
            ? ` ${weekData[i].getDate()} ${first3(months[weekData[i].getMonth()])}`
            : ""}
        </div>
      {/each}
    </div>
    {#if calendarData.format === "weekly"}
      <Schedule dates={weekData} hourFormat={hourPreference} />
    {:else}
      <Calendar />
    {/if}
  </div>
</div>

<style>
  #calendar-container {
    height: calc(100vh - 1.5em);
    display: grid;
    grid-template-rows: 5.1em 1fr;
  }

  #calendar-header {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  #date-headings {
    height: 1.5em;
    position: sticky;
    right: 0;
    top: 0;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  #calendar-main {
    position: relative;
    overflow-y: auto;
  }
</style>
