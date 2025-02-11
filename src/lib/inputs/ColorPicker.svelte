<script lang="ts">
  import { menuData } from "../../shared.svelte";

  // The main colors of DaisyUI
  const mainColors = [
    "secondary",
    "accent",
    "success",
    "info",
    "warning",
    "error",
    "white",
  ];

  // The list of Tailwind colors, divided into 2 sections
  const colorList1 = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
  ];
  const colorList2 = [
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
  ];

  function getColorList(colors: string[]) {
    let arr = [];
    const shades = [100, 200, 300, 400, 500];

    for (let shd of shades) {
      for (let col of colors) {
        arr.push(`${col}-${shd}`);
      }
    }
    return arr;
  }

  function close() {
    menuData.colorPicker = {
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

  function onclick(e: Event) {
    let val = (e.target as HTMLElement).classList[1].replace("col-", "");

    menuData.colorPicker.onSelect?.(val);
    close();
  }
</script>

<div
  class="color-picker bg-neutral border-neutral"
  style="left: {menuData.colorPicker.x - 32}px; top: {menuData.colorPicker.y +
    16}px"
>
  <div class="row mb-3">
    {#each mainColors as col}
      <button
        aria-label="Select color"
        class="background col-{col} rounded-sm"
        {onclick}
      ></button>
    {/each}
  </div>
  <div class="row mb-3">
    {#each getColorList(colorList1) as col}
      <button
        aria-label="Select color"
        class="background col-{col} rounded-sm"
        {onclick}
      ></button>
    {/each}
  </div>
  <div class="row">
    {#each getColorList(colorList2) as col}
      <button
        aria-label="Select color"
        class="background col-{col} rounded-sm"
        {onclick}
      ></button>
    {/each}
  </div>
</div>

<style>
  .color-picker {
    z-index: 4;
    position: absolute;
    width: 480px;
    min-height: 360px;
    border-radius: 16px;
    padding: 8px;

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

    .row {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      gap: 2px;

      .btn,
      .background {
        width: 100%;
        height: auto;
        min-height: auto;
        aspect-ratio: 1 / 1;
      }
    }
  }
</style>
