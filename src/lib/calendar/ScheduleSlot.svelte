<script lang="ts">
  let { data, start, end } = $props();
</script>

<div
  class="slot bg-accent text-black"
  style={`top: calc((100% / 24) * ${start}); height: calc((100% / 24) * ${end - start})`}
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
