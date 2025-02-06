<script lang="ts">
  let {
    id,
    label,
    value,
    options,
    disabled = false,
    small = true,
    alignment = "y",
  } = $props();

  const onChange = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value;
  };
</script>

<div class={alignment + " mb-5"}>
  <label for={id}>{label}</label>
  <select
    {id}
    name={id}
    value={value.value}
    class={`select${small ? " select-sm" : ""} select-bordered w-full`}
    {disabled}
    onchange={onChange}
  >
    {#each options as opt}
      <option>{opt}</option>
    {/each}
  </select>
</div>

<style>
  .x {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }

  select {
    color: black;
  }
</style>
