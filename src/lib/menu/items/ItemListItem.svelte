<script lang="ts">
  import { dateToInputValue } from "../../../helpers.js";
  import { calendarData, userData, wDisplay } from "../../../shared.svelte";
  let { children, title, grabData = null, color } = $props();

  function onmousedown(e: MouseEvent) {
    if (grabData) {
      calendarData.itemAdding = true;
      calendarData.itemAddData.id = grabData.id;
      if (
        document.querySelector("#schedule .day") &&
        !(e.target as HTMLElement).closest(".no-drag")
      ) {
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
      }
    }
  }

  function mouseMove(e: MouseEvent) {
    let dayRef = document
      .querySelector("#schedule .day")
      .getBoundingClientRect();
    let currentDay = calendarData.itemAddData.day;

    calendarData.itemAddData = {
      id: grabData.id,
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: dayRef.width,
      height: (dayRef.height / 24) * grabData.duration,
      dayHeight: dayRef.height,
      day: currentDay,
      left: dayRef.left,
      top: dayRef.top,
    };
  }

  // Adds an item to the schedule when the mouse is released
  function mouseUp() {
    let data = calendarData.itemAddData;
    let day = data.day;
    if (day >= 0) {
      // Find the start time of the newly created item
      const draggedItem = document
        .querySelector("#item-drag")
        .getBoundingClientRect();
      const dayRef = document
        .querySelector("#schedule .day")
        .getBoundingClientRect();

      let startTime = Math.round(
        ((draggedItem.top - dayRef.top) / (dayRef.height / 24)) * 60
      );
      let duration = Math.round((data.height / (dayRef.height / 24)) * 60);

      // Add the created item to the data
      let date = dateToInputValue(
        new Date(wDisplay.year, wDisplay.month, wDisplay.day + day)
      );
      let itemData = {
        id: data.id,
        startTime,
        duration,
      };

      if (date in userData.calendar) {
        if (!("userEntered" in userData.calendar[date])) {
          userData.calendar[date].userEntered = [];
        }
        userData.calendar[date].userEntered.push(itemData);
      } else {
        userData.calendar[date] = {
          userEntered: [itemData],
        };
      }
    }

    calendarData.itemAdding = false;
    calendarData.itemAddData = { day: -1 };
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }
</script>

<div
  role="button"
  tabindex="0"
  class="item-list-item border col-{color} mb-6{grabData ? ' grab' : ''}"
  {onmousedown}
  aria-label="Pick Up Item"
>
  <div class="divide-content">
    <h2>{title}</h2>
  </div>
  {@render children()}
</div>

<style>
  .item-list-item {
    border-width: 1px;
    border-radius: 16px;
    padding: 0.5em 1em 1em 1em;

    &.grab {
      cursor: grab;
    }
  }

  h2 {
    font-size: 1.5em;
  }
</style>
