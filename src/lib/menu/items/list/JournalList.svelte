<script lang="ts">
  import { compareDates, dateToInputValue } from "../../../../helpers";
  import { calendarData, userData } from "../../../../shared.svelte";
  import { days } from "../../../../types";
  import DateController from "../../../calendar/DateController.svelte";
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";

  let { handleBack } = $props();

  let selectedDate = $state(new Date());

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

  let text = $derived.by(() => {
    const date = dateToInputValue(selectedDate);
    if (date in userData.journal) {
      return userData.journal[date];
    }
    return "";
  });
</script>

<Submenu {handleBack}>
  <SubmenuHeading text="Journal"></SubmenuHeading>
  <div id="journal-list">
    <DateController
      dateLength="d"
      startDate={selectedDate}
      {onDateChange}
      rightDisabled={compareDates(selectedDate, calendarData.today) !==
        "Before"}
    ></DateController>
    <div class="journal-content">
      {#if text}
        {text}
      {:else}
        <div class="submenu-center">
          You have no journal entry for
          {#if compareDates(calendarData.today, selectedDate) === "Equal"}
            today
            <div class="py-1"></div>
            <button class="btn btn-secondary">+ Add</button>
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
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .journal-content {
    height: 100%;
    overflow-y: auto;
  }
</style>
