<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import { menuData } from "../../shared.svelte";

  function handleBack() {
    menuData.closing = true;
  }

  // Allows the submenu to remain visible while it closes
  function handleTransitionEnd(event: TransitionEvent) {
    if (menuData.closing && event.propertyName === "left") {
      menuData.submenu = null;
      menuData.props = {};
      menuData.closing = false;
    }
  }
</script>

<div id="menu-container" class="border-r-2 border-stone-900">
  <div
    id="menu"
    class={menuData.closing ? " closing" : ""}
    ontransitionend={handleTransitionEnd}
  >
    <div id="menu-content">
      <MenuButton type="Activities" />
      <MenuButton type="Events" />
      <MenuButton type="Tasks" />
      <MenuButton type="Journal" />
      <MenuButton type="Notes" />
      <MenuButton type="Habits" />
      <MenuButton type="Goals" />
      <MenuButton type="Records" />
      <MenuButton type="Preferences" />
    </div>

    {#if menuData.submenu}
      <menuData.submenu {...menuData.props} {handleBack}></menuData.submenu>
    {/if}
  </div>
</div>

<style>
  #menu-container {
    overflow: hidden;
    margin-right: 0.75em;
  }

  #menu {
    position: relative;
    top: 0;
    left: calc(-100% - 0.75em);
    width: 100%;
    height: 100%;
    transition: left 0.4s ease-in-out;

    &.closing,
    &:not(:has(.submenu)) {
      left: 0;
    }
  }

  #menu-content {
    height: 100%;
    overflow: hidden auto;
  }
</style>
