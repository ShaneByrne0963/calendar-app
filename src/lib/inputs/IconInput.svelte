<script lang="ts">
  let { label = "Icon" } = $props();
</script>

<div class="icon-divider mb-5">
  <span>{label}</span>
  <button class="icon-container" aria-label="Select icon"></button>
</div>

<style>
  .icon-divider {
    display: grid;
    grid-template-columns: 4fr 1fr;
    align-items: center;
  }

  .icon-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 1px solid white;
    border-radius: 8px;
  }
</style>
