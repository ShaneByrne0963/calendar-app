<script>
  import {
    convertTimeToDisplay,
    displaySelectedDays,
    inputToDateDisplay,
  } from "../../../../helpers.js";
  import { sliderThemeData } from "../../../../types";
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
    displayData.days = displaySelectedDays(data.fixedDays);
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
          text={data.text}
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
