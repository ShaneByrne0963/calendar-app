<script lang="ts">
  import Counter from "../../Counter.svelte";

  let { itemType, children, submenu } = $props();

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType.slice(0, itemType.length - 1);

  function addItem() {
    submenu = Counter;
  }
</script>

<div id="item-list">
  <div class="heading">
    <h1>{itemType}</h1>
    <button class="btn btn-sm" aria-label={"Add " + singular} onclick={addItem}
      >+ New</button
    >
  </div>
</div>

<style>
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
  }
</style>
