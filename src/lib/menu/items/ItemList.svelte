<script lang="ts">
  import Submenu from "../Submenu.svelte";
  import AddItem from "./AddItem.svelte";

  let { itemType, handleBack } = $props();
  let submenu = $state({ type: null, props: {} });

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType.slice(0, itemType.length - 1);

  function addItem() {
    submenu.type = AddItem;
    submenu.props = { itemType, handleBack };
  }
</script>

<Submenu {handleBack}>
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
  {#if submenu.type}
    <submenu.type {...submenu.props}></submenu.type>
  {/if}
</Submenu>

<style>
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
  }
</style>
