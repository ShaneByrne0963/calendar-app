<script lang="ts">
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import Menu from "./lib/menu/Menu.svelte";
  import { userData } from "./shared.svelte";

  const hourPreference = userData.preferences.timeFormat;
</script>

<div id="container" class="bg-stone-900 text-white {hourPreference}">
  <Menu />
  <CalendarContainer />
</div>

<style>
  #container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 0.75em;
  }
</style>
