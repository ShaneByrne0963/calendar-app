<script lang="ts">
  import { calendarData, mDisplay, wDisplay } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";

  const { direction } = $props();
  let data =
    direction == -1
      ? {
          aria: "previous",
          graphic: "back",
        }
      : {
          aria: "next",
          graphic: "forward",
        };

  function handleDateDisplayChange(direction: 1 | -1) {
    if (calendarData.format === "weekly") {
      let newWeek = new Date(
        wDisplay.year,
        wDisplay.month,
        wDisplay.day + 7 * direction
      );
      wDisplay.set(newWeek);
    } else {
      mDisplay.month += direction;
      if (mDisplay.month < 0) {
        mDisplay.month += 12;
        mDisplay.year -= 1;
      } else if (mDisplay.month > 11) {
        mDisplay.month -= 12;
        mDisplay.year += 1;
      }
    }
  }
</script>

<button
  aria-label={`Go to the ${data.aria} month`}
  class="btn btn-sm btn-accent"
  onclick={() => handleDateDisplayChange(direction)}
>
  <Graphic width="24" height="24" path={data.graphic} extraClass="fill-current"
  ></Graphic>
</button>
