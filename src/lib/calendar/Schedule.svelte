<script>
  import { compareDates, inputToArray } from "../../helpers.js";
  import { userData } from "../../shared.svelte";
  import HourMarkings from "./HourMarkings.svelte";
  import ScheduleDay from "./ScheduleDay.svelte";

  let { dates, hourFormat } = $props();

  let data = $derived.by(() => {
    let fixedActivities = [];

    for (let [key, value] of Object.entries(userData.activities)) {
      if (key !== "id" && value.occurence === "Fixed") {
        fixedActivities.push(value);
      }
    }
    return dates.map((day, i) => {
      let activities = fixedActivities.filter(
        (item) =>
          compareDates(day, inputToArray(item.startDate)) !== "Before" &&
          (!item.endDate ||
            compareDates(day, inputToArray(item.endDate)) !== "After") &&
          item.fixedDays.includes(i)
      );
      return {
        date: day,
        index: i,
        fixedActivities: activities,
      };
    });
  });

  // Scroll to the bottom of the timetable if it's spread out
  if (userData.preferences.hiddenMorningHours > 0) {
    setTimeout(() => {
      const el = document.getElementById("calendar-main");
      el.scrollTo(0, el.scrollHeight);
    });
  }
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
    height: calc(100% - 1.5em);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    position: relative;

    &.format12 {
      margin-left: 4em;
    }
  }
</style>
