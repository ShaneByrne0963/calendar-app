<script>
  import { dateToInputValue, first3 } from "../../../../helpers";
  import { calendarData } from "../../../../shared.svelte";
  import { days } from "../../../../types";
  import { handleDateOrder, inputFeedback } from "../../../../validation";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import Input from "../../../inputs/Input.svelte";
  import NumberInput from "../../../inputs/NumberInput.svelte";
  import Select from "../../../inputs/Select.svelte";
  import AddItem from "../AddItem.svelte";

  let { singular } = $props();

  const occurences = ["Every Day", "Fixed Days", "Times Per Period"];
  const formats = ["Checkbox", "Checklist", "Number"];

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
  let goal = $state({ value: "" });

  // Validation
  let isValid = $derived.by(() => {
    if (occurence.value === "Fixed Days") {
      let checkedValues = checkedDays.filter((item) => item.value);
      if (checkedValues.length === 0) {
        return false;
      }
    }
    return !name.feedback && !startDate.feedback;
  });

  // Ensures the start date is before the end date
  function validateStartDate() {
    startDate.feedback = handleDateOrder(startDate.value, endDate.value);
  }

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
  >
    {#if occurence.value === "Fixed Days"}
      <CheckBoxList label="Days" required={true} bind:values={checkedDays}
      ></CheckBoxList>
    {/if}
  </Select>
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
    validation={validateStartDate}
  ></Input>
  <Input
    type="date"
    id="end-date"
    label="End Date"
    bind:value={endDate}
    alignment="x"
    required={false}
    validation={validateStartDate}
  ></Input>
  <NumberInput
    id="goal"
    label="Goal"
    required={false}
    bind:value={goal}
    alignment="x"
    min={1}
  ></NumberInput>
</AddItem>
