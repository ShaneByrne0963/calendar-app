<script lang="ts">
  import { months } from "../../types";
  import DateChanger from "./DateChanger.svelte";

  let { dateLength, startDate, endDate = null } = $props();
</script>

<div class="date-controller">
  <DateChanger direction={-1} />
  <div class="date-controller-label">
    {#if dateLength === "d"}
      Day
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
  <DateChanger direction={1} />
</div>

<style>
  .date-controller {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date-controller-label {
    min-width: 30%;
    text-align: center;
  }
</style>
