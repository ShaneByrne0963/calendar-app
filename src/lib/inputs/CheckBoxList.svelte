<script lang="ts">
  import CheckBox from "./CheckBox.svelte";

  let {
    label = "",
    spread = false,
    margin = true,
    values,
    required = false,
    size = "md",
  } = $props();

  let hasOne = $derived(values.filter((item: any) => item.value).length > 0);
</script>

<div class="checkbox-list-head">
  {#if label}
    <div>{label}</div>
  {/if}
  {#if required && !hasOne}
    <p class="text-xs">*Please select at least 1</p>
  {/if}
</div>
<div class="checkbox-list{margin ? ' mb-5' : ''}{spread ? ' spread' : ''}">
  {#each values as item}
    <CheckBox label={item.label} bind:checked={item.value} {size}></CheckBox>
  {/each}
</div>

<style>
  .checkbox-list.spread {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    column-gap: 2rem;
  }

  .checkbox-list-head {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
  }
</style>
