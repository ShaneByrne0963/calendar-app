<script lang="ts">
  let { text, children } = $props();
</script>

<div class="tooltip tooltip-bottom" data-tip={text}>
  {@render children()}
</div>
