<script lang="ts">
  import { compareDates, dateToInputValue } from "./helpers.js";
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import ItemDragging from "./lib/calendar/ItemDragging.svelte";
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

  // Add habit data to the current day if none exists
  let todayKey = dateToInputValue(new Date());
  if (!(todayKey in userData.calendar)) {
    userData.calendar[todayKey] = {
      habitData: {},
    };
  }
</script>

<div
  id="container"
  class="bg-stone-900 text-white {hourPreference}"
  style="--hidden-morning-hours: {userData.preferences.hiddenMorningHours}"
>
  <Menu />
  <CalendarContainer />
  {#if calendarData.itemAdding}
    <ItemDragging></ItemDragging>
  {/if}
  {#if menuData.clickWindow.component}
    <menuData.clickWindow.component></menuData.clickWindow.component>
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
