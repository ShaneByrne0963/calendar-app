<script lang="ts">
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import Menu from "./lib/menu/Menu.svelte";
</script>

<div id="container" class="bg-neutral text-white">
  <Menu />
  <CalendarContainer />
</div>

<style>
  #container {
    display: grid;
    padding: 0.75em;
  }
</style>
