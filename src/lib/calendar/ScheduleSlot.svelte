<script lang="ts">
  import { userData } from "../../shared.svelte";

  let { id, day, isToday, key, data, start, end, isDuration = true } = $props();

  let attended = $state(getAttendance());

  let pStart = $derived(start / 60);
  let pEnd = $derived(isDuration ? end / 60 : end / 60 - pStart);
  let small = $derived(pEnd < 0.5);
  let tiny = $derived(pEnd < 0.25);

  // Save the data to remember the attendence
  function onchange() {
    if (attended) {
      if (!(key in userData.calendar)) {
        userData.calendar[key] = {
          attendance: [],
        };
      } else if (!("attendance" in userData.calendar[key])) {
        userData.calendar[key].attendance = [];
      }
      userData.calendar[key].attendance.push(id);
    } else {
      let ref = userData.calendar[key].attendance;
      let index = ref.indexOf(id);
      if (index !== -1) {
        ref.splice(index, 1);
        if (ref.length === 0) {
          delete userData.calendar[key].attendance;
        }
      }
    }
  }

  $effect(() => {
    attended = getAttendance();
  });

  function getAttendance() {
    try {
      return userData.calendar[key].attendance.includes(id);
    } catch {
      return false;
    }
  }
</script>

<div
  class="slot background col-{data.color} text-black{small ? ' tiny' : ''}"
  style={`top: calc((100% / 24) * ${pStart}); height: calc((100% / 24) * ${pEnd})`}
>
  {#if !tiny}
    <div class="flex items-center justify-between">
      <span class={small ? "text-xs" : ""}>{data.name}</span>
      {#if "attendance" in data}
        <label for="{day}-{id}" hidden={true}></label>
        <input
          id="{day}-{id}"
          type="checkbox"
          class="checkbox checkbox-{small ? 'xs' : 'sm'}"
          bind:checked={attended}
          {onchange}
          disabled={!isToday}
        />
      {/if}
    </div>
  {/if}
</div>

<style>
  .slot {
    position: absolute;
    left: 50%;
    width: 95%;
    transform: translate(-50%, 0);
    border-radius: 12px;
    z-index: 1;
    cursor: pointer;
    padding: 6px;

    &.tiny {
      padding: 0 4px;
    }
  }

  .checkbox-sm {
    border-color: black;
  }
</style>
