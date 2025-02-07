<script lang="ts">
  let { children, title } = $props();
</script>

<div class="item-list-item border-secondary mb-6">
  <h2>{title}</h2>
  {@render children()}
</div>

<style>
  .item-list-item {
    border-width: 1px;
    border-radius: 16px;
    padding: 0.5em 1em 1em 1em;
  }

  h2 {
    font-size: 1.5em;
  }
</style>
