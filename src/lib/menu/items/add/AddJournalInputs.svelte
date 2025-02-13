<script lang="ts">
  import Input from "../../../inputs/Input.svelte";
  import AddItem from "../AddItem.svelte";

  let { handleBack } = $props();
  let body = $state({ value: "" });
  let isValid = $derived(body.value);

  function createItem() {
    console.log(body.value);
  }
</script>

<AddItem {handleBack} singular="Journal Entry" {createItem} {isValid}>
  <Input
    type="textarea"
    label="Your thoughts"
    id="body"
    placeholder="Write down your thoughts"
    required={true}
    bind:value={body}
  ></Input>
</AddItem>
