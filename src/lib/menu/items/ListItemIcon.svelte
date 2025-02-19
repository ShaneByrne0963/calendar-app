<script lang="ts">
  import Graphic from "../../global/Graphic.svelte";
  import ToolTip from "../../global/ToolTip.svelte";

  let { tooltip, icon, color, text = "" } = $props();
</script>

<ToolTip text={tooltip}>
  <div class="no-drag{text ? ' btn btn-xs btn-neutral' : ''}">
    <Graphic width={18} height={18} path={icon} fill={color || "#ffffff"} />
    {#if text}
      <span>{text}</span>
    {/if}
  </div>
</ToolTip>

<style>
  .no-drag {
    cursor: default;
  }

  .btn.btn-xs {
    gap: 4px;
  }
</style>
