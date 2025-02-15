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
    let numVal = parseInt(val);
    if (numVal < min) {
      numVal = min;
    }
    if (max && numVal > max) {
      numVal = max;
    }
    value.value = numVal;
    (e.target as HTMLInputElement).value = `${numVal}`;

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
