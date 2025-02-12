<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import ItemList from "./items/ItemList.svelte";
  import JournalList from "./items/list/JournalList.svelte";

  let { type } = $props();

  const submenus = {
    Journal: {
      component: JournalList,
      props: {},
    },
  };

  function handleMenuClick() {
    if (type in submenus) {
      menuData.submenu = submenus[type].component;
      menuData.props = submenus[type].props;
    } else {
      menuData.submenu = ItemList;
      menuData.props = {
        itemType: type,
      };
    }
  }
</script>

<button
  class="btn btn-accent btn-block btn-xs sm:btn-sm md:btn-md"
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
