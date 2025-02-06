<script>
  import Input from "../../../inputs/Input.svelte";
  import { calendarData } from "../../../../shared.svelte";
  import { dateToInputValue } from "../../../../helpers";

  // The default value for the start date is the selected date
  let name = $state({ value: "" });
  let startDate = $state({ value: dateToInputValue(calendarData.selected) });
  let endDate = $state({ value: "" });
</script>

<Input id="item-name" label="Name" bind:value={name}></Input>
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
{name.value}
