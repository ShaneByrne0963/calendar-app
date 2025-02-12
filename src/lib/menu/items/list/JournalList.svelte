<script lang="ts">
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";

  let { handleBack } = $props();
</script>

<Submenu {handleBack}>
  <SubmenuHeading text="Journal"></SubmenuHeading>
</Submenu>
