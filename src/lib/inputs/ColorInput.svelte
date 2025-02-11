<script lang="ts">
  import { menuData } from "../../shared.svelte";

  function onclick(e: MouseEvent) {
    menuData.colorPicker = {
      x: e.clientX,
      y: e.clientY,
    };
  }
</script>

<div class="mb-5">
  <button
    aria-label="Select a color"
    class="color-input bg-secondary bg-secondary-accent"
    {onclick}
  >
    Colour
  </button>
</div>

<style>
  button {
    width: 100%;
    padding: 8px;
    border-radius: 16px;
  }
</style>
