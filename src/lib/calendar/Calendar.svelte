<script lang="ts">
  import CalendarHeader from "./CalendarHeader.svelte";
  let days = new Array(42);
</script>

<CalendarHeader>
  <div id="calendar">
    {#each days}
      <div class="day border-1 border-indigo-100"></div>
    {/each}
  </div>
</CalendarHeader>

<style>
  #calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .day {
    width: 100%;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
  }
</style>
