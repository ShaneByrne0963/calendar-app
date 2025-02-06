<script lang="ts">
  let { text, children = null } = $props();
</script>

<div class="heading">
  <h1>{text}</h1>
  {@render children?.()}
</div>

<style>
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
  }
</style>
