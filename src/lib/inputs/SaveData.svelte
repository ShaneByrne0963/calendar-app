<script>
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import MenuAction from "../menu/MenuAction.svelte";

  function onclick() {
    console.log("Saved");
  }
</script>

<ToolTip text="Save">
  <MenuAction {onclick}>
    <Graphic width={24} height={24} path="save" fill="#000000"></Graphic>
  </MenuAction>
</ToolTip>
