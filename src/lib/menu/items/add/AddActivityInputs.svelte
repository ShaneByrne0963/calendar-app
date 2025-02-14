<script>
  import Input from "../../../inputs/Input.svelte";
  import { userData, calendarData, addToast } from "../../../../shared.svelte";
  import {
    dateToInputValue,
    first3,
    inputToArray,
    pickFrom,
    timeAsNumber,
  } from "../../../../helpers.js";
  import AddItem from "../AddItem.svelte";
  import Select from "../../../inputs/Select.svelte";
  import TimeInput from "../../../inputs/TimeInput.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import { days, colorList1, colorList2, colorShades } from "../../../../types";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import TimeLength from "../../../inputs/TimeLength.svelte";
  import Info from "../../../global/Info.svelte";
  import { handleDateOrder, inputFeedback } from "../../../../validation";
  import Slider from "../../../inputs/Slider.svelte";
  import ColorInput from "../../../inputs/ColorInput.svelte";
  import IconInput from "../../../inputs/IconInput.svelte";

  let { handleBack, singular } = $props();

  // Constants
  const occurences = ["Fixed", "Varying", "Flexible"];
  const activityTypes = ["Work", "Leisure"];
  const settings = ["Indoors", "Outdoors"];
  const blankText = "Please Select";
  const colors = [...colorList1, ...colorList2];
  const startingColor = pickFrom(colors) + "-" + pickFrom(colorShades);

  // Input values
  let name = $state({ value: "", feedback: inputFeedback.required });
  let color = $state({ value: startingColor });
  let occurence = $state({ value: occurences[0] });
  let activityType = $state({ value: "" });
  let setting = $state({ value: "" });
  let intensity = $state({ value: 0 });

  // Fixed activity occurences
  let startDate = $state({
    value: dateToInputValue(calendarData.selected),
    feedback: "",
  });
  let endDate = $state({ value: "" });
  let fixedDays = $state(
    days.map((day) => ({ label: first3(day), value: "" }))
  );
  let startTime = $state({
    hours: 12,
    minutes: 0,
    feedback: "",
  });
  let endTime = $state({ hours: 14, minutes: 0 });

  // Varying activity occurences
  let varyingDuration = $state({ hours: 1, minutes: 0, feedback: "" });
  let varyingHasTime = $state(false);

  // Validation
  let isValid = $derived.by(() => {
    // Inputs for all activity types
    if (name.feedback) {
      return false;
    }
    // Inputs for fixed activity types
    if (occurence.value === "Fixed") {
      let checkedDays = fixedDays.filter((item) => item.value);
      if (
        startDate.feedback ||
        startTime.feedback ||
        checkedDays.length === 0
      ) {
        return false;
      }
    }
    // Inputs for varying activity types
    if (occurence.value === "Varying") {
      if (varyingDuration.feedback) {
        return false;
      }
    }
    return true;
  });

  // Ensures the start date is before the end date
  function validateStartDate() {
    startDate.feedback = handleDateOrder(startDate.value, endDate.value);
  }

  // Ensures the start time and end time are not equal
  function validateStartTime() {
    startTime.feedback =
      timeAsNumber(startTime) === timeAsNumber(endTime)
        ? inputFeedback.time
        : "";
  }

  function createItem() {
    let activity = {
      name: name.value,
      color: color.value,
      occurence: occurence.value,
    };
    // Advanced options. Only add the ones that have been entered by the user
    if (activityType.value) {
      activity.type = activityType.value;
    }
    if (setting.value) {
      activity.setting = setting.value;
    }
    if (intensity.value) {
      activity.intensity = intensity.value;
    }
    let occurenceSpecific = {};
    // For fixed activities
    if (occurence.value === occurences[0]) {
      // Parse the start and end dates
      let pStartDate = inputToArray(startDate.value);
      let pEndDate = "";
      if (endDate.value) {
        pEndDate = inputToArray(endDate.value);
      }
      // Get the indices of every selected day
      let pFixedDays = fixedDays
        .filter((item) => item.value)
        .map((item) => days.findIndex((day) => item.label === first3(day)));

      occurenceSpecific = {
        startDate: pStartDate,
        endDate: pEndDate,
        fixedDays: pFixedDays,
        startTime,
        endTime,
      };
    }
    // For varying activities
    else if (occurence.value === occurences[1]) {
      occurenceSpecific = {
        duration: varyingDuration,
      };
      if (varyingHasTime) {
        occurenceSpecific = {
          ...occurenceSpecific,
          startTime,
        };
      }
    }
    userData.activities.push({ ...activity, ...occurenceSpecific });
    handleBack();
    addToast("success", "Activity created successfully!");
  }
</script>

<AddItem {handleBack} {singular} {createItem} {isValid}>
  <Input id="item-name" label="Name" bind:value={name}></Input>
  <ColorInput bind:value={color}></ColorInput>
  <IconInput></IconInput>
  <Select
    id="item-occurence"
    label="Occurence"
    bind:value={occurence}
    options={occurences}
  ></Select>

  {#if occurence.value === "Fixed"}
    <Input
      id="item-start-date"
      type="date"
      label="Start Date"
      alignment="x"
      bind:value={startDate}
      validation={validateStartDate}
    ></Input>
    <Input
      id="item-end-date"
      type="date"
      label="End Date"
      alignment="x"
      bind:value={endDate}
      required={false}
      validation={validateStartDate}
    ></Input>

    <CheckBoxList label="Days" bind:values={fixedDays} required={true}
    ></CheckBoxList>
    <TimeInput
      id="start-time"
      label="Start Time"
      bind:value={startTime}
      validation={validateStartTime}
    ></TimeInput>
    <TimeInput
      id="end-time"
      label="End Time"
      bind:value={endTime}
      validation={validateStartTime}
    ></TimeInput>
  {:else if occurence.value === "Varying"}
    <TimeLength id="duration" label="Duration" bind:value={varyingDuration}
    ></TimeLength>
    <CheckBox label="Fixed Start Time" bind:checked={varyingHasTime}></CheckBox>
    <TimeInput
      id="start-time"
      label="Start Time"
      bind:value={startTime}
      disabled={!varyingHasTime}
    ></TimeInput>
  {/if}
  <hr />

  <div class="collapse collapse-plus bg-neutral mb-6">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">Advanced Properties</div>
    <div class="collapse-content">
      <Info>
        The following options are not required, but can give the schedule
        generator a better understanding of your day-to-day activities,
        providing a healthier and more balanced lifestyle
      </Info>
      <Select
        id="activity-type"
        label="Activity Type"
        bind:value={activityType}
        options={activityTypes}
        small={false}
        {blankText}
      ></Select>
      <Select
        id="activity-setting"
        label="Setting"
        bind:value={setting}
        options={settings}
        small={false}
        {blankText}
      ></Select>
      <Slider
        id="intensity"
        label="Energy Intensity"
        bind:value={intensity}
        theme="intensity"
      ></Slider>
    </div>
  </div>
</AddItem>

<style>
  hr {
    margin: 0 0 2em 0;
  }
</style>
