<script>
  import { userData } from "../../../shared.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";
  import AddActivityInputs from "./add/AddActivityInputs.svelte";
  import ActivityListItem from "./list/ActivityListItem.svelte";
  import { openSubmenu } from "../../../helpers.js";
  import AddHabitInputs from "./add/AddHabitInputs.svelte";
  import HabitListItem from "./list/HabitListItem.svelte";
  import { sortHabits } from "./itemsort.js";

  let { itemType } = $props();

  // Each component for adding new items
  let listItemComponents = {
    ActivityListItem,
    HabitListItem,
  };

  // Each component for adding new items
  let addItemComponents = {
    AddActivityInputs,
    AddHabitInputs,
  };

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType[itemType.length - 1] === "s"
      ? itemType.slice(0, itemType.length - 1)
      : itemType;

  let itemData = $derived.by(() => {
    if (itemType === "Habits") {
      return sortHabits();
    }
    let obj = {
      main: {
        title: ``,
        items: [],
      },
    };
    for (let [key, value] of Object.entries(userData[itemType.toLowerCase()])) {
      if (key !== "id") {
        obj.main.items.push({ ...value, id: key });
      }
    }
    return obj;
  });

  let listComponent = {
    value: listItemComponents[`${singular}ListItem`],
  };

  let hasItems = $derived.by(() => {
    for (let val of Object.values(itemData)) {
      if (val.items.length > 0) {
        return true;
      }
    }
    return false;
  });

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
{#if hasItems}
  {#each Object.values(itemData) as data}
    {#if data.title && data.items.length > 0}
      <div class="ml-2 mb-1">{data.title}</div>
    {/if}
    <div id="item-list">
      {#each data.items as item}
        <listComponent.value data={item}></listComponent.value>
      {/each}
    </div>
  {/each}
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
