<script lang="ts">
  import { inputFeedback } from "../../validation";
  import Feedback from "./Feedback.svelte";

  let {
    id,
    label,
    required = true,
    placeholder = "",
    min = 0,
    max = null,
    labelHidden = false,
    margin = true,
    value = $bindable(),
    disabled = false,
    alignment = "y",
    displayFeedback = true,
    validation = null,
  } = $props();

  let self = $state(null);

  const onchange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.trim();
    value.value = val;

    // Simple validation
    if ("feedback" in value) {
      value.feedback = "";

      if (required && val === "") {
        value.feedback = inputFeedback.required;
        return;
      }
    }
    // Clamp the value to the min and max, if specified
    if (val) {
      // Convert the string to a number to clamp it
      let numVal = parseInt(val);
      if (numVal < min) {
        numVal = min;
      }
      if (max && numVal > max) {
        numVal = max;
      }
      // Re-convert the number back to a string, to allow for blank values
      let reconvertedVal = `${numVal}`;
      value.value = reconvertedVal;
      (e.target as HTMLInputElement).value = reconvertedVal;
    } else {
      value.value = "";
    }

    // For more complex validation
    validation?.();
  };
</script>

<div class={margin ? "mb-5" : ""}>
  <div class={alignment}>
    <label for={id} hidden={labelHidden}>{label}</label>
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
      {onchange}
      bind:this={self}
    />
  </div>
  {#if displayFeedback && value.feedback}
    <Feedback text={value.feedback}></Feedback>
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
