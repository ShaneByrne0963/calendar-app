<script lang="ts">
  let { data } = $props();
</script>

<div class="slot bg-secondary">{data.name}</div>

<style>
  .slot {
    position: absolute;
    top: 0;
    left: 50%;
    width: 95%;
    transform: translate(-50%, 0);
    border-radius: 16px;
  }
</style>
