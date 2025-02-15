<script lang="ts">
  let { label = "", values = $bindable(), required = true } = $props();

  const buttons = new Array(31);
  let hasSelected = $derived(values.findIndex((item: boolean) => item) !== -1);

  function selectDay(index: number) {
    values[index] = !values[index];
  }
</script>

{#if label}
  <span>{label}</span>
{/if}
{#if required && !hasSelected}
  <span class="text-xs">*Please select at least 1</span>
{/if}
<div class="calendar-input">
  {#each buttons, i}
    <button class={values[i] ? "selected" : ""} onclick={() => selectDay(i)}
      >{i + 1}</button
    >
  {/each}
</div>

<style>
  .calendar-input {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);

    > button {
      width: calc(100% - 4px);
      margin: 2px;
      border-radius: 8px;
      aspect-ratio: 1 / 1;
      transition:
        background-color 0.2s ease-in-out,
        color 0.2s ease-in-out;

      &.selected {
        background-color: white;
        color: black;
      }
    }
  }
</style>
