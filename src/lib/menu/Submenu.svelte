<script lang="ts">
  import Graphic from "../Graphic.svelte";
  import Submenu from "./Submenu.svelte";

  let { children, handleBack } = $props();
  let submenu = $state(null);
  let submenuProps = $state({});

  function handleSubmenuBack() {
    submenu = null;
    submenuProps = {};
  }
</script>

<div class="submenu">
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={24} height={24} path={"back"} pathWidth={24} pathHeight={24}
    ></Graphic>
    Back
  </button>
  {@render children()}
  {#if submenu}
    <Submenu handleBack={handleSubmenuBack}>
      <submenu {submenu} {...submenuProps}></submenu>
    </Submenu>
  {/if}
</div>

<style>
  .submenu {
    position: absolute;
    top: 0;
    left: calc(100% + 0.75em);
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .back-btn {
    margin-bottom: 2em;
  }
</style>
