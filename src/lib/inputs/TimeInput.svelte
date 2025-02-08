<script lang="ts">
  import { userData } from "../../shared.svelte";
  import Select from "./Select.svelte";

  let { id, label, value } = $props();
  let hours = $state({ value: "09" });
  let minutes = $state({ value: "00" });

  let timeFormat = userData.preferences.timeFormat;
  let numHours = parseInt(timeFormat.replace("format", ""));

  let hourOptions = [];
  let minuteOptions = [];
  for (let i = 0; i < numHours; i++) {
    hourOptions.push(numHours === 24 ? `${i < 10 ? 0 : ""}${i}` : i + 1);
  }
  for (let i = 0; i < 60; i += 5) {
    minuteOptions.push(`${i < 10 ? 0 : ""}${i}`);
  }

  $effect(() => {
    value.hours = parseInt(hours.value);
    value.minutes = parseInt(minutes.value);
  });
</script>

<div>
  <label>{label}</label>
  <div class="grid grid-cols-2">
    <Select
      id="{id}-hours"
      label="{label} (Hours)"
      labelHidden={true}
      bind:value={hours}
      options={hourOptions}
    ></Select>
    <Select
      id="{id}-minutes"
      label="{label} (Minutes)"
      labelHidden={true}
      bind:value={minutes}
      options={minuteOptions}
    ></Select>
  </div>
</div>
