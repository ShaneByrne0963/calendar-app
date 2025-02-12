<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import ColorPicker from "./ColorPicker.svelte";

  let { value } = $props();

  function onSelect(val: string) {
    value.value = val;
  }

  function onclick(e: MouseEvent) {
    menuData.clickWindow = {
      component: ColorPicker,
      x: e.clientX,
      y: e.clientY,
      onSelect,
    };
  }
</script>

<div class="mb-5">
  <button
    aria-label="Select a color"
    class="color-input background col-{value.value}"
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
