<script>
  import Input from "../../../inputs/Input.svelte";
  import { calendarData } from "../../../../shared.svelte";
  import { dateToInputValue } from "../../../../helpers";
  import AddItem from "../AddItem.svelte";
  import Select from "../../../inputs/Select.svelte";

  let { handleBack, singular } = $props();

  // The default value for the start date is the selected date
  let name = $state({ value: "" });
  const occurences = ["Fixed", "Varying", "Flexible"];
  let occurence = $state({ value: occurences[0] });
  let startDate = $state({ value: dateToInputValue(calendarData.selected) });
  let endDate = $state({ value: "" });

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
  {/if}
</AddItem>
