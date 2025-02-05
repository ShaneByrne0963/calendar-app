<script lang="ts">
  import Graphic from "../Graphic.svelte";

  let { handleBack, children, submenu = null } = $props();

  $inspect(submenu);
</script>

<div
  class={"submenu" + (submenu?.closing ? " closing" : "")}
  ontransitionend={submenu?.handleTransitionEnd}
>
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={20} height={20} path={"back"} pathWidth={24} pathHeight={24}
    ></Graphic>
    Back
  </button>
  {@render children()}
  {#if submenu?.component}
    <submenu.component handleBack={submenu.handleBack} {...submenu.props}
    ></submenu.component>
  {/if}
</div>

<style>
  .submenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    transition: left 0.4s ease-in-out;

    &.closing,
    &:not(:has(.submenu)) {
      left: calc(100% + 0.75em);
    }
  }

  .back-btn {
    margin-bottom: 2em;
  }
</style>
