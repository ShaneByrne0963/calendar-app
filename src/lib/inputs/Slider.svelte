<script lang="ts">
  import { sliderThemeData } from "../../types";
  let {
    id,
    label,
    value,
    steps = 6,
    ignoreFirst = true,
    theme = "",
    disabled = false,
  } = $props();

  let result = $derived(
    theme in sliderThemeData ? sliderThemeData[theme][value.value].label : ""
  );

  function oninput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    value.value = parseInt(val);
  }
</script>

<div class="mb-5">
  <div class="slider-head">
    <label for={id}>{label}</label>
    <div
      style={theme in sliderThemeData
        ? `color: ${sliderThemeData[theme][value.value].color};`
        : null}
    >
      {result}
    </div>
  </div>
  <input
    type="range"
    {id}
    min="0"
    max={steps - 1}
    value={value.value}
    class="range range-accent"
    {disabled}
    {oninput}
  />
  <div class="flex w-full justify-between px-2 text-xs">
    {#each new Array(steps), i}
      <span
        class="{theme}-{i}"
        style={theme in sliderThemeData
          ? `color: ${sliderThemeData[theme][i].color};`
          : null}
      >
        {#if !ignoreFirst || i > 0}|{/if}
      </span>
    {/each}
  </div>
</div>

<style>
  .slider-head {
    display: grid;
    grid-template-columns: 1fr auto;
  }
</style>
