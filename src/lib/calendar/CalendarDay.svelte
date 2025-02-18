<script lang="ts">
  import { dateToInputValue, openSubmenu } from "../../helpers.js";
  import {
    calendarData,
    mDisplay,
    userData,
    wDisplay,
  } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import JournalList from "../menu/items/list/JournalList.svelte";

  let { className, date, data, dayInfo } = $props();
  let currentDate = $derived(new Date(mDisplay.year, mDisplay.month, date));

  let specialDays = $derived.by(() => {
    let arr = [];
    // January Holidays
    if (mDisplay.month === 0) {
      if (date === 1) arr.push("New Year's Day");
    }

    // February Holidays
    else if (mDisplay.month === 1) {
      if (date === 14) arr.push("Valentine's Day");
    }

    // March Holidays
    else if (mDisplay.month === 2) {
      if (date === 17) arr.push("St. Patrick's Day");
    }

    // October Holidays
    else if (mDisplay.month === 9) {
      if (date === 31) arr.push("Halloween");
    }

    // December Holidays
    else if (mDisplay.month === 11) {
      if (date === 24) arr.push("Christmas Eve");
      else if (date === 25) arr.push("Christmas Day");
      else if (date === 26) arr.push("St. Stephens' Day");
      else if (date === 31) arr.push("New Year's Eve");
    }

    // Easter
    if (data.easter[1] === mDisplay.month && data.easter[2] === date) {
      arr.push("Easter Sunday");
    }
    // Ash Wednesday
    let ashWednesday = new Date(
      data.easter[0],
      data.easter[1],
      data.easter[2] - 46
    );
    if (
      mDisplay.month === ashWednesday.getMonth() &&
      date === ashWednesday.getDate()
    ) {
      arr.push("Ash Wednesday");
    }

    return arr;
  });

  let hasJournal = $derived.by(() => {
    let key = dateToInputValue(currentDate);
    return key in userData.journal;
  });

  let toolTipDirection = $derived.by(() => {
    if (dayInfo.day === 0) {
      return "right";
    }
    if (dayInfo.day === 6) {
      return "left";
    }
    return "bottom";
  });

  function handleDateClick(e: Event) {
    if ((e.target as HTMLElement).closest(".day-journal")) {
      // If the journal list is selected, show the journal for the selected day
      openSubmenu(JournalList, { selectedDate: currentDate });
      return;
    }

    calendarData.selected = currentDate;
    wDisplay.set(calendarData.selected);
  }
</script>

<button class={className} onclick={date ? handleDateClick : null}>
  {#if date}
    <div class="day-header text-left">
      <div>
        {#if specialDays.length}
          <p class="badge badge-outline badge-sm badge-accent">
            {specialDays[0]}
            {#if specialDays.length > 1}
              + {specialDays.length - 1}{/if}
          </p>
        {/if}
      </div>
      <p>{date}</p>
    </div>
  {/if}
  <div class="day-content"></div>
  <div class="day-icons">
    {#if hasJournal}
      <ToolTip text="Has Journal Entry" direction={toolTipDirection}>
        <div class="day-journal btn btn-square btn-xs btn-accent">
          <Graphic width={16} height={16} path="book" fill="black"></Graphic>
        </div>
      </ToolTip>
    {/if}
    {#if "habitData" in dayInfo && Object.keys(dayInfo.habitData).length > 0}
      <ToolTip text="Habits" direction={toolTipDirection}>
        <div class="day-journal btn btn-square btn-xs btn-accent">
          <Graphic width={16} height={16} path="success" fill="black"></Graphic>
        </div>
      </ToolTip>
    {/if}
  </div>
</button>

<style>
  .day {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-400);
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;

    &.blank {
      cursor: default;
      background-color: black;
      border-color: var(--color-stone-700);
    }

    .day-header {
      display: grid;
      grid-template-columns: 1fr auto;
    }

    .day-icons {
      display: flex;
      gap: 4px;
    }
  }
</style>
