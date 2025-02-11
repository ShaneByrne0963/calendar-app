<script lang="ts">
  import { menuData } from "../../shared.svelte";

  function clickAway(e: Event) {
    let target = e.target as HTMLElement;
    if (!target.closest(".color-picker") && !target.closest(".color-input")) {
      menuData.colorPicker = {
        x: -1,
        y: -1,
      };
      document.removeEventListener("click", clickAway);
    }
  }

  setTimeout(() => document.addEventListener("click", clickAway));
</script>

<div
  class="color-picker bg-neutral"
  style="left: {menuData.colorPicker.x}px; top: {menuData.colorPicker.y}px"
></div>

<style>
  .color-picker {
    z-index: 4;
    position: absolute;
    width: 480px;
    height: 360px;
    border-radius: 16px;
  }
</style>
