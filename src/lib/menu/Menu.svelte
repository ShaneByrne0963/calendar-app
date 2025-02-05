<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
  import { menuData } from "../../shared.svelte";
  import Submenu from "./Submenu.svelte";

  function handleBack() {
    menuData.submenu = null;
  }
</script>

<div id="menu-container">
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
      <Submenu {handleBack}>
        <menuData.submenu></menuData.submenu>
      </Submenu>
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
    min-width: 100%;
    height: 100%;
    transition: left 0.4s ease-in-out;
  }
</style>
