<script lang="ts">
  import { dateToInputValue } from "../../helpers";
  import {
    calendarData,
    mDisplay,
    userData,
    wDisplay,
  } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";

  let { className, date } = $props();
  let currentDate = $derived(new Date(mDisplay.year, mDisplay.month, date));

  function handleDateClick(e: Event) {
    if ((e.target as HTMLElement).closest(".day-journal")) {
      // If the journal list is selected, show the journal for the selected day
      calendarData.updateJournal?.(currentDate);
      return;
    }

    calendarData.selected = currentDate;
    wDisplay.set(calendarData.selected);
  }

  let hasJournal = $derived.by(() => {
    let key = dateToInputValue(currentDate);
    return key in userData.journal;
  });
</script>

<button class={className} onclick={date ? handleDateClick : null}>
  {#if date}
    <div class="date-number">{date}</div>
  {/if}
  <div class="day-content"></div>
  <div class="day-icons">
    {#if hasJournal}
      <ToolTip text="Has Journal Entry">
        <div class="day-journal btn btn-square btn-xs btn-accent">
          <Graphic width={16} height={16} path="book" fill="black"></Graphic>
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

    .date-number {
      position: absolute;
      top: 2px;
      right: 4px;
    }

    .day-icons {
      display: flex;
    }
  }
</style>
