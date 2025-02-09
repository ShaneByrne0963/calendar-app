<script lang="ts">
  import { calendarData } from "../../shared.svelte";

  let style = $derived.by(() => {
    let width = calendarData.itemAddData.width;
    let height = calendarData.itemAddData.height;
    return (
      [
        `left: ${calendarData.itemAddData.mouseX - width / 2}px`,
        `top: ${calendarData.itemAddData.mouseY - height / 3}px`,
        `width: ${width}px`,
        `height: ${height}px`,
      ].join("; ") + ";"
    );
  });
</script>

<div
  id="item-drag"
  class="bg-accent{'width' in calendarData.itemAddData ? ' visible' : ''}"
  {style}
>
  {calendarData.itemAddData.title}
</div>

<style>
  #item-drag {
    color: black;
    position: absolute;
    text-align: center;
    border-radius: 16px;
    z-index: 2;
    opacity: 0.5;
    scale: 0;
    transition: scale 0.2s ease-in-out;
    cursor: grabbing;

    &.visible {
      scale: 1;
    }
  }
</style>
