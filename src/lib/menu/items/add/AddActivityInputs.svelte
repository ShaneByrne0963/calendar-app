<script>
  import Input from "../../../inputs/Input.svelte";
  import { userData, calendarData } from "../../../../shared.svelte";
  import { dateToInputValue, first3, inputToArray } from "../../../../helpers";
  import AddItem from "../AddItem.svelte";
  import Select from "../../../inputs/Select.svelte";
  import TimeInput from "../../../inputs/TimeInput.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import { days } from "../../../../types";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import TimeLength from "../../../inputs/TimeLength.svelte";
  import Info from "../../../global/Info.svelte";

  let { handleBack, singular } = $props();

  // Constants
  const occurences = ["Fixed", "Varying", "Flexible"];
  const activityTypes = ["Work", "Leisure"];
  const settings = ["Indoors", "Outdoors"];
  const blankText = "Please Select";

  // Input values
  let name = $state({ value: "" });
  let occurence = $state({ value: occurences[0] });
  let activityType = $state({ value: "" });
  let setting = $state({ value: "" });

  // Fixed activity occurences
  let startDate = $state({ value: dateToInputValue(calendarData.selected) });
  let endDate = $state({ value: "" });
  let fixedDays = $state(
    days.map((day) => ({ label: first3(day), value: false }))
  );
  let startTime = $state({ hours: 12, minutes: 0 });
  let endTime = $state({ hours: 12, minutes: 0 });

  // Varying activity occurences
  let varyingDuration = $state({ hours: 1, minutes: 0 });
  let varyingHasTime = $state(false);

  function createItem() {
    let activity = {
      name: name.value,
      occurence: occurence.value,
    };
    // Advanced options. Only add the ones that have been entered by the user
    if (activityType.value) {
      activity.type = activityType.value;
    }
    if (setting.value) {
      activity.setting = setting.value;
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
    <TimeInput id="start-time" label="Start Time" bind:value={startTime}
    ></TimeInput>
    <TimeInput id="end-time" label="End Time" bind:value={endTime}></TimeInput>
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
    </div>
  </div>
</AddItem>

<style>
  hr {
    margin: 0 0 2em 0;
  }
</style>
