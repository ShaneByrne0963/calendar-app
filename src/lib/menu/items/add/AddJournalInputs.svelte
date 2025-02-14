<script lang="ts">
  import { dateToInputValue } from "../../../../helpers.js";
  import { addToast, userData } from "../../../../shared.svelte";
  import Input from "../../../inputs/Input.svelte";
  import AddItem from "../AddItem.svelte";

  let { handleBack, todaysLog } = $props();
  let body = $state({ value: todaysLog });
  let isValid = $derived(body.value);

  function createItem() {
    let key = dateToInputValue(new Date());
    userData.journal[key] = body.value;
    addToast(
      "success",
      `Your journal entry has been ${todaysLog.length > 0 ? "saved" : "added"}!`
    );
    handleBack();
  }
</script>

<AddItem
  {handleBack}
  isEdit={todaysLog.length > 0}
  singular="Journal Entry"
  {createItem}
  {isValid}
>
  <Input
    type="textarea"
    label="Your thoughts"
    id="body"
    placeholder="Write down your thoughts"
    required={true}
    bind:value={body}
  ></Input>
</AddItem>
