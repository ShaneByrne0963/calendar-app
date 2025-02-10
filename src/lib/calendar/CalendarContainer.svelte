<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Calendar from "./Calendar.svelte";
  import Schedule from "./Schedule.svelte";
  import {
    userData,
    calendarData,
    mDisplay,
    wDisplay,
  } from "../../shared.svelte";
  import DateChanger from "./DateChanger.svelte";
  import DateFormat from "./DateFormat.svelte";
  import ToolTip from "../global/ToolTip.svelte";

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
    <div id="calendar-navigation">
      <DateChanger direction={-1} />
      <div id="date-label">
        {calendarData.format === "weekly"
          ? `${weekData[0].getDate()} ${months[weekData[0].getMonth()]} ${weekData[0].getFullYear()} - ${weekData[6].getDate()} ${months[weekData[6].getMonth()]} ${weekData[6].getFullYear()}`
          : `${months[mDisplay.month]} ${mDisplay.year}`}
      </div>
      <DateChanger direction={1} />
    </div>
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
  </div>
  {#if calendarData.format === "weekly"}
    <Schedule dates={weekData} hourFormat={hourPreference} />
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
