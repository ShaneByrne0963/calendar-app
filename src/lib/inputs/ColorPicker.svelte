<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import { colorList1, colorList2, colorShades } from "../../types";
  import ClickWindow from "../global/ClickWindow.svelte";

  function getColorList(colors: string[]) {
    let arr = [];

    for (let shd of colorShades) {
      for (let col of colors) {
        arr.push(`${col}-${shd}`);
      }
    }
    return arr;
  }

  function onclick(e: Event) {
    let val = (e.target as HTMLElement).classList[1].replace("col-", "");

    menuData.clickWindow.onSelect(val);
  }
</script>

<ClickWindow>
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
</ClickWindow>

<style>
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
</style>
