<script>
  import {
    compareDates,
    dateToInputValue,
    displaySelectedDays,
    getNumberPlace,
    habitComplete,
  } from "../../../../helpers";
  import {
    calendarData,
    sessionData,
    userData,
  } from "../../../../shared.svelte";
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import NumberInput from "../../../inputs/NumberInput.svelte";
  import ItemListItem from "../ItemListItem.svelte";
  import ListItemIcon from "../ListItemIcon.svelte";

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
  const previousStreak = sessionData.habitStreaks[data.id];

  let occurence = $derived.by(() => {
    const occ = data.occurence;
    if (occ === "Specific days of the week") {
      return displaySelectedDays(data.days) + " every week";
    }
    if (occ === "Specific days of the month") {
      return (
        "The " +
        data.days.map((day) => getNumberPlace(day + 1)).join(", ") +
        " of each month"
      );
    }
    if (occ === "Times per period") {
      let str = "";
      const freq = data.frequency;
      if (freq === 1) {
        str = "Once";
      } else if (freq === "2") {
        str === "Twice";
      } else {
        str = data.frequency + " times";
      }
      return `${str} a ${data.periodLength.toLowerCase()}`;
    }
    return occ;
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
      if (!(data.occurence === "Times per period")) {
        return previousStreak + 1;
      }
      // Checking if the amount of habits in the selected period of time has been completed
      let today = calendarData.today;
      let count = 1;
      let currentDay = today.getDay() - 1;
      if (currentDay < 0) currentDay += 7;

      let current = new Date(
        today.getFullYear(),
        today.getMonth(),
        data.periodLength === "Week" ? today - currentDay : 1
      );
      while (compareDates(current, today) === "Before") {
        let currentKey = dateToInputValue(current);
        try {
          let result = userData.calendar[currentKey].habitData[data.id];
          if (habitComplete(data.id, result, true)) {
            count++;
          }
        } catch {}
        current = new Date(
          current.getFullYear(),
          current.getMonth(),
          current.getDate() + 1
        );
      }
      if (count >= data.frequency) {
        return previousStreak + 1;
      }
      return 0;
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
    {occurence}
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
  {/if}
  <div class="text-xs mt-2 flex items-center">
    <ListItemIcon
      tooltip="Streak: {currentStreak}"
      icon="streak"
      text={currentStreak}
    />
    {#if data.goal}
      <ListItemIcon tooltip="Goal: {data.goal}" icon="goal" text={data.goal} />
    {/if}
    <ListItemIcon
      tooltip="Best: {Math.max(data.record, currentStreak)}"
      icon="record"
      text={Math.max(data.record, currentStreak)}
    />
  </div>
</ItemListItem>

<style>
  .flex.items-center {
    gap: 4px;
  }
</style>
