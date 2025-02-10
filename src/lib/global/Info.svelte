<script lang="ts">
  import Graphic from "./Graphic.svelte";

  let { children } = $props();
</script>

<div class="info-container border-info text-info text-xs mb-3">
  <Graphic width={24} height={24} path="info" fill="#00b8ff" extraClass="mr-2"
  ></Graphic>
  <p>{@render children()}</p>
</div>

<style>
  .info-container {
    border-width: 1px;
    border-radius: 16px;
    padding: 8px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
</style>
