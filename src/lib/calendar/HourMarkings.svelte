<script lang="ts">
  let { extrude = false } = $props();
  let hours: string[] = [];

  for (let i = 0; i < 24; i++) {
    hours.push(`${i < 10 ? "0" : ""}${i}:00`);
  }
</script>

<div class="hour-markings{extrude ? ' extrude' : ''}">
  {#each hours as hour}
    <div class="hour">{hour}</div>
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
        border-top: 1px solid var(--color-stone-200);
      }
    }
  }

  .hour {
    height: calc(100% / 24);
    pointer-events: none;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-stone-200);
    }
  }
</style>
