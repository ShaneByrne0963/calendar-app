<script lang="ts">
  import {
    compareDates,
    dateToInputValue,
    setSubmenu,
  } from "../../../../helpers";
  import { calendarData, userData } from "../../../../shared.svelte";
  import DateController from "../../../calendar/DateController.svelte";
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";
  import JournalList from "./JournalList.svelte";
  import AddJournalInputs from "../add/AddJournalInputs.svelte";

  let { handleBack } = $props();

  let selectedDate = $state(new Date());

  let text = $derived.by(() => {
    const date = dateToInputValue(selectedDate);
    if (date in userData.journal) {
      return userData.journal[date].split("\n");
    }
    return [];
  });

  let today = $derived(
    compareDates(calendarData.today, selectedDate) === "Equal"
  );

  let todaysLog = $derived.by(() => {
    let key = dateToInputValue(new Date());
    if (key in userData.journal) {
      return userData.journal[key];
    }
    return "";
  });

  function onDateChange(direction: 1 | -1) {
    if (
      direction === -1 ||
      compareDates(selectedDate, calendarData.today) === "Before"
    ) {
      selectedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + direction
      );
    }
  }

  function addItem() {
    setSubmenu(AddJournalInputs, { todaysLog });
  }

  // Allows the user to quickly select a day's journal by clicking the calendar
  function calendarClick(date: Date) {
    if (compareDates(new Date(), date) !== "Before") {
      selectedDate = date;
    }
  }
  calendarData.updateJournal = calendarClick;

  // Also remove the journal selected day update when the user exits the journal menu
  function customBack() {
    calendarData.updateJournal = null;
    handleBack();
  }
</script>

<Submenu handleBack={customBack} contentComponent={JournalList}>
  <SubmenuHeading text="Journal">
    <button class="btn btn-sm btn-secondary" onclick={addItem}>
      {#if todaysLog}Edit
      {:else}+ Write
      {/if}
    </button>
  </SubmenuHeading>
  <div id="journal-list">
    <DateController
      dateLength="d"
      startDate={selectedDate}
      {onDateChange}
      rightDisabled={compareDates(selectedDate, calendarData.today) !==
        "Before"}
    ></DateController>
    <div class="journal-content">
      {#if text.length > 0}
        <div class="mt-6">
          {#each text as p, i}
            {p}
            {#if i < text.length - 1}
              <br />
            {/if}
          {/each}
        </div>
      {:else}
        <div class="submenu-center">
          You have no journal entry for
          {#if today}
            today
            <div class="py-1"></div>
            <button class="btn btn-secondary" onclick={addItem}>+ Add</button>
          {:else}
            this day
          {/if}
        </div>
      {/if}
    </div>
  </div>
</Submenu>

<style>
  #journal-list {
    height: auto-fill;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .journal-content:has(.submenu-center) {
    height: 100%;
  }
</style>
