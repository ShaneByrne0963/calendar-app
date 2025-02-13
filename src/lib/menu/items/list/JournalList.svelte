<script lang="ts">
  import DateController from "../../../calendar/DateController.svelte";
  import Submenu from "../../Submenu.svelte";
  import SubmenuHeading from "../../SubmenuHeading.svelte";

  let { handleBack } = $props();

  let selectedDate = $state(new Date());

  function onDateChange(direction: 1 | -1) {
    selectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + direction
    );
  }
</script>

<Submenu {handleBack}>
  <SubmenuHeading text="Journal"></SubmenuHeading>
  <DateController dateLength="d" startDate={selectedDate} {onDateChange}
  ></DateController>
</Submenu>
