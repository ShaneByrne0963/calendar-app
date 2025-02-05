<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import ItemList from "./items/ItemList.svelte";

  let { type } = $props();

  function handleMenuClick() {
    menuData.submenu = ItemList;
    menuData.props = {
      itemType: type,
    };
  }
</script>

<button
  class="btn btn-accent btn-block btn-xs sm:btn-sm md:btn-md lg:btn-lg"
  onclick={handleMenuClick}>{type}</button
>

<style>
  button {
    justify-content: start;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
</style>
