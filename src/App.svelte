<script lang="ts">
  import Calendar from "./lib/calendar/Calendar.svelte";
  import Menu from "./lib/menu/Menu.svelte";
</script>

<div id="container">
  <Menu />
  <Calendar />
</div>

<style>
  #container {
    display: grid;
    grid-template-columns: auto 100vh;
    padding: 0.75em;
  }
</style>
