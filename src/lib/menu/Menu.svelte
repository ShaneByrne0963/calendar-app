<script>
  import MenuButton from "./MenuButton.svelte";
  import { menuData } from "../../shared.svelte";
  import MenuActionBar from "./MenuActionBar.svelte";
  import Submenu from "./Submenu.svelte";

  let submenu = $derived({
    component: menuData.submenus[0].component,
    props: menuData.submenus[0].props,
  });

  // Allows the submenu to remain visible while it closes
  function handleTransitionEnd(event) {
    if (menuData.closing && event.propertyName === "left") {
      menuData.closing = false;
      menuData.submenus.splice(menuData.submenus.length - 1);
    }
  }
</script>

<div id="menu-container">
  <div
    id="menu"
    class={menuData.closing ? " closing" : ""}
    ontransitionend={handleTransitionEnd}
  >
    <MenuActionBar />
    <div id="menu-content">
      <MenuButton type="Activities" disabled={false} />
      <MenuButton type="Events" />
      <MenuButton type="To-Do List" />
      <MenuButton type="Journal" disabled={false} />
      <MenuButton type="Habits" disabled={false} />
      <MenuButton type="Notes" />
      <MenuButton type="Records" />
      <MenuButton type="Preferences" />
    </div>

    {#if menuData.submenus.length > 0}
      <Submenu index={0}>
        <submenu.component index={0} {...submenu.props}></submenu.component>
      </Submenu>
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
