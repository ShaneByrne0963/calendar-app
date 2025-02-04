<script lang="ts">
  let { type } = $props();
</script>

<button class="btn btn-accent btn-block btn-xs sm:btn-sm md:btn-md lg:btn-lg"
  >{type}</button
>

<style>
  button {
    justify-content: start;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
</style>
