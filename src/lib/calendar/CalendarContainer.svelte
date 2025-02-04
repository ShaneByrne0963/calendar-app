<script lang="ts">
  import { first3 } from "../../helpers";
  import { days, months } from "../../types";
  import Graphic from "../Graphic.svelte";
  import Calendar from "./Calendar.svelte";
  import Schedule from "./Schedule.svelte";

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  let format: "weekly" | "monthly" = $state("weekly");
  let mDisplayMonth = $state(month);
  let mDisplayYear = $state(year);
  let selectedDate = $state(today);

  // Get all of the days for the week's schedule
  let wDisplayStart = $state(
    new Date(year, month, today.getDate() - today.getDay() + 1)
  );
  let weekData = $derived.by(() => {
    let arr: Date[] = [wDisplayStart];

    for (let i = 1; i < 7; i++) {
      arr.push(
        new Date(
          wDisplayStart.getFullYear(),
          wDisplayStart.getMonth(),
          wDisplayStart.getDate() + i
        )
      );
    }
    return arr;
  });

  function handleDateDisplayChange(direction: 1 | -1) {
    if (format === "weekly") {
      wDisplayStart = new Date(
        wDisplayStart.getFullYear(),
        wDisplayStart.getMonth(),
        wDisplayStart.getDate() + 7 * direction
      );
    } else {
      mDisplayMonth += direction;
      if (mDisplayMonth < 0) {
        mDisplayMonth += 12;
        mDisplayYear -= 1;
      } else if (mDisplayMonth > 11) {
        mDisplayMonth -= 12;
        mDisplayYear += 1;
      }
    }
  }

  function handleDateClick() {
    if (format === "weekly") {
      let day = parseInt(this.getAttribute("data-date"));
      selectedDate = new Date(
        wDisplayStart.getFullYear(),
        wDisplayStart.getMonth(),
        day
      );
      // Update the month display to easily get to the selected date in the other format
      mDisplayMonth = selectedDate.getMonth();
      mDisplayYear = selectedDate.getFullYear();
    } else {
      let day = parseInt(this.querySelector(".date-number").innerText);
      selectedDate = new Date(mDisplayYear, mDisplayMonth, day);

      // Update the week display for the same reason
      wDisplayStart = new Date(
        mDisplayYear,
        mDisplayMonth,
        day - selectedDate.getDay() + 1
      );
    }
  }

  function handleFormatChange() {
    format = this.id;
  }
</script>

<div id="calendar-container">
  <div id="calendar-header">
    <div id="calendar-view-panel">
      <div class="tooltip tooltip-bottom" data-tip="Schedule">
        <button
          id="weekly"
          class="btn btn-square{format === 'weekly' ? ' btn-accent' : ''}"
          aria-label="Switch to Weekly Schedule"
          onclick={handleFormatChange}
        >
          <Graphic width="6" height="6" pathWidth={448} path={"weeklyView"}
          ></Graphic>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Calendar">
        <button
          id="monthly"
          class="btn btn-square{format === 'monthly' ? ' btn-accent' : ''}"
          aria-label="Switch to Monthly Calendar"
          onclick={handleFormatChange}
        >
          <Graphic width="6" height="6" pathWidth={448} path={"monthlyView"}
          ></Graphic>
        </button>
      </div>
    </div>
    <div id="calendar-navigation">
      <button
        aria-label="Go to the previous month"
        class="btn btn-sm"
        onclick={() => handleDateDisplayChange(-1)}
      >
        <Graphic
          width="6"
          height="6"
          pathWidth={24}
          pathHeight={24}
          path={"back"}
          extraClass="fill-current"
        ></Graphic>
      </button>
      <div id="date-label">
        {format === "weekly"
          ? `${weekData[0].getDate()} ${months[weekData[0].getMonth()]} - ${weekData[6].getDate()} ${months[weekData[6].getMonth()]}`
          : `${months[mDisplayMonth]} ${mDisplayYear}`}
      </div>
      <button
        aria-label="Go to the next month"
        class="btn btn-sm"
        onclick={() => handleDateDisplayChange(1)}
      >
        <Graphic
          width="6"
          height="6"
          pathWidth={24}
          pathHeight={24}
          path={"forward"}
          extraClass="fill-current"
        ></Graphic>
      </button>
    </div>
    <div id="date-headings" class="border-1 text-white bg-primary">
      {#each days as day, i}
        <div class="ml-1">
          {first3(day)}
          {format === "weekly"
            ? ` ${weekData[i].getDate()} ${first3(months[weekData[i].getMonth()])}`
            : ""}
        </div>
      {/each}
    </div>
  </div>
  {#if format === "weekly"}
    <Schedule data={weekData} {selectedDate} {handleDateClick} />
  {:else}
    <Calendar
      month={mDisplayMonth}
      year={mDisplayYear}
      {selectedDate}
      {handleDateClick}
    />
  {/if}
</div>

<style>
  #calendar-container {
    height: calc(100vh - 1.5em);
    display: grid;
    grid-template-rows: 6.6em 1fr;
  }

  #calendar-header {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  #date-headings {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  #calendar-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #date-label {
    min-width: 30%;
    text-align: center;
  }
</style>
