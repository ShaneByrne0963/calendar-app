<script>
  import { userData } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import MenuAction from "../menu/MenuAction.svelte";

  function onclick() {
    let parsedData = JSON.stringify(userData);
    console.log(parsedData);
  }
</script>

<ToolTip text="Save">
  <MenuAction {onclick}>
    <Graphic width={24} height={24} path="save" fill="#000000"></Graphic>
  </MenuAction>
</ToolTip>
