<script lang="ts">
  import { months } from "../../types";
  import DateChanger from "./DateChanger.svelte";

  let {
    dateLength,
    startDate,
    endDate = null,
    onDateChange,
    leftDisabled = false,
    rightDisabled = false,
  } = $props();
</script>

<div class="date-controller">
  <DateChanger direction={-1} onclick={onDateChange} disabled={leftDisabled} />
  <div class="date-controller-label mx-4">
    {#if dateLength === "d"}
      {startDate.getDate()}
      {months[startDate.getMonth()]}
      {startDate.getFullYear()}
    {:else if dateLength === "w"}
      {startDate.getDate()}
      {months[startDate.getMonth()]}
      {startDate.getFullYear()} - {endDate.getDate()}
      {months[endDate.getMonth()]}
      {endDate.getFullYear()}
    {:else}
      {months[startDate.getMonth()]}
      {startDate.getFullYear()}
    {/if}
  </div>
  <DateChanger direction={1} onclick={onDateChange} disabled={rightDisabled} />
</div>

<style>
  .date-controller {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-controller-label {
    min-width: 20%;
    text-align: center;
    box-sizing: border-box;
  }
</style>
