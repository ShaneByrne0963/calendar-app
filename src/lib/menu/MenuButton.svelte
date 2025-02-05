<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import ActivitiesList from "./item_lists/ActivitiesList.svelte";

  let { type } = $props();

  const submenus: object = {
    ActivitiesList,
  };

  function handleMenuClick() {
    menuData.submenu = submenus[type + "List"];
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
