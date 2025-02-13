<script lang="ts">
  import { compareDates } from "../../../../helpers";
  import { calendarData } from "../../../../shared.svelte";
  import DateController from "../../../calendar/DateController.svelte";
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";

  let { handleBack } = $props();

  let selectedDate = $state(new Date());

  function onDateChange(direction: 1 | -1) {
    if (
      direction === -1 ||
      compareDates(selectedDate, calendarData.today) === "Before"
    ) {
      selectedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + direction
      );
    }
  }
</script>

<Submenu {handleBack}>
  <SubmenuHeading text="Journal"></SubmenuHeading>
  <DateController
    dateLength="d"
    startDate={selectedDate}
    {onDateChange}
    rightDisabled={compareDates(selectedDate, calendarData.today) !== "Before"}
  ></DateController>
</Submenu>
