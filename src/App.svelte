<script lang="ts">
  import { compareDates } from "./helpers";
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import ItemDragging from "./lib/calendar/ItemDragging.svelte";
  import ColorPicker from "./lib/inputs/ColorPicker.svelte";
  import Menu from "./lib/menu/Menu.svelte";
  import ToastContainer from "./lib/toasts/ToastContainer.svelte";
  import { userData, calendarData, menuData } from "./shared.svelte";

  const hourPreference = userData.preferences.timeFormat;

  function tick() {
    const now = new Date();

    // Change days when necessary
    if (compareDates(now, calendarData.today) !== "Equal") {
      calendarData.today = now;
    }
    calendarData.hours = now.getHours();
    calendarData.minutes = now.getMinutes();

    // Updates every 10 seconds
    setTimeout(tick, 10000);
  }
  tick();
</script>

<div id="container" class="bg-stone-900 text-white {hourPreference}">
  <Menu />
  <CalendarContainer />
  {#if calendarData.itemAdding}
    <ItemDragging></ItemDragging>
  {/if}
  {#if menuData.colorPicker.x >= 0}
    <ColorPicker></ColorPicker>
  {/if}
  <ToastContainer></ToastContainer>
</div>

<style>
  #container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 0.75em;
    overflow: hidden;
  }
</style>
