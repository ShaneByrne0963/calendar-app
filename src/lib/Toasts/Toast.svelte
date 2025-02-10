<script lang="ts">
  import Graphic from "../global/Graphic.svelte";

  let { type, children } = $props();
</script>

<div class="alert alert-{type}">
  <Graphic width={24} height={24} path={type} fill="#000000"></Graphic>
  <span>{@render children()}</span>
</div>

<style>
  .alert {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }
</style>
