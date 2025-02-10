<script lang="ts">
  let { title, start, end, isDuration = true } = $props();

  let pStart = $derived(start.hours + start.minutes / 60);
  let pEnd = $derived(end.hours + end.minutes / 60);
</script>

<div
  class="slot bg-accent text-black"
  style={`top: calc((100% / 24) * ${pStart}); height: calc((100% / 24) * ${isDuration ? pEnd : pEnd - pStart})`}
>
  {title}
</div>

<style>
  .slot {
    position: absolute;
    left: 50%;
    width: 95%;
    transform: translate(-50%, 0);
    border-radius: 16px;
    z-index: 1;
    cursor: pointer;
  }
</style>
