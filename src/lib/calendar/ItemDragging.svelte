<script lang="ts">
  import { calendarData } from "../../shared.svelte";
  import { clamp } from "../../helpers";

  let style = $derived.by(() => {
    let data: any = calendarData.itemAddData;
    let width = data.width;
    let height = data.height;
    let hourHeight = data.dayHeight / 24;
    let steps = 4;

    let left =
      data.day >= 0
        ? data.left + width * 0.025 + data.day * width
        : calendarData.itemAddData.mouseX - width / 2;
    let top = 0;
    if (data.day >= 0) {
      if ("startTime" in data && data) {
        top =
          data.top +
          (data.startTime.hours + data.startTime.minutes / 60) * hourHeight;
      } else {
        top = clamp(
          data.top +
            Math.floor(
              (data.mouseY - data.height * 0.3 - data.top) /
                (hourHeight / steps)
            ) *
              (hourHeight / steps),
          data.top,
          data.top + data.dayHeight - height
        );
      }
    } else {
      top = calendarData.itemAddData.mouseY - height / 2;
    }
    return (
      [
        `left: ${left}px`,
        `top: ${top}px`,
        `width: ${width * 0.95}px`,
        `height: ${height}px`,
      ].join("; ") + ";"
    );
  });
</script>

<div
  id="item-drag"
  class="bg-accent{'width' in calendarData.itemAddData
    ? ' visible'
    : ''}{calendarData.itemAddData.day >= 0 ? ' snapped' : ''}"
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
    transform: translate(0, 30%);
    transition: scale 0.3s ease-in-out;
    pointer-events: none;

    &.visible {
      scale: 1;
    }

    &.snapped {
      transition: left 0.2s ease-in-out;
      transform: translate(0, 0);
      opacity: 1;
    }
  }
</style>
