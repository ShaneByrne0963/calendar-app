<script lang="ts">
  import { dateToInputValue } from "../../../../helpers";
  import { addToast, userData } from "../../../../shared.svelte";
  import Input from "../../../inputs/Input.svelte";
  import AddItem from "../AddItem.svelte";

  let { handleBack } = $props();
  let body = $state({ value: "" });
  let isValid = $derived(body.value);

  function createItem() {
    let key = dateToInputValue(new Date());
    userData.journal[key] = body.value;
    addToast("success", "Your journal entry has been added!");
    handleBack();
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
