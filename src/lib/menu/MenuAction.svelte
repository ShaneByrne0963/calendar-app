<script lang="ts">
  let { children, onclick } = $props();
</script>

<button class="btn btn-square btn-accent" {onclick}>{@render children()}</button
>
