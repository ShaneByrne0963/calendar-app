<script lang="ts">
  import { inputFeedback } from "../../validation";

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

  const onchange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value.trim();

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
      {onchange}
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
