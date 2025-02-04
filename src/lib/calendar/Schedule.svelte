<script lang="ts">
  import HourMarkings from "./HourMarkings.svelte";

  let days = new Array(7);
</script>

<div id="schedule">
  <HourMarkings extrude={true} />
  {#each days}
    <div class="day"></div>
  {/each}
</div>

<style>
  #schedule {
    margin-left: 3em;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    position: relative;
  }

  .day {
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--color-stone-300);
  }
</style>
