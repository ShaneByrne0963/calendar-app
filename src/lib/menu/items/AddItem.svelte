<script lang="ts">
  import Submenu from "../Submenu.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";

  let { itemType, handleBack, singular } = $props();
</script>

<Submenu {handleBack}>
  <SubmenuHeading text={`Add ${singular}`} />
  <div id="item-list"></div>
</Submenu>
