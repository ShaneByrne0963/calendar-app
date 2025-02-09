<script lang="ts">
  import { calendarData } from "../../../shared.svelte";
  let { children, title } = $props();

  function onmousedown(e: MouseEvent) {
    calendarData.itemAdding = true;
    if (
      document.querySelector("#schedule .day") &&
      !(e.target as HTMLElement).closest(".no-drag")
    ) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  }

  function mouseMove(e: MouseEvent) {
    let dayRef = document
      .querySelector("#schedule .day")
      .getBoundingClientRect();

    calendarData.itemAddData = {
      title,
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: dayRef.width * 0.9,
      height: dayRef.width,
    };
  }

  function mouseUp() {
    calendarData.itemAdding = false;
    calendarData.itemAddData = {};
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }
</script>

<div
  role="button"
  tabindex="0"
  class="item-list-item border-secondary mb-6"
  {onmousedown}
  aria-label="Pick Up Item"
>
  <div class="divide-content">
    <h2>{title}</h2>
  </div>
  {@render children()}
</div>

<style>
  .item-list-item {
    border-width: 1px;
    border-radius: 16px;
    padding: 0.5em 1em 1em 1em;

    cursor: grab;
  }

  h2 {
    font-size: 1.5em;
  }
</style>
