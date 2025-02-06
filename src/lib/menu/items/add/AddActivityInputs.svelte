<script>
  import Input from "../../../inputs/Input.svelte";
  import { calendarData } from "../../../../shared.svelte";
  import { dateToInputValue, first3 } from "../../../../helpers";
  import AddItem from "../AddItem.svelte";
  import Select from "../../../inputs/Select.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import { days, times } from "../../../../types";

  let { handleBack, singular } = $props();

  // The default value for the start date is the selected date
  let name = $state({ value: "" });
  const occurences = ["Fixed", "Varying", "Flexible"];
  let occurence = $state({ value: occurences[0] });
  const hours = times.map((time) => time.format24);

  // Fixed activity occurences
  let startDate = $state({ value: dateToInputValue(calendarData.selected) });
  let endDate = $state({ value: "" });
  let fixedDays = $state(
    days.map((day) => ({ label: first3(day), value: false }))
  );
  let fixedStartTime = $state({ value: hours[12] });
  let fixedEndTime = $state({ value: hours[14] });

  function createItem() {
    console.log("Name:", name.value);
    console.log("Start:", startDate.value);
    console.log("End:", endDate.value);
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

    <div class="double-inputs">
      <Select
        id="start-time"
        label="Start Time"
        bind:value={fixedStartTime}
        options={hours}
      ></Select>
      <Select
        id="end-time"
        label="End Time"
        bind:value={fixedEndTime}
        options={hours}
      ></Select>
    </div>
  {/if}
  <br />
</AddItem>

<style>
  .double-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
