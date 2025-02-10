<script lang="ts">
  import Graphic from "../../global/Graphic.svelte";

  let { data, last = false } = $props();
</script>

<div
  class="tooltip tooltip-bottom{last ? '' : ' mr-2'} no-drag"
  data-tip={data.label}
>
  <Graphic
    width={16}
    height={16}
    path={data.icon}
    fill={data.color || "#ffffff"}
  ></Graphic>
</div>

<style>
  .tooltip {
    cursor: default;
  }
</style>
