<script lang="ts">
  import { userData } from "../../../shared.svelte";
  import Submenu from "../Submenu.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";
  import AddActivityInputs from "./add/AddActivityInputs.svelte";
  import ActivityListItem from "./list/ActivityListItem.svelte";

  let { itemType, handleBack } = $props();
  let submenu = $state({
    component: null,
    props: {},
    closing: false,
    handleBack: () => {
      submenu.closing = true;
    },
    handleTransitionEnd: (event: TransitionEvent) => {
      if (submenu.closing && event.propertyName === "left") {
        submenu.component = null;
        submenu.props = {};
        submenu.closing = false;
      }
    },
  });

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

  let itemData = userData[itemType.toLowerCase()];
  let listComponent = {
    value: listItemComponents[`${singular}ListItem`],
  };

  function addItem() {
    submenu.component = addItemComponents[`Add${singular}Inputs`];
    submenu.props = { singular };
  }
</script>

<Submenu {handleBack} {submenu}>
  <SubmenuHeading text={itemType}>
    <button
      class="btn btn-sm btn-secondary"
      aria-label={"Add " + singular}
      onclick={addItem}>+ New</button
    >
  </SubmenuHeading>
  {#if itemData.length > 0}
    <div id="item-list">
      <div class="mb-3">
        {itemData.length}
        {(itemData.length === 1 ? singular : itemType).toLowerCase()}
      </div>
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
</Submenu>
