<script lang="ts">
  import { compareDates, first3 } from "../../helpers";
  import { userData } from "../../shared.svelte";
  import { days } from "../../types";
  import HourMarkings from "./HourMarkings.svelte";
  import ScheduleDay from "./ScheduleDay.svelte";

  let { dates, hourFormat } = $props();

  let data = $derived.by(() => {
    let fixedActivities = userData.activities.filter(
      (item) => item.occurence === "Fixed"
    );

    return dates.map((day: Date, i: number) => {
      let activities = fixedActivities.filter(
        (item) =>
          compareDates(day, item.startDate) !== "Before" &&
          (!item.endDate || compareDates(day, item.endDate) !== "After") &&
          item.fixedDays.includes(i)
      );
      return {
        date: day,
        index: i,
        fixedActivities: activities,
      };
    });
  });
</script>

<div id="schedule" class={hourFormat}>
  <HourMarkings extrude={true} />
  {#each data as item, index}
    <ScheduleDay data={item} {index}></ScheduleDay>
  {/each}
</div>

<style>
  #schedule {
    margin-left: 3em;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    position: relative;

    &.format12 {
      margin-left: 4em;
    }
  }
</style>
