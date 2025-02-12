<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import IconPicker from "./IconPicker.svelte";

  let { label = "Icon" } = $props();

  function onclick(e: MouseEvent) {
    menuData.clickWindow = {
      component: IconPicker,
      x: e.clientX,
      y: e.clientY,
      onSelect: null,
    };
  }
</script>

<div class="icon-divider mb-5">
  <span>{label}</span>
  <button class="icon-container" aria-label="Select icon" {onclick}></button>
</div>

<style>
  .icon-divider {
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: center;
  }

  .icon-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 1px solid white;
    border-radius: 8px;
  }
</style>
