<script lang="ts">
  let {
    id,
    label,
    labelHidden = false,
    value = $bindable(),
    options,
    margin = true,
    blankText = "",
    disabled = false,
    small = true,
    children = null,
    alignment = "y",
    onchange = null,
  } = $props();

  const onChange = (e: Event) => {
    value.value = (e.target as HTMLInputElement).value;
    onchange?.();
  };
</script>

<div class="{alignment} {margin ? (children ? 'mb-10' : 'mb-5') : ''}">
  <label for={id} hidden={labelHidden}>{label}</label>
  <select
    {id}
    name={id}
    value={value.value}
    class={`select${small ? " select-sm" : ""} select-bordered w-full`}
    {disabled}
    onchange={onChange}
  >
    {#if blankText}
      <option value="">{blankText}</option>
    {/if}
    {#each options as opt}
      <option>{opt}</option>
    {/each}
  </select>
  {#if children}
    <div class="mt-1">
      {@render children?.()}
    </div>
  {/if}
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
