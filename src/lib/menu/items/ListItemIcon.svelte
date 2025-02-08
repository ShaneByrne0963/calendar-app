<script lang="ts">
  import Graphic from "../../Graphic.svelte";

  let { icon, label, last = false } = $props();
</script>

<div class="tooltip tooltip-bottom{last ? '' : ' mr-2'}" data-tip={label}>
  <Graphic width={16} height={16} path={icon}></Graphic>
</div>
