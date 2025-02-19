<script>
  import {
    compareDates,
    dateToInputValue,
    habitComplete,
  } from "../../../../helpers";
  import { calendarData, userData } from "../../../../shared.svelte";
  import Graphic from "../../../global/Graphic.svelte";
  import ToolTip from "../../../global/ToolTip.svelte";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import NumberInput from "../../../inputs/NumberInput.svelte";
  import ItemListItem from "../ItemListItem.svelte";

  let { data, itemGroup } = $props();

  // Add the habit storage location to the calendar, if none exists
  if (itemGroup === "todaysHabits") {
    const todaysKey = dateToInputValue(new Date());
    if (!(todaysKey in userData.calendar)) {
      userData.calendar[todaysKey] = {
        habitData: {},
      };
    } else if (!("habitData" in userData.calendar[todaysKey])) {
      userData.calendar[todaysKey].habitData = {};
    }
  }
  let record = $state(getRecord());

  // Calculate the previos streak
  const previousStreak = (function () {
    let year = calendarData.today.getFullYear();
    let month = calendarData.today.getMonth();
    let day = calendarData.today.getDate();
    let weekDay = calendarData.today.getDay() - 1;
    if (weekDay < 0) weekDay += 7;
    let streak = 0;

    for (let i = 1; true; i++) {
      let date;
      let result = null;
      // For every day, decrement the date by 1 until the start of the streak is found
      if (data.occurence === "Every day") {
        date = new Date(year, month, day - i);
      } else {
        break;
      }
      // Ensure the checking date is not before the start date
      if (compareDates(date, data.startDate) === "Before") {
        break;
      }

      let dateKey = dateToInputValue(date);
      // Attempt to find the data of the current date iteration
      try {
        result = userData.calendar[dateKey].habitData[data.id];
        if (!habitComplete(data.id, result)) {
          throw new Error("F");
        }
        streak++;
      } catch (error) {
        if (
          error === "F" ||
          !(data.format === "Checkbox" && data.defaultChecked)
        ) {
          break;
        }
      }
    }
    return streak;
  })();

  let subtitle = $derived.by(() => {
    let str = data.occurence;

    return str;
  });

  let complete = $derived(habitComplete(data.id, record));

  // Determines the color
  let color = $derived.by(() => {
    const colors = { success: "lime-500", fail: "red-500" };
    let format = data.format;

    if (format === "Checkbox") {
      if (data.defaultChecked) {
        if (!complete) {
          return colors.fail;
        }
      } else if (complete) {
        return colors.success;
      }
    } else if (format === "Checklist" && complete) {
      return colors.success;
    } else if (format === "Number") {
      let numVal = parseInt(record.value);
      if (!numVal) return "white";

      if (data.limit === "At least") {
        if (numVal >= data.numberAmount) {
          return colors.success;
        }
      } else if (data.limit === "No more than") {
        if (numVal > data.numberAmount) {
          return colors.fail;
        }
      } else {
        if (numVal > data.numberAmount) {
          return colors.fail;
        }
        if (numVal === data.numberAmount) {
          return colors.success;
        }
      }
    }
    return "white";
  });

  let currentStreak = $derived.by(() => {
    if (color === "lime-500") {
      return previousStreak + 1;
    }
    if (color === "red-500") {
      return 0;
    }
    return previousStreak;
  });

  // Save the data every time there is an update
  $effect(() => {
    if (itemGroup === "todaysHabits") {
      const todaysKey = dateToInputValue(new Date());
      if (data.format === "Checkbox") {
        userData.calendar[todaysKey].habitData[data.id] = record;
      } else if (data.format === "Checklist") {
        userData.calendar[todaysKey].habitData[data.id] = record.map(
          (item) => item.value
        );
      } else {
        userData.calendar[todaysKey].habitData[data.id] = record.value;
      }
      userData.habits[data.id].streak = currentStreak;
    }
  });

  // Gets the type of data to be used to record the habit
  function getRecord() {
    const todaysKey = dateToInputValue(new Date());
    if (
      todaysKey in userData.calendar &&
      data.id in userData.calendar[todaysKey].habitData
    ) {
      let result = userData.calendar[todaysKey].habitData[data.id];
      if (data.format === "Checkbox") {
        return result;
      }
      if (data.format === "Checklist") {
        return result.map((item, index) => ({
          label: data.checkList[index],
          value: item,
        }));
      }
      return { value: result.value };
    }
    let format = data.format;
    if (format === "Checkbox") {
      return data.defaultChecked;
    }
    if (format === "Checklist") {
      return data.checkList.map((item) => ({ label: item, value: false }));
    }
    if (format === "Number") {
      return { value: "0" };
    }
  }
</script>

<ItemListItem title={data.name} {color}>
  <div class="text-xs">
    {data.occurence}
  </div>
  {#if itemGroup === "todaysHabits"}
    {#if data.format === "Checkbox"}
      <CheckBox
        id="{data.id}-checkbox"
        label="Mark{record ? 'ed' : ''} as done"
        bind:checked={record}
        margin={false}
      ></CheckBox>
    {:else if data.format === "Checklist"}
      <CheckBoxList bind:values={record} margin={false} size="xs"
      ></CheckBoxList>
    {:else}
      <NumberInput
        id="{data.id}-number"
        label={data.unit}
        placeholder="Amount"
        bind:value={record}
        alignment="x"
        margin={false}
      ></NumberInput>
    {/if}
    <div class="text-xs mt-2 flex items-center">
      <ToolTip text="Streak: {currentStreak}">
        <div class="btn btn-xs btn-neutral">
          <Graphic width="18" height="18" path="streak"></Graphic>
          <span>{currentStreak}</span>
        </div>
      </ToolTip>
    </div>
  {/if}
</ItemListItem>

<style>
  .btn.btn-xs.btn-neutral {
    gap: 4px;
  }
</style>
