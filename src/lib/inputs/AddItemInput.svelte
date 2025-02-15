<script lang="ts">
  import { inputFeedback } from "../../validation";
  import Input from "./Input.svelte";
  let { id, values = $bindable() } = $props();

  const duplicateFeedback = "Cannot enter the same value twice";
  let currentValue = $state({ value: "", feedback: inputFeedback.required });
  let isValid = $derived(currentValue.value && !currentValue.feedback);

  function addItem() {
    values.push(currentValue.value);
    currentValue.value = "";
  }

  function deleteItem(index: number) {
    values.splice(index, 1);

    // Remove the duplicate feedback, if any
    if (currentValue.value && currentValue.feedback === duplicateFeedback) {
      currentValue.feedback = "";
    }
  }

  function validate() {
    if (values.includes(currentValue.value)) {
      currentValue.feedback = duplicateFeedback;
    }
  }
</script>

<div class="add-item-input">
  <ul class="item-list">
    {#each values as value, i}
      <li>
        <span>{value}</span>
        <button aria-label="Delete item" onclick={() => deleteItem(i)}
          >&times;</button
        >
      </li>
    {/each}
  </ul>
  <div class="input-section">
    <Input
      id="{id}-input"
      size="sm"
      bind:value={currentValue}
      label="Add Item"
      labelHidden={true}
      margin={false}
      validation={validate}
    ></Input>
    <button
      class="btn btn-secondary btn-sm"
      disabled={!isValid}
      onclick={addItem}>Add</button
    >
  </div>
</div>

<style>
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > button {
      font-size: 1.2em;
    }
  }

  .input-section {
    display: grid;
    grid-template-columns: 1fr auto;

    > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
