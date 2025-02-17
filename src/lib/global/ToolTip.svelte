<script lang="ts">
  let { text, children, direction = "bottom" } = $props();
</script>

<div class="tooltip tooltip-{direction}" data-tip={text}>
  {@render children()}
</div>
