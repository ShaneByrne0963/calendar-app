<script lang="ts">
  import CheckBox from "./CheckBox.svelte";

  let { label, values } = $props();
</script>

<div>{label}</div>
<div class="checkbox-list mb-5">
  {#each values as item}
    <CheckBox label={item.label} bind:checked={item.value}></CheckBox>
  {/each}
</div>

<style>
  .checkbox-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    column-gap: 2rem;
  }
</style>
