<script lang="ts">
  import { toasts } from "../../shared.svelte";
  import Toast from "./Toast.svelte";
</script>

<div class="toast toast-top toast-end">
  {#each toasts as toast}
    <Toast type={toast.type}>
      {toast.text}
    </Toast>
  {/each}
</div>

<style>
  .toast {
    z-index: 10;
  }
</style>
