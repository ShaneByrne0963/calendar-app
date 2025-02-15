<script lang="ts">
  import { closeSubmenu } from "../../../helpers";
  import SubmenuHeading from "../SubmenuHeading.svelte";

  let {
    isEdit = false,
    children,
    singular,
    createItem,
    isValid,
    submitText = "Add",
  } = $props();
</script>

<SubmenuHeading text="{isEdit ? 'Edit' : 'New'} {singular}" />
<div id="add-item">
  {@render children()}
</div>
<button class="btn" onclick={closeSubmenu}>Cancel</button>
<button class="btn btn-secondary" onclick={createItem} disabled={!isValid}
  >{isEdit ? "Save" : submitText}</button
>
