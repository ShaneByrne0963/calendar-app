<script lang="ts">
  import { menuData } from "../../shared.svelte";

  let { children, onSelect = null } = $props();

  function close() {
    menuData.clickWindow = {
      component: null,
      x: -1,
      y: -1,
      onSelect: null,
    };
    document.removeEventListener("click", clickAway);
  }

  // Closes the color picker when the user clicks away
  function clickAway(e: Event) {
    let target = e.target as HTMLElement;
    if (!target.closest(".color-picker") && !target.closest(".color-input")) {
      close();
    }
  }
  setTimeout(() => document.addEventListener("click", clickAway));

  // Wrap the function in a decorator that closes the window when selected
  const func = menuData.clickWindow.onSelect;
  menuData.clickWindow.onSelect = (...args: any[]) => {
    func?.(...args);
    close();
  };
</script>

<div
  class="color-picker bg-neutral border-neutral"
  style="left: {menuData.clickWindow.x - 32}px; top: {menuData.clickWindow.y +
    16}px"
>
  {@render children()}
</div>

<style>
  .color-picker {
    z-index: 4;
    position: absolute;
    width: 480px;
    min-height: 360px;
    border-radius: 16px;
    padding: 12px;

    &::before {
      content: "";
      display: block;
      border-width: 16px;
      border-color: transparent;
      border-bottom-color: inherit;
      position: absolute;
      width: 0;
      height: 0;
      top: -32px;
      left: 16px;
    }
  }
</style>
