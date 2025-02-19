<script>
  import {
    addItemToData,
    closeSubmenu,
    dateToInputValue,
    first3,
  } from "../../../../helpers";
  import { addToast, calendarData } from "../../../../shared.svelte";
  import { days, timePeriods } from "../../../../types";
  import { handleDateOrder, inputFeedback } from "../../../../validation";
  import MonthInput from "../../../inputs/MonthInput.svelte";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import Feedback from "../../../inputs/Feedback.svelte";
  import Input from "../../../inputs/Input.svelte";
  import NumberInput from "../../../inputs/NumberInput.svelte";
  import Select from "../../../inputs/Select.svelte";
  import AddItem from "../AddItem.svelte";
  import AddItemInput from "../../../inputs/AddItemInput.svelte";

  let { singular } = $props();

  const occurences = [
    "Every day",
    "Specific days of the week",
    "Specific days of the month",
    "Times per period",
  ];
  const formats = ["Checkbox", "Checklist", "Number"];
  const numberLimits = ["At least", "No more than", "Exactly"];
  const times = timePeriods.slice(1);

  let name = $state({ value: "", feedback: inputFeedback.required });
  let occurence = $state({ value: occurences[0] });
  let wCheckedDays = $state(
    days.map((day) => ({ label: first3(day), value: "" }))
  );
  let mCheckedDays = $state(new Array(31).map(() => false));
  let periodFrequency = $state({ value: "1", feedback: "" });
  let periodLength = $state({ value: times[0] });

  let format = $state({ value: formats[0] });
  let defaultChecked = $state(false);
  let checklistValues = $state([]);

  let numberUnit = $state({ value: "", feedback: inputFeedback.required });
  let numberLimit = $state({ value: numberLimits[0] });
  let numberTimes = $state({ value: "", feedback: "" });

  let startDate = $state({
    value: dateToInputValue(calendarData.selected),
    feedback: "",
  });
  let endDate = $state({ value: "" });
  let goal = $state({ value: "" });

  let maxPeriodFrequency = $derived.by(() => {
    if (periodLength.value === "Week") {
      return 7;
    }
    if (periodLength.value === "Month") {
      return 28;
    }
    return 365;
  });

  // Validation
  let isValid = $derived.by(() => {
    // Occurence validation
    if (occurence.value === "Specific days of the week") {
      let checkedValues = wCheckedDays.filter((item) => item.value);
      if (checkedValues.length === 0) {
        return false;
      }
    } else if (occurence.value === "Specific days of the month") {
      let checkedValues = mCheckedDays.filter((item) => item);
      if (checkedValues.length === 0) {
        return false;
      }
    } else if (occurence.value === "Times per period") {
      if (!periodFrequency.value) {
        return false;
      }
    }
    // Format validation
    if (format.value === "Checklist") {
      if (checklistValues.length === 0) {
        return false;
      }
    }
    return !name.feedback && !startDate.feedback;
  });

  let timeUnit = $derived.by(() => {
    if (occurence.value === "Times per period") {
      return periodLength.value + "s";
    }
    return "Days";
  });

  // Ensures the start date is before the end date
  function validateStartDate() {
    startDate.feedback = handleDateOrder(startDate.value, endDate.value);
  }

  function createItem() {
    let habitBase = {
      name: name.value,
      occurence: occurence.value,
      format: format.value,
      startDate: startDate.value,
      recordStart: dateToInputValue(new Date()),
      record: 0,
    };
    if (endDate.value) {
      habitBase.endDate = endDate.value;
    }
    if (goal.value) {
      habitBase.goal = goal.value;
    }
    // Occurence data
    let occurenceSpecific = {};
    if (occurence.value === "Specific days of the week") {
      let days = wCheckedDays
        .map((val, i) => (val.value ? i : null))
        .filter((item) => item !== null);
      occurenceSpecific = { days };
    } else if (occurence.value === "Specific days of the month") {
      let days = mCheckedDays
        .map((val, i) => (val ? i : null))
        .filter((item) => item !== null);
      occurenceSpecific = { days };
    } else if (occurence.value === "Times per period") {
      occurenceSpecific = {
        frequency: periodFrequency.value,
        periodLength: periodLength.value,
      };
    }
    // Format data
    let formatSpecific = {};
    if (format.value === "Checkbox") {
      formatSpecific = {
        defaultChecked,
      };
    } else if (format.value === "Checklist") {
      formatSpecific = {
        checkList: checklistValues,
      };
    } else if (format.value === "Number") {
      formatSpecific = {
        unit: numberUnit.value,
        limit: numberLimit.value,
        numberAmount: parseInt(numberTimes.value),
      };
    }

    addItemToData("habits", {
      ...habitBase,
      ...occurenceSpecific,
      ...formatSpecific,
    });
    closeSubmenu();
    addToast("success", "Habit created successfully!");
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
    {#if occurence.value === "Specific days of the week"}
      <CheckBoxList
        label="Days"
        required={true}
        bind:values={wCheckedDays}
        spread={true}
      ></CheckBoxList>
    {:else if occurence.value === "Specific days of the month"}
      <MonthInput bind:values={mCheckedDays}></MonthInput>
    {:else if occurence.value === "Times per period"}
      <div id="times-per-period" class="mt-3">
        <NumberInput
          id="period-frequency"
          label="Frequency"
          labelHidden={true}
          margin={false}
          bind:value={periodFrequency}
          required={true}
          min={1}
          max={maxPeriodFrequency}
          displayFeedback={false}
        ></NumberInput>
        <span>time{periodFrequency.value === "1" ? "" : "s"} per</span>
        <Select
          id="period-length"
          label="Length"
          labelHidden={true}
          margin={false}
          bind:value={periodLength}
          options={times}
        ></Select>
      </div>
      {#if periodFrequency.feedback}
        <Feedback text={periodFrequency.feedback}></Feedback>
      {/if}
    {/if}
  </Select>
  <Select id="format" label="Format" bind:value={format} options={formats}>
    {#if format.value === "Checkbox"}
      <CheckBox
        id="checked-default"
        label="Checked By Default"
        bind:checked={defaultChecked}
      ></CheckBox>
    {:else if format.value === "Checklist"}
      <div class="mt-4 pb-5">
        <AddItemInput id="habit-checklist" bind:values={checklistValues}
        ></AddItemInput>
      </div>
    {:else if format.value === "Number"}
      <div class="my-3">
        <Input
          id="unit"
          label="Unit"
          placeholder="Write in singular form"
          margin={false}
          bind:value={numberUnit}
        ></Input>
      </div>
      <span>Target</span>
      <div class="number-input-section">
        <Select
          id="number-limits"
          label="Your target"
          labelHidden={true}
          margin={false}
          bind:value={numberLimit}
          options={numberLimits}
        ></Select>
        <NumberInput
          id="number-times"
          label="Number of times"
          labelHidden={true}
          placeholder="Value"
          margin={false}
          bind:value={numberTimes}
          unit="{numberUnit.value.toLowerCase()}{numberTimes.value !== '1'
            ? 's'
            : ''}"
        ></NumberInput>
      </div>
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
    unit={timeUnit}
    min={1}
  ></NumberInput>
</AddItem>

<style>
  #times-per-period {
    display: grid;
    grid-template-columns: 5fr auto 4fr;
    align-items: center;

    span {
      text-align: center;
      display: block;
      margin: 0 6px;
    }
  }

  .number-input-section {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
  }
</style>
