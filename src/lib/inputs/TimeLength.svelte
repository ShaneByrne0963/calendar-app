<script lang="ts">
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

  $effect(() => {
    value.hours = parseInt(hours.value);
    value.minutes = parseInt(minutes.value);
  });
</script>

<div>
  <div>{label}</div>
  <div class="grid grid-cols-4">
    <Select
      id="{id}-hours"
      label="{label} (Hours)"
      labelHidden={true}
      bind:value={hours}
      options={hourOptions}
    ></Select>
    <div class="ml-1 mt-1">hour{parseInt(hours.value) !== 1 ? "s" : ""}</div>
    <Select
      id="{id}-minutes"
      label="{label} (Minutes)"
      labelHidden={true}
      bind:value={minutes}
      options={minuteOptions}
    ></Select>
    <div class="ml-1 mt-1">minutes</div>
  </div>
</div>

<style>
  .grid {
    grid-template-columns: 3fr 2fr 3fr 2fr;
  }
</style>
