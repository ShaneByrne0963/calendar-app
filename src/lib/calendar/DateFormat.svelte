<script lang="ts">
  import { calendarData } from "../../shared.svelte";
  import Graphic from "../Graphic.svelte";

  let { format } = $props();

  function handleFormatChange() {
    calendarData.format = format;
  }
</script>

<button
  id={format}
  class="btn btn-square btn-sm lg:btn-md {calendarData.format === format
    ? 'btn-secondary'
    : 'btn-accent'}"
  aria-label={`Switch to ${format} format`}
  onclick={handleFormatChange}
>
  <Graphic
    width="24"
    height="24"
    pathWidth={448}
    path={format + "View"}
    fill={calendarData.format === format ? "#ffffff" : "#000000"}
  ></Graphic>
</button>
