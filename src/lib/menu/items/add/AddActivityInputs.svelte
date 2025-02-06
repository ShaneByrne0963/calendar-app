<script>
  import Input from "../../../inputs/Input.svelte";
  import { calendarData } from "../../../../shared.svelte";
  import { dateToInputValue } from "../../../../helpers";

  // The default value for the start date is the selected date
  const startDateDefault = dateToInputValue(calendarData.selected);
</script>

<Input id="item-name" label="Name"></Input>
<Input
  id="item-start-date"
  type="date"
  label="Start Date"
  alignment="x"
  value={startDateDefault}
></Input>
<Input
  id="item-end-date"
  type="date"
  label="End Date"
  alignment="x"
  required={false}
></Input>
