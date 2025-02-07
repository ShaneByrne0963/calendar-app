<script lang="ts">
  let { name } = $props();
</script>

<div class="slot bg-secondary">{name}</div>

<style>
  .slot {
    position: absolute;
    top: 0;
    left: 50%;
    width: 90%;
    transform: translate(-50%, 0);
    border-radius: 16px;
  }
</style>
