<script lang="ts">
  import { addZeroToNumber } from "../../helpers";
  import { userData } from "../../shared.svelte";
  import Select from "./Select.svelte";

  let { id, label, value, disabled = false, validation = null } = $props();

  let numHours = $derived(
    parseInt(userData.preferences.timeFormat.replace("format", ""))
  );
  let hours = $state({
    value:
      userData.preferences.timeFormat === "format12"
        ? `${value.hours}`
        : addZeroToNumber(value.hours),
  });
  let minutes = $state({ value: addZeroToNumber(value.minutes) });
  let time = $state({ value: "PM" });

  let hourOptions = $derived.by(() => {
    let arr = [];
    for (let i = 0; i < numHours; i++) {
      arr.push(numHours === 24 ? `${addZeroToNumber(i)}` : `${i + 1}`);
    }
    return arr;
  });
  let minuteOptions = [];
  for (let i = 0; i < 60; i += 5) {
    minuteOptions.push(`${i < 10 ? 0 : ""}${i}`);
  }

  function onchange() {
    const hrs = parseInt(hours.value);
    if (numHours === 24) {
      value.hours = hrs;
    } else {
      if (hrs === 12 && time.value === "AM") {
        value.hours = 0;
      } else if (time.value === "PM") {
        value.hours = hrs + 12;
      } else {
        value.hours = hrs;
      }
    }
    value.minutes = parseInt(minutes.value);

    // Validation
    if ("feedback" in value) {
      value.feedback = "";
    }
    validation?.();
  }
</script>

<div class="mb-5">
  <div>{label}</div>
  <div class="grid format-{numHours}">
    <Select
      id="{id}-hours"
      label="{label} (Hours)"
      labelHidden={true}
      bind:value={hours}
      options={hourOptions}
      margin={false}
      {disabled}
      {onchange}
    ></Select>
    <div class="text-lg mx-1">:</div>
    <Select
      id="{id}-minutes"
      label="{label} (Minutes)"
      labelHidden={true}
      bind:value={minutes}
      options={minuteOptions}
      margin={false}
      {disabled}
      {onchange}
    ></Select>
    {#if numHours === 12}
      <span></span>
      <Select
        id="{id}-time"
        label="AM or PM"
        labelHidden={true}
        bind:value={time}
        options={["AM", "PM"]}
        {disabled}
        {onchange}
      ></Select>
    {/if}
  </div>
  {#if value.feedback}
    <p class="text-error text-xs">{value.feedback}</p>
  {/if}
</div>

<style>
  .grid.format-12 {
    grid-template-columns: 3fr auto 3fr 4px 2fr;
  }

  .grid.format-24 {
    grid-template-columns: 1fr auto 1fr;
  }
</style>
