<script lang="ts">
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import ItemDragging from "./lib/calendar/ItemDragging.svelte";
  import ColorPicker from "./lib/inputs/ColorPicker.svelte";
  import Menu from "./lib/menu/Menu.svelte";
  import ToastContainer from "./lib/Toasts/ToastContainer.svelte";
  import { userData, calendarData, menuData } from "./shared.svelte";

  const hourPreference = userData.preferences.timeFormat;
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
