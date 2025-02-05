<script lang="ts">
  import Submenu from "../Submenu.svelte";

  let { itemType, handleBack, singular } = $props();
  let submenu = $state({ type: null, props: {} });
</script>

<Submenu {handleBack} {submenu}>
  <div id="item-list">Add Item</div>
</Submenu>
