<script lang="ts">
  import { calendarData } from "../../shared.svelte";

  let top = $derived((calendarData.hours + calendarData.minutes / 60) / 24);
</script>

<div
  class="time-marker bg-accent shadow-lg"
  style="top: calc(100% * {top});"
></div>

<style>
  .time-marker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transform: translate(0, -1px);
    z-index: 2;

    &::after {
      content: "";
      display: block;
      width: 1em;
      height: 1em;
      background-color: inherit;
      position: absolute;
      top: -0.48em;
      left: -0.5em;
      border-radius: 50%;
      box-shadow: inherit;
    }
  }
</style>
