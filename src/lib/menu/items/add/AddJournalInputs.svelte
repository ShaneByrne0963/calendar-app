<script>
  import AddItem from "../AddItem.svelte";

  let { handleBack } = $props();
  let isValid = $state(false);

  function createItem() {
    console.log("item created");
  }
</script>

<AddItem {handleBack} singular="Journal Entry" {createItem} {isValid}>
  <div>This is the journal form</div>
</AddItem>
