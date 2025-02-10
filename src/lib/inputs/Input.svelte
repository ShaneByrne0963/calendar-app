<script lang="ts">
  import { inputFeedback } from "../../validation";
  let {
    id,
    type = "text",
    label,
    required = true,
    placeholder = "",
    value,
    disabled = false,
    alignment = "y",
    validation = null,
  } = $props();

  let showFeedback = $state(value.feedback === "");

  const onInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.trim();
    value.value = val;
    showFeedback = true;

    // Simple validation
    if ("feedback" in value) {
      value.feedback = "";

      if (required && val === "") {
        value.feedback = inputFeedback.required;
        return;
      }
    }
    // For more complex validation
    validation?.();
  };
</script>

<div class="mb-5">
  <div class={alignment}>
    <label for={id}>{label + (required ? "*" : "")}</label>
    <input
      {type}
      {id}
      name={id}
      placeholder={placeholder || label}
      value={value.value}
      class="input input-bordered w-full{value.feedback ? ' invalid' : ''}"
      {required}
      {disabled}
      autocomplete="off"
      oninput={onInput}
    />
  </div>
  {#if showFeedback && value.feedback}
    <p class="text-error text-xs">{value.feedback}</p>
  {/if}
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
