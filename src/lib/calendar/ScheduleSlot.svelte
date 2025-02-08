<script lang="ts">
  let { data, start, end } = $props();

  let pStart = $derived(start.hours + start.minutes / 60);
  let pEnd = $derived(end.hours + end.minutes / 60);
</script>

<div
  class="slot bg-accent text-black"
  style={`top: calc((100% / 24) * ${pStart}); height: calc((100% / 24) * ${pEnd - pStart})`}
>
  {data.name}
</div>

<style>
  .slot {
    position: absolute;
    left: 50%;
    width: 95%;
    transform: translate(-50%, 0);
    border-radius: 16px;
    z-index: 1;
  }
</style>
