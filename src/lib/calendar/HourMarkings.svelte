<script lang="ts">
  import { times } from "../../types";
  import { userData } from "../../shared.svelte";

  let { showNumbers = true, extrude = false, extraClass = "" } = $props();

  const hourPreference = userData.preferences.timeFormat;
  let hours: string[] = times.map((time) => time[hourPreference]);
</script>

<div class="hour-markings{extrude ? ' extrude' : ''} {hourPreference}">
  {#each hours as hour}
    <div class={"hour" + (extraClass ? ` ${extraClass}` : "")}>
      {showNumbers ? hour : ""}
    </div>
  {/each}
</div>

<style>
  .hour-markings {
    position: absolute;
    pointer-events: none;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.extrude {
      width: calc(100% + 3em);
      left: -3em;

      .hour:first-child {
        border-top: 1px solid var(--color-stone-500);
      }

      &.format12 {
        width: calc(100% + 4em);
        left: -4em;
      }
    }

    &.cover-border {
      top: -1px;
      left: -1px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
    }
  }

  .hour {
    height: calc(100% / 24);
    box-sizing: border-box;
    pointer-events: none;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-stone-500);

      &.cover-accent {
        border-bottom-color: var(--color-teal-600);
      }
    }
  }
</style>
