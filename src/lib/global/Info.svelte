<script lang="ts">
  import { typeColors } from "../../types";
  import Graphic from "./Graphic.svelte";

  let { children, closable = true } = $props();
  let closing = $state(false);
  let closed = $state(false);

  function close() {
    closing = true;
  }

  function ontransitionend(e: TransitionEvent) {
    let target = e.target as HTMLElement;
    if (target.classList.contains("info-container")) {
      target.classList.add("closed");
    }
  }
</script>

<div
  class="info-container border-info text-info text-xs mb-3 relative
    {closing ? ' closing' : ''}{closed ? ' closed' : ''}"
  {ontransitionend}
>
  <Graphic
    width={24}
    height={24}
    path="info"
    fill={typeColors.info}
    extraClass="mr-2"
  ></Graphic>
  <p>{@render children()}</p>
  {#if closable}
    <button aria-label="Close window" class="close absolute" onclick={close}
      >&times;</button
    >
  {/if}
</div>

<style>
  .info-container {
    border-width: 1px;
    border-radius: 16px;
    padding: 8px;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    transition: opacity 0.5s ease-in-out;

    &:hover .close {
      opacity: 0.6;
    }

    &.closing {
      opacity: 0;
    }

    &.closed {
      display: none;
    }
  }

  .close {
    color: white;
    font-size: 1.5rem;
    top: 0;
    right: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 1 !important;
    }
  }
</style>
