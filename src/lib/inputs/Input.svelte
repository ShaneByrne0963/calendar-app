<script lang="ts">
  let {
    id,
    type = "text",
    label,
    required = true,
    placeholder = "",
    value = "",
    disabled = false,
    alignment = "y",
  } = $props();
</script>

<div class={alignment + " mb-4"}>
  <label for={id}>{label + (required ? "*" : "")}</label>
  <input
    {type}
    {id}
    name={id}
    placeholder={placeholder || label}
    {value}
    class="input input-bordered w-full"
    {required}
    {disabled}
  />
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
