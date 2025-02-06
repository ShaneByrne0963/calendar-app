<script lang="ts">
  let { label, checked = $bindable(false) } = $props();

  function onchange(e: Event) {
    checked = (e.target as HTMLInputElement).checked;
  }
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <input
      type="checkbox"
      {checked}
      class="checkbox checkbox-accent"
      {onchange}
    />
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
