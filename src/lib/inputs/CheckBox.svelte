<script lang="ts">
  let {
    label,
    checked = $bindable(false),
    type = "checkbox",
    size = "md",
  } = $props();

  function onChange(e: Event) {
    checked = (e.target as HTMLInputElement).checked;
  }
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <input
      type="checkbox"
      {checked}
      class="{type} {type}-accent {type}-{size}"
      onchange={onChange}
    />
    <span class="label-text ml-2 text-{size}">{label}</span>
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
