<script lang="ts">
  let {
    id,
    label,
    required = true,
    placeholder = "",
    min = 0,
    max = null,
    value = $bindable(),
    disabled = false,
    alignment = "y",
    validation = null,
  } = $props();
</script>

<div class="mb-5">
  <div class={alignment}>
    <label for={id}>{label}</label>
    <input
      type="number"
      {id}
      class="input input-bordered input-sm w-full"
      {min}
      {max}
      value={value.value}
      {required}
      {disabled}
      placeholder={placeholder || label}
    />
  </div>
</div>

<style>
  .x {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }

  input {
    color: black;
  }
</style>
