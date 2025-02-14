<script lang="ts">
  import { userData } from "../../../shared.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";
  import AddActivityInputs from "./add/AddActivityInputs.svelte";
  import ActivityListItem from "./list/ActivityListItem.svelte";
  import { openSubmenu } from "../../../helpers.js";

  let { itemType } = $props();

  // Each component for adding new items
  let listItemComponents = {
    ActivityListItem,
  };

  // Each component for adding new items
  let addItemComponents = {
    AddActivityInputs,
  };

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType[itemType.length - 1] === "s"
      ? itemType.slice(0, itemType.length - 1)
      : itemType;

  let itemData = $derived(userData[itemType.toLowerCase()]);
  let listComponent = {
    value: listItemComponents[`${singular}ListItem`],
  };

  function addItem() {
    openSubmenu(addItemComponents[`Add${singular}Inputs`], {
      singular,
    });
  }
</script>

<SubmenuHeading text={itemType}>
  <button
    class="btn btn-sm btn-secondary"
    aria-label={"Add " + singular}
    onclick={addItem}>+ New</button
  >
</SubmenuHeading>
{#if itemData.length > 0}
  <div class="mb-3">
    {itemData.length}
    {(itemData.length === 1 ? singular : itemType).toLowerCase()}
  </div>
  <div id="item-list">
    {#each itemData as item}
      <listComponent.value data={item}></listComponent.value>
    {/each}
  </div>
{:else}
  <div class="submenu-center">
    <p class="pb-2">You do not have any {itemType.toLowerCase()}</p>
    <button
      class="btn btn-secondary"
      aria-label={"Add " + singular.toLowerCase()}
      onclick={addItem}>+ Add</button
    >
  </div>
{/if}

<style>
  #item-list {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
