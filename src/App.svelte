<script lang="ts">
  import CalendarContainer from "./lib/calendar/CalendarContainer.svelte";
  import Menu from "./lib/menu/Menu.svelte";
</script>

<div id="container">
  <Menu />
  <CalendarContainer />
</div>

<style>
  #container {
    display: grid;
    padding: 0.75em;
  }
</style>
