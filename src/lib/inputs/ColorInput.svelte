<script lang="ts">
  import { menuData } from "../../shared.svelte";

  let { value } = $props();

  function onclick(e: MouseEvent) {
    menuData.colorPicker = {
      x: e.clientX,
      y: e.clientY,
      onSelect,
    };
  }

  function onSelect(val: string) {
    value.value = val;
  }
</script>

<div class="mb-5">
  <button
    aria-label="Select a color"
    class="color-input bg bg-{value.value}"
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
