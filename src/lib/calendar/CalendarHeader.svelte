<script lang="ts">
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel"></div>
    <div id="calendar-navigation"></div>
    <div id="date-headings" class="border-1 border-blue-300 bg-blue-200">
      {#each days as day}
        <div>{day}</div>
      {/each}
    </div>
  </div>
  <slot />
</div>

<style>
  #calendar-container {
    height: calc(100vh - 1.5em);
    display: grid;
    grid-template-rows: 6.6em 1fr;
  }

  #calendar-header {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  #date-headings {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
</style>
