<script lang="ts">
  import { toasts } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";

  let { type, i, children } = $props();
  let timer = $state(0);

  function count() {
    timer++;
    if (timer >= 10) {
      onclick();
    } else {
      setTimeout(count, 1000);
    }
  }
  count();

  function onclick() {
    toasts.splice(i, 1);
  }
</script>

<div class="alert alert-{type}">
  <Graphic width={24} height={24} path={type} fill="#000000"></Graphic>
  <span>{@render children()}</span>
  <button aria-label="Close" class="close" {onclick}>&times;</button>
</div>

<style>
  .alert {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
  }
</style>
