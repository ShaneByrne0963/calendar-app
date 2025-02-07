<script lang="ts">
  let { data } = $props();
</script>

<div
  class="slot bg-secondary"
  style={`top: calc((100% / 24) * ${data.fixedStartTime}); height: calc((100% / 24) * ${data.fixedEndTime - data.fixedStartTime})`}
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
  }
</style>
