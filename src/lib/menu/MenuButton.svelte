<script lang="ts">
  import { openSubmenu } from "../../helpers.js";
  import { calendarData } from "../../shared.svelte";
  import ItemList from "./items/ItemList.svelte";
  import JournalList from "./items/list/JournalList.svelte";

  let { type, disabled = true } = $props();

  const submenus = $derived({
    Journal: {
      component: JournalList,
      props: {
        selectedDate: calendarData.today,
      },
    },
  });

  function handleMenuClick() {
    if (type in submenus) {
      openSubmenu(submenus[type].component, submenus[type].props);
    } else {
      openSubmenu(ItemList, { itemType: type });
    }
  }
</script>

<button
  class="btn btn-accent btn-block btn-xs sm:btn-sm md:btn-md"
  onclick={handleMenuClick}
  {disabled}>{type}</button
>

<style>
  button {
    justify-content: start;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
</style>
