<script lang="ts">
  import { calculateEaster, dateToInputValue } from "../../helpers.js";
  import { calendarData, mDisplay, userData } from "../../shared.svelte";
  import CalendarDay from "./CalendarDay.svelte";

  interface dateInfo {
    date: number;
    class: string;
    data: Record<string, any>;
  }

  let days: dateInfo[] = $derived.by(() => {
    let arr: dateInfo[] = [];
    // Find the date of the first day of the mDisplay.month
    let firstDay = new Date(mDisplay.year, mDisplay.month, 1);
    let lastDay = new Date(mDisplay.year, mDisplay.month + 1, 0).getDate();

    // Find which day the first of this mDisplay.month lands on, with 0 being Monday and 6 being Sunday
    let startDate = firstDay.getDay() - 1;

    if (startDate < 0) {
      startDate += 7;
    }

    // Add each date cell to the calendar
    let selectedOnDisplay =
      calendarData.selected.getMonth() === mDisplay.month &&
      calendarData.selected.getFullYear() === mDisplay.year;
    let today = calendarData.today;
    let todayOnDisplay =
      today.getMonth() === mDisplay.month &&
      today.getFullYear() === mDisplay.year;
    for (let i = 1; i <= 42; i++) {
      let currentDay = i - startDate;
      let currentDate = new Date(mDisplay.year, mDisplay.month, currentDay);

      let dateData: dateInfo = {
        date: 0,
        class: "day flex align-items-start",
        data: { day: currentDate.getDay() - 1 },
      };

      // Get the background color of the date
      dateData.class +=
        selectedOnDisplay && calendarData.selected.getDate() === currentDay
          ? " selected"
          : "";
      dateData.class +=
        todayOnDisplay && today.getDate() === currentDay ? " today" : "";

      // Find the correct date number for the current cell
      if (i > startDate && currentDay <= lastDay) {
        dateData.date = currentDay;
        let dayKey = dateToInputValue(currentDate);
        if (dayKey in userData.calendar) {
          dateData.data = { ...dateData.data, ...userData.calendar[dayKey] };
        }
      } else {
        dateData.class += " blank";
      }
      arr.push(dateData);
    }
    return arr;
  });

  let data = $derived({
    easter: calculateEaster(mDisplay.year),
  });
</script>

<div id="calendar">
  {#each days as day}
    <CalendarDay
      className={day.class}
      date={day.date}
      dayInfo={day.data || null}
      {data}
    ></CalendarDay>
  {/each}
</div>

<style>
  #calendar {
    display: grid;
    height: calc(100% - 1.5em);
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
</style>
