<script lang="ts">
  import Submenu from "../Submenu.svelte";
  import SubmenuHeading from "../SubmenuHeading.svelte";

  let {
    handleBack,
    children,
    singular,
    createItem,
    isValid,
    submitText = "Add",
  } = $props();
</script>

<Submenu {handleBack}>
  <SubmenuHeading text={`New ${singular}`} />
  <div id="add-item">
    {@render children()}
  </div>
  <button class="btn" onclick={handleBack}>Cancel</button>
  <button class="btn btn-secondary" onclick={createItem} disabled={!isValid}
    >{submitText}</button
  >
</Submenu>
