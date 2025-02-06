<script lang="ts">
  let { label, checked } = $props();
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <input type="checkbox" {checked} class="checkbox checkbox-accent" />
    <span class="label-text ml-2">{label}</span>
  </label>
</div>

<style>
  .label {
    justify-content: start;
  }
  .label-text {
    color: white;
  }
</style>
