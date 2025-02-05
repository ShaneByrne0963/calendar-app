<script lang="ts">
  import MenuButton from "./MenuButton.svelte";
</script>

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
</div>

<style>
  #menu {
    margin-right: 0.75em;
    overflow: hidden auto;
    position: relative;
    top: 0;
    left: 0;
    transition: left 0.3s ease-in-out;
  }
</style>
