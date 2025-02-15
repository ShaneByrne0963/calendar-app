<script lang="ts">
  import { inputFeedback } from "../../validation";
  import Feedback from "./Feedback.svelte";
  let {
    id,
    type = "text",
    size = "md",
    label,
    labelHidden = false,
    required = true,
    placeholder = "",
    value = $bindable(),
    disabled = false,
    alignment = "y",
    margin = true,
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

<div class={margin ? "mb-5" : ""}>
  <div class={alignment}>
    <label for={id} hidden={labelHidden}>{label + (required ? "*" : "")}</label>
    {#if type !== "textarea"}
      <input
        {type}
        {id}
        name={id}
        placeholder={placeholder || label}
        value={value.value}
        class="input input-{size} input-bordered w-full"
        {required}
        {disabled}
        autocomplete="off"
        oninput={onInput}
      />
    {:else}
      <textarea
        {id}
        name={id}
        placeholder={placeholder || label}
        class="textarea textarea-bordered textarea-{size} w-full"
        {required}
        {disabled}
        rows={12}
        oninput={onInput}>{value.value}</textarea
      >
    {/if}
  </div>
  {#if showFeedback && value.feedback}
    <Feedback text={value.feedback}></Feedback>
  {/if}
</div>

<style>
  .x {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }

  input,
  textarea {
    color: black;
  }
</style>
