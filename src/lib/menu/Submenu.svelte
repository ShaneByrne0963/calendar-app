<script lang="ts">
  import Graphic from "../Graphic.svelte";

  let { handleBack, children } = $props();
</script>

<div class="submenu">
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={24} height={24} path={"back"} pathWidth={24} pathHeight={24}
    ></Graphic>
    Back
  </button>
  {@render children()}
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
