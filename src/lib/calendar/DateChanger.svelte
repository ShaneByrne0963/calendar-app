<script lang="ts">
  import Graphic from "../global/Graphic.svelte";

  const { direction, onclick, disabled } = $props();
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
</script>

<button
  aria-label={`Go to the ${data.aria} month`}
  class="btn btn-sm btn-accent"
  onclick={() => onclick(direction)}
  {disabled}
>
  <Graphic
    width="24"
    height="24"
    path={data.graphic}
    extraClass={disabled ? "" : "fill-current"}
    fill={"#808080"}
  ></Graphic>
</button>
