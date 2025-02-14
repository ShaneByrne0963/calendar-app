<script lang="ts">
  import { menuData } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";

  let { handleBack, contentComponent, children } = $props();

  let submenu = $state({
    component: null,
    props: {},
    closing: false,
    handleBack: () => {
      submenu.closing = true;
    },
    handleTransitionEnd: (event: TransitionEvent) => {
      if (submenu.closing && event.propertyName === "left") {
        submenu.component = null;
        submenu.props = {};
        submenu.closing = false;
        submenu.setAsFreeSubmenu();
      }
    },
    setAsFreeSubmenu: () => {
      // Allows any submenu to be inserted into the current submenu
      menuData.currentSubmenu = contentComponent;
      menuData.setSubmenu = (component: any, props = {}) => {
        if (menuData.currentSubmenu !== component) {
          submenu.component = component;
          submenu.props = props;
        }
      };
    },
  });
  submenu.setAsFreeSubmenu();
</script>

<div
  class={"submenu" + (submenu.closing ? " closing" : "")}
  ontransitionend={submenu.handleTransitionEnd}
>
  <button class="btn btn-accent btn-sm back-btn" onclick={handleBack}>
    <Graphic width={20} height={20} path={"back"} fill={"#000000"}></Graphic>
    Back
  </button>
  <div class="submenu-content">
    {@render children()}
  </div>
  {#if submenu.component}
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
