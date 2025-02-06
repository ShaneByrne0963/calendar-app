<script lang="ts">
  import Submenu from "../Submenu.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";
  import AddActivityInputs from "./add/AddActivityInputs.svelte";

  let { handleBack, singular } = $props();
  let components = {
    AddActivityInputs,
  };
  let component = {
    selected: components[`Add${singular}Inputs`],
  };
</script>

<Submenu {handleBack}>
  <SubmenuHeading text={`New ${singular}`} />
  <div id="item-list">
    <component.selected></component.selected>
  </div>
  <button class="btn btn-secondary">Add</button>
</Submenu>
