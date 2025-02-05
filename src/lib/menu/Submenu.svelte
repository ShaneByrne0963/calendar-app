<script lang="ts">
  import Graphic from "../Graphic.svelte";

  let { handleBack, children, submenu = null } = $props();

  function handleSubmenuBack() {
    submenu.component = null;
    submenu.props = {};
  }
</script>

<div class="submenu">
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={20} height={20} path={"back"} pathWidth={24} pathHeight={24}
    ></Graphic>
    Back
  </button>
  {@render children()}
  {#if submenu && submenu.component}
    <submenu.component handleBack={handleSubmenuBack} {...submenu.props}
    ></submenu.component>
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
    transition: left 0.4s ease-in-out;
  }

  .back-btn {
    margin-bottom: 2em;
  }
</style>
