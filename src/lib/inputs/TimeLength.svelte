<script lang="ts">
  import { timeAsNumber } from "../../helpers.js";
  import { inputFeedback } from "../../validation";
  import Select from "./Select.svelte";

  let { id, label, value } = $props();
  let hours = $state({ value: "" + value.hours });
  let minutes = $state({ value: "" + value.minutes });

  let hourOptions = [];
  for (let i = 0; i <= 20; i++) {
    hourOptions.push(`${i}`);
  }
  let minuteOptions = [];
  for (let i = 0; i < 60; i += 5) {
    minuteOptions.push(`${i}`);
  }

  function onchange() {
    const hrs = parseInt(hours.value);
    const mins = parseInt(minutes.value);
    value.hours = hrs;
    value.minutes = mins;

    value.feedback =
      timeAsNumber({ hours: hrs, minutes: mins }) === 0
        ? inputFeedback.zeroDuration
        : "";
  }
</script>

<div class="mb-5">
  <div>{label}</div>
  <div class="grid grid-cols-4">
    <Select
      id="{id}-hours"
      label="{label} (Hours)"
      labelHidden={true}
      bind:value={hours}
      margin={false}
      options={hourOptions}
      {onchange}
    ></Select>
    <div class="ml-1 mt-1">hour{parseInt(hours.value) !== 1 ? "s" : ""}</div>
    <Select
      id="{id}-minutes"
      label="{label} (Minutes)"
      labelHidden={true}
      bind:value={minutes}
      margin={false}
      options={minuteOptions}
      {onchange}
    ></Select>
    <div class="ml-1 mt-1">minutes</div>
  </div>
  {#if value.feedback}
    <p class="text-error text-xs">{value.feedback}</p>
  {/if}
</div>

<style>
  .grid {
    grid-template-columns: 3fr 2fr 3fr 2fr;
  }
</style>
