<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import { menuData } from "../../shared.svelte";

  function handleBack() {
    menuData.submenu = null;
    menuData.props = {};
  }
</script>

<div id="menu-container" class="border-r-2 border-stone-900">
  <div id="menu">
    <MenuButton type="Activities" />
    <MenuButton type="Events" />
    <MenuButton type="Tasks" />
    <MenuButton type="Journal" />
    <MenuButton type="Notes" />
    <MenuButton type="Habits" />
    <MenuButton type="Goals" />
    <MenuButton type="Records" />
    <MenuButton type="Preferences" />

    {#if menuData.submenu}
      <menuData.submenu {...menuData.props} {handleBack}></menuData.submenu>
    {/if}
  </div>
</div>

<style>
  #menu-container {
    overflow: hidden;
    margin-right: 0.75em;

    &:not(:has(.submenu)) {
      overflow-y: auto;
    }
  }
  #menu {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: left 0.4s ease-in-out;
  }
</style>
