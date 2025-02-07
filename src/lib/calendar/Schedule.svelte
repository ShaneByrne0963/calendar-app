<script lang="ts">
  import HourMarkings from "./HourMarkings.svelte";
  import ScheduleDay from "./ScheduleDay.svelte";

  let { dates, hourFormat } = $props();

  let data = $derived.by(() => {
    let arr: Record<string, any>[] = [];

    for (let day of dates) {
      arr.push({
        date: day,
      });
    }
    return arr;
  });
</script>

<div id="schedule" class={hourFormat}>
  <HourMarkings extrude={true} />
  {#each data as item, i}
    <ScheduleDay
      date={item.date.getDate()}
      month={item.date.getMonth()}
      year={item.date.getFullYear()}
      data={{}}
    ></ScheduleDay>
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
