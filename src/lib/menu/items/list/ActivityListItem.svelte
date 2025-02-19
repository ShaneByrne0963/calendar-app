<script>
  import {
    convertTimeToDisplay,
    first3,
    inputToDateDisplay,
  } from "../../../../helpers.js";
  import { days, sliderThemeData } from "../../../../types";
  import ItemListItem from "../ItemListItem.svelte";
  import ListItemIcon from "../ListItemIcon.svelte";

  let { data } = $props();

  let startTime = data.startTime ? convertTimeToDisplay(data.startTime) : "";
  let endTime = data.endTime ? convertTimeToDisplay(data.endTime) : "";
  let displayData = {};

  if (data.occurence === "Fixed") {
    displayData.subtitle = ", " + inputToDateDisplay(data.startDate);
    if (data.endDate !== "") {
      displayData.subtitle += "- " + inputToDateDisplay(data.endDate);
    }

    // Format the days to be organised in a neat manner
    let parsedDays = data.fixedDays
      .map((item) => ({
        start: item,
        end: item,
        startLabel: first3(days[item]),
        endLabel: first3(days[item]),
      }))
      .reduce((acc, item) => {
        // Stack the days together if they are checked one after the other
        if (acc.length === 0 || item.start > acc[acc.length - 1].end + 1) {
          acc.push(item);
        } else {
          let endAcc = acc[acc.length - 1];
          endAcc.end = item.start;
          endAcc.endLabel = item.startLabel;
        }
        return acc;
      }, []);
    let formattedDays = "";
    // Convert the data to a readable string format
    for (let day of parsedDays) {
      if (formattedDays !== "") {
        formattedDays += ", ";
      }
      formattedDays += day.startLabel;
      if (day.startLabel !== day.endLabel) {
        // Only include the dash if the start day and end day are not beside each other
        formattedDays +=
          (day.end > day.start + 1 ? " - " : ", ") + day.endLabel;
      }
    }
    displayData.days = formattedDays;
  } else if (data.occurence === "Varying") {
    displayData.subtitle = ", ";
    if (startTime) {
      displayData.subtitle += startTime + ", ";
    }
    let mins = data.duration % 60;
    let hrs = (data.duration - mins) / 60;
    displayData.subtitle += `${hrs} hr${hrs != 1 ? "s" : ""}${mins ? " " + mins + " mins" : ""}`;
  }

  let duration =
    data.occurence === "Fixed"
      ? data.endTime / 60 - data.startTime / 60
      : data.occurence === "Varying"
        ? data.duration / 60
        : 1;

  let grabData = $derived({
    id: data.id,
    startTime: data.startTime,
    duration,
  });

  let iconList = $derived.by(() => {
    let arr = [];

    if ("type" in data) {
      arr.push({
        label: data.type,
        icon: data.type.toLowerCase(),
      });
    }
    if ("setting" in data) {
      arr.push({
        label: data.setting,
        icon: data.setting.toLowerCase(),
      });
    }
    if ("intensity" in data) {
      let theme = sliderThemeData.intensity[data.intensity];
      arr.push({
        label: theme.label,
        icon: "exercise",
        color: theme.color,
      });
    }
    return arr;
  });
</script>

<ItemListItem title={data.name} color={data.color} {grabData}>
  <div class="text-xs">
    {data.occurence}{displayData.subtitle}
  </div>
  {#if data.occurence === "Fixed"}
    <div class="text-xs divide-content">
      <div>{displayData.days}</div>
      <div>
        {startTime} - {endTime}
      </div>
    </div>
  {/if}
  {#if iconList.length > 0}
    <div class="item-footer text-xs mt-2 flex items-center">
      {#each iconList as data}
        <ListItemIcon
          tooltip={data.label}
          icon={data.icon}
          color={data.color}
        />
      {/each}
    </div>
  {/if}
</ItemListItem>

<style>
  .item-footer {
    gap: 8px;
  }
</style>
