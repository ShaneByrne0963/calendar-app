<script lang="ts">
  import Submenu from "../Submenu.svelte";

  let { itemType, handleBack, singular } = $props();
</script>

<Submenu {handleBack}>
  <div id="item-list">Add Item</div>
</Submenu>
