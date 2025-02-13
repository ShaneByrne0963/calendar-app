<script lang="ts">
  import { compareDates, dateToInputValue } from "../../../../helpers";
  import { calendarData, userData } from "../../../../shared.svelte";
  import DateController from "../../../calendar/DateController.svelte";
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";
  import AddJournalInputs from "../add/AddJournalInputs.svelte";

  let { handleBack } = $props();
  let submenu = $state({
    component: null,
    props: {},
    closing: false,
    handleBack: () => {
      submenu.closing = true;
    },
    handleTransitionEnd: (event: TransitionEvent) => {
      if (submenu.closing && event.propertyName === "left") {
        submenu.component = null;
        submenu.props = {};
        submenu.closing = false;
      }
    },
  });

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
      return userData.journal[date].split("\n");
    }
    return [];
  });

  let today = $derived(
    compareDates(calendarData.today, selectedDate) === "Equal"
  );

  function addItem() {
    submenu.component = AddJournalInputs;
    submenu.props = {};
  }
</script>

<Submenu {handleBack} {submenu}>
  <SubmenuHeading text="Journal">
    <button class="btn btn-sm btn-secondary" onclick={addItem}>+ Write</button>
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
