<script lang="ts">
  let { id, day, data, start, end, isDuration = true } = $props();

  let pStart = $derived(start / 60);
  let pEnd = $derived(end / 60);
</script>

<div
  class="slot background col-{data.color} text-black"
  style={`top: calc((100% / 24) * ${pStart}); height: calc((100% / 24) * ${isDuration ? pEnd : pEnd - pStart})`}
>
  <div class="flex items-center justify-between">
    <span>{data.name}</span>
    {#if "attendance" in data}
      <input type="checkbox" class="checkbox checkbox-sm" />
    {/if}
  </div>
</div>

<style>
  .slot {
    position: absolute;
    left: 50%;
    width: 95%;
    transform: translate(-50%, 0);
    border-radius: 12px;
    z-index: 1;
    cursor: pointer;
    padding: 6px;
  }

  .checkbox-sm {
    border-color: black;
  }
</style>
