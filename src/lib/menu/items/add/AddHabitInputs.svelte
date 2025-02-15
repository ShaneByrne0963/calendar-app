<script>
  import { dateToInputValue, first3 } from "../../../../helpers";
  import { calendarData } from "../../../../shared.svelte";
  import { days } from "../../../../types";
  import { inputFeedback } from "../../../../validation";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import Input from "../../../inputs/Input.svelte";
  import Select from "../../../inputs/Select.svelte";
  import AddItem from "../AddItem.svelte";

  let { singular } = $props();

  const occurences = ["Every Day", "Fixed Days", "Times Per Period"];
  const formats = ["Checkbox", "Checklist", "Number"];
  const checkboxDays = days.map((item) => first3(item));

  let name = $state({ value: "", feedback: inputFeedback.required });
  let occurence = $state({ value: occurences[0] });
  let checkedDays = $state(
    days.map((day) => ({ label: first3(day), value: "" }))
  );
  let format = $state({ value: formats[0] });
  let checkedDefault = $state(false);
  let startDate = $state({
    value: dateToInputValue(calendarData.selected),
    feedback: "",
  });
  let endDate = $state({ value: "" });

  let isValid = $derived(!name.feedback);

  function createItem() {
    console.log("Item Created");
  }
</script>

<AddItem {singular} {createItem} {isValid}>
  <Input id="name" label="Name" bind:value={name}></Input>
  <Select
    id="occurence"
    label="Check In"
    bind:value={occurence}
    options={occurences}
  ></Select>
  {#if occurence.value === "Fixed Days"}
    <CheckBoxList label="Days" required={true} bind:values={checkedDays}
    ></CheckBoxList>
  {/if}
  <Select id="format" label="Format" bind:value={format} options={formats}>
    {#if format.value === "Checkbox"}
      <CheckBox
        id="checked-default"
        label="Checked By Default"
        bind:checked={checkedDefault}
      ></CheckBox>
    {/if}
  </Select>
  <Input
    type="date"
    id="start-date"
    label="Start Date"
    bind:value={startDate}
    alignment="x"
  ></Input>
  <Input
    type="date"
    id="end-date"
    label="End Date"
    bind:value={endDate}
    alignment="x"
    required={false}
  ></Input>
</AddItem>
