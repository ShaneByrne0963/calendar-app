<script lang="ts">
  import ClickWindow from "../global/ClickWindow.svelte";
  import Graphic from "../global/Graphic.svelte";

  const icons = [
    "art",
    "bicycle",
    "book",
    "camp",
    "coffee",
    "computer",
    "diy",
    "football",
    "guitar",
    "gym",
    "hiking",
    "party",
    "tv",
    "walk",
  ];
</script>

<ClickWindow>
  <div>Pick an icon!</div>
  {#each icons as icon}
    <Graphic width="32" height="32" path={icon}></Graphic>
  {/each}
</ClickWindow>
