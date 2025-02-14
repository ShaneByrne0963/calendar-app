<script>
  import { menuData } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";
  import Submenu from "./Submenu.svelte";

  let { index, children } = $props();

  let child = $derived({ ...menuData.submenus[index + 1] });

  // let child = $state({
  //   component: null,
  //   props: {},
  //   closing: false,
  //   handleBack: () => {
  //     child.closing = true;
  //   },
  //   handleTransitionEnd: (event: TransitionEvent) => {
  //     if (child.closing && event.propertyName === "left") {
  //       child.component = null;
  //       child.props = {};
  //       child.closing = false;
  //       child.setAsFreeSubmenu();
  //       menuData.submenus.splice(menuData.submenus.length - 1);
  //     }
  //   },
  //   setAsFreeSubmenu: () => {
  //     // Allows any submenu to be inserted into the current submenu
  //     menuData.currentSubmenu = contentComponent;
  //     menuData.setSubmenu = (component: any, props = {}) => {
  //       if (menuData.currentSubmenu !== component) {
  //         child.component = component;
  //         child.props = props;
  //       } else {
  //         // Update existing submenu
  //       }
  //     };
  //   },
  // });
  function handleBack() {
    if (index > 0) {
      menuData.submenus[index].closing = true;
    } else {
      menuData.closing = true;
    }
  }

  function ontransitionend(event) {
    if (child.closing && event.propertyName === "left") {
      menuData.submenus.pop();
    }
  }
</script>

<div class={"submenu" + (child.closing ? " closing" : "")} {ontransitionend}>
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={20} height={20} path={"back"} fill={"#000000"}></Graphic>
    Back
  </button>
  <div class="submenu-content">
    {@render children()}
  </div>
  {#if menuData.submenus.length > index + 1}
    <Submenu index={index + 1} contentComponent={child.component}>
      <child.component index={index + 1} {...child.props}></child.component>
    </Submenu>
  {/if}
</div>

<style>
  .submenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: left 0.4s ease-in-out;
    overflow: hidden;

    &.closing,
    &:not(:has(.submenu)) {
      left: calc(100% + 0.75em);
    }
  }

  .submenu-content {
    height: calc(100% - 4em);
    overflow: hidden auto;
    padding-right: 0.75em;
  }

  .back-btn {
    margin-bottom: 2em;
  }
</style>
