<script lang="ts">
  let {
    id,
    type = "text",
    label,
    required = true,
    placeholder = "",
    value,
    disabled = false,
    alignment = "y",
  } = $props();

  const onInput = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value;
  };
</script>

<div class={alignment + " mb-4"}>
  <label for={id}>{label + (required ? "*" : "")}</label>
  <input
    {type}
    {id}
    name={id}
    placeholder={placeholder || label}
    value={value.value}
    class="input input-bordered w-full"
    {required}
    {disabled}
    oninput={onInput}
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
