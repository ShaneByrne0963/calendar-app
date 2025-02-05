<script lang="ts">
  import Submenu from "../Submenu.svelte";
  import AddItem from "./AddItem.svelte";

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

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType.slice(0, itemType.length - 1);

  function addItem() {
    submenu.component = AddItem;
    submenu.props = { itemType, singular };
  }
</script>

<Submenu {handleBack} {submenu}>
  <div id="item-list">
    <div class="heading">
      <h1>{itemType}</h1>
      <button
        class="btn btn-sm"
        aria-label={"Add " + singular}
        onclick={addItem}>+ New</button
      >
    </div>
  </div>
</Submenu>

<style>
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
  }
</style>
