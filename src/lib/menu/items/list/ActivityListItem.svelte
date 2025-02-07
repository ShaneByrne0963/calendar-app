<script>
  import { inputToDateDisplay } from "../../../../helpers";
  import ItemListItem from "../ItemListItem.svelte";

  let { data } = $props();

  let displayData = {};

  if (data.occurence === "Fixed") {
    displayData.subtitle = ", " + inputToDateDisplay(data.startDate);
    if (data.endDate !== "") {
      displayData.subtitle += "- " + inputToDateDisplay(data.endDate);
    }

    // Format the days to be organised in a neat manner
    let parsedDays = data.fixedDays
      .map((item, index) => ({
        start: index,
        end: index,
        startLabel: item.label,
        endLabel: item.label,
        value: item.value,
      }))
      .filter((item) => item.value)
      .reduce((acc, item) => {
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
    for (let day of parsedDays) {
      if (formattedDays !== "") {
        formattedDays += ", ";
      }
      formattedDays += day.startLabel;
      if (day.startLabel !== day.endLabel) {
        formattedDays += " - " + day.endLabel;
      }
    }
    displayData.days = formattedDays;
  }
</script>

<ItemListItem title={data.name}>
  <div class="text-xs">
    {data.occurence}{displayData.subtitle}
  </div>
  {#if data.occurence === "Fixed"}
    <div class="text-xs">{displayData.days}</div>
  {/if}
  <div class="text-xs">{data.type}</div>
</ItemListItem>
