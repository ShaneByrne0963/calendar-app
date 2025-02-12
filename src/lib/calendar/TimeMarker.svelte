<script lang="ts">
  import { calendarData } from "../../shared.svelte";

  let { index } = $props();

  let top = $derived((calendarData.hours + calendarData.minutes / 60) / 24);
</script>

<div
  class="time-marker bg-accent shadow-lg"
  style="top: calc(100% * {top});"
></div>
<div
  class="clock-marker bg-accent shadow-lg"
  style="top: calc(100% * {top}); left: calc(-{index * 100}% - {index * 2}px)"
></div>

<style>
  .time-marker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    transform: translate(0, -1px);
    z-index: 2;
  }
  .clock-marker {
    position: absolute;
    width: 12px;
    height: 12px;
    transform: translate(-6px, -6px);
    position: absolute;
    border-radius: 50%;
    z-index: 2;
  }
</style>
