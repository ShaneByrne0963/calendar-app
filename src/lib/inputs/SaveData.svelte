<script>
  import { userData } from "../../shared.svelte";
  import { downloadTextFile } from "../../helpers";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import MenuAction from "../menu/MenuAction.svelte";

  function onclick() {
    let parsedData = JSON.stringify(userData);

    downloadTextFile("calendar-data.json", parsedData);
  }
</script>

<ToolTip text="Save">
  <MenuAction {onclick}>
    <Graphic width={24} height={24} path="save" fill="#000000"></Graphic>
  </MenuAction>
</ToolTip>
