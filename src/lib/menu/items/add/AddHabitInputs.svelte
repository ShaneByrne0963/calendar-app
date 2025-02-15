<script>
  import { inputFeedback } from "../../../../validation";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import Input from "../../../inputs/Input.svelte";
  import Select from "../../../inputs/Select.svelte";
  import AddItem from "../AddItem.svelte";

  let { singular } = $props();

  const occurences = ["Every Day", "Fixed Days", "Times Per Period"];
  const formats = ["Checkbox", "Checklist", "Number"];

  let name = $state({ value: "", feedback: inputFeedback.required });
  let occurence = $state({ value: occurences[0] });
  let format = $state({ value: formats[0] });
  let checkedDefault = $state(false);

  let isValid = $derived(!name.feedback);

  function createItem() {
    console.log("Item Created");
  }
</script>

<AddItem {singular} {createItem} {isValid}>
  <Input id="name" label="Name" bind:value={name}></Input>
  <Select
    id="occurence"
    label="Occurence"
    bind:value={occurence}
    options={occurences}
  ></Select>
  <Select id="format" label="Format" bind:value={format} options={formats}
  ></Select>
  {#if format.value === "Checkbox"}
    <CheckBox
      id="checked-default"
      label="Checked By Default"
      bind:checked={checkedDefault}
    ></CheckBox>
  {/if}
</AddItem>
