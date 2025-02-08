<script>
  import Input from "../../../inputs/Input.svelte";
  import { userData, calendarData } from "../../../../shared.svelte";
  import { dateToInputValue, first3, inputToArray } from "../../../../helpers";
  import AddItem from "../AddItem.svelte";
  import Select from "../../../inputs/Select.svelte";
  import TimeInput from "../../../inputs/TimeInput.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import { days, times } from "../../../../types";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import test from "node:test";

  let { handleBack, singular } = $props();

  // Constants
  const occurences = ["Fixed", "Varying", "Flexible"];
  const hours = times.map((time) => time[userData.preferences.timeFormat]);
  const activityTypes = ["Work", "Leisure"];
  const settings = ["Indoors", "Outdoors"];

  let testTime = $state({ hours: 12, minutes: 0 });

  // Input values
  let name = $state({ value: "" });
  let occurence = $state({ value: occurences[0] });
  let activityType = $state({ value: activityTypes[0] });
  let setting = $state({ value: settings[0] });

  // Fixed activity occurences
  let startDate = $state({ value: dateToInputValue(calendarData.selected) });
  let endDate = $state({ value: "" });
  let fixedDays = $state(
    days.map((day) => ({ label: first3(day), value: false }))
  );
  let startTime = $state({ value: hours[12] });
  let endTime = $state({ value: hours[14] });

  // Data that will not be stored in the activity
  let varyingHasTime = $state(false);

  function createItem() {
    let activity = {
      name: name.value,
      occurence: occurence.value,
      type: activityType.value,
      setting: setting.value,
    };
    let occurenceSpecific = {};
    // For fixed activities
    if (occurence.value === occurences[0]) {
      // Parse the start and end dates
      let pStartDate = inputToArray(startDate.value);
      let pEndDate = "";
      if (endDate.value) {
        pEndDate = inputToArray(endDate.value);
      }

      occurenceSpecific = {
        startDate: pStartDate,
        endDate: pEndDate,
        fixedDays: [...fixedDays],
        startTime: hours.indexOf(startTime.value),
        endTime: hours.indexOf(endTime.value),
      };
    }
    // For varying activities
    else if (occurence.value === occurences[1]) {
      if (varyingHasTime) {
        occurenceSpecific = {
          startTime: hours.indexOf(startTime.value),
          endTime: hours.indexOf(endTime.value),
        };
      }
    }
    userData.activities.push({ ...activity, ...occurenceSpecific });
    handleBack();
  }
</script>

<AddItem {handleBack} {singular} {createItem}>
  <Input id="item-name" label="Name" bind:value={name}></Input>
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
    ></Input>
    <Input
      id="item-end-date"
      type="date"
      label="End Date"
      alignment="x"
      bind:value={endDate}
      required={false}
    ></Input>

    <CheckBoxList label="Days" bind:values={fixedDays}></CheckBoxList>
  {:else if occurence.value === "Varying"}
    <CheckBox label="Fixed Time" bind:checked={varyingHasTime}></CheckBox>
  {/if}
  {#if occurence.value !== "Flexible"}
    <div class="double-inputs">
      <TimeInput id="start-time" label="Start Time" bind:value={testTime}
      ></TimeInput>
    </div>
    <div class="double-inputs">
      <Select
        id="start-time"
        label="Start Time"
        bind:value={startTime}
        options={hours}
        disabled={occurence.value === "Varying" && !varyingHasTime}
      ></Select>
      <Select
        id="end-time"
        label="End Time"
        bind:value={endTime}
        options={hours}
        disabled={occurence.value === "Varying" && !varyingHasTime}
      ></Select>
    </div>
  {/if}
  <br />
  <Select
    id="activity-type"
    label="Activity Type"
    value={activityType}
    options={activityTypes}
    small={false}
  ></Select>
  <Select
    id="activity-setting"
    label="Setting"
    value={setting}
    options={settings}
    small={false}
  ></Select>
</AddItem>

<style>
  .double-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
