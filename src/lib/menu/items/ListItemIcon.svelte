<script lang="ts">
  import Graphic from "../../global/Graphic.svelte";

  let { icon, label, last = false } = $props();
</script>

<div
  class="tooltip tooltip-bottom{last ? '' : ' mr-2'} no-drag"
  data-tip={label}
>
  <Graphic width={16} height={16} path={icon}></Graphic>
</div>

<style>
  .tooltip {
    cursor: default;
  }
</style>
