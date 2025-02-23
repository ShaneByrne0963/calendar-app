<script lang="ts">
  import { userData } from "../../shared.svelte";

  let { id, day, isToday, key, data, start, end, isDuration = true } = $props();

  let attended = $state(getAttendance());
  let ref = $state(null);
  let resizing = $state("");
  let resizeData = $state(null);

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

  function onmousemove(e: MouseEvent) {
    if (resizing === "" || resizing === "Hover") {
      let rect = ref.getBoundingClientRect();
      let mouseY = e.clientY;
      resizing = "";

      if (
        Math.abs(rect.top - mouseY) <= 4 ||
        Math.abs(rect.bottom - mouseY) <= 4
      ) {
        resizing = "Hover";
      }
    }
  }

  function onmousedown(e: MouseEvent) {
    if (resizing === "Hover") {
      let rect = ref.getBoundingClientRect();
      let mouseY = e.clientY;
      if (Math.abs(rect.top - mouseY) <= 4) {
        resizing = "Top";
      } else {
        resizing = "Bottom";
      }
      resizeData = {
        mouseYStart: mouseY,
        start: pStart,
        end: pEnd,
      };
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", mouseup);
    }
  }

  function resize(e: MouseEvent) {
    let dayRect = document
      .querySelector("#schedule .day")
      .getBoundingClientRect();
    let yDiff =
      Math.round((e.clientY - resizeData.mouseYStart) / (dayRect.height / 96)) /
      4;
    if (resizing === "Top") {
      resizeData.start = pStart + yDiff;
      resizeData.end = pEnd - yDiff;
    } else {
      resizeData.end = pEnd + yDiff;
    }
  }

  function mouseup() {
    resizing = "";

    // Saving the new resize in the data
    if ("dataIndex" in data) {
      // User entered activities
      let dataUpdate = userData.calendar[key].userEntered[data.dataIndex];
      dataUpdate.startTime = resizeData.start * 60;
      dataUpdate.endTime = resizeData.end * 60;
    } else {
      // For fixed activities, add the activity to an exception list and replace with a user-entered one
      if (!(key in userData.calendar)) {
        userData.calendar[key] = {
          exceptions: [],
        };
      }
      // If the activity is present more than once in the day, then remove the extra id distinction
      else if (!("exceptions" in userData.calendar[key])) {
        userData.calendar[key].exceptions = [];
      }
      let activityId = id.split("-")[0];
      userData.calendar[key].exceptions.push(activityId);
      if (!("userEntered" in userData.calendar[key])) {
        userData.calendar[key].userEntered = [];
      }
      userData.calendar[key].userEntered.push({
        id: activityId,
        startTime: resizeData.start * 60,
        endTime: resizeData.end * 60,
      });
    }
    resizeData = null;

    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", mouseup);
  }
</script>

<button
  class="slot background col-{data.color} text-black{small
    ? ' tiny'
    : ''}{resizing ? ' resize' : ''}"
  style={`top: calc((100% / 24) * ${resizeData ? resizeData.start : pStart}); height: calc((100% / 24) * ${resizeData ? resizeData.end : pEnd})`}
  {onmousemove}
  {onmousedown}
  bind:this={ref}
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
</button>

<style>
  .slot {
    position: absolute;
    display: flex;
    flex-direction: column;
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

    &.resize {
      cursor: ns-resize;
    }
  }

  .checkbox-sm {
    border-color: black;
  }
</style>
