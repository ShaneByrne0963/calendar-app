<script lang="ts">
  import Submenu from "../Submenu.svelte";

  let { itemType, handleBack } = $props();
  let submenu = $state({ type: null, props: {} });

  // Get the singular form of the item
  let singular = itemType.includes("ies")
    ? itemType.replace("ies", "y")
    : itemType.slice(0, itemType.length - 1);
</script>

<Submenu {handleBack}>
  <div id="item-list">Hello</div>
  {#if submenu.type}
    <submenu.type {...submenu.props}></submenu.type>
  {/if}
</Submenu>
