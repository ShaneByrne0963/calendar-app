<script lang="ts">
  import { setUserData, userData } from "../../shared.svelte";
  import { downloadTextFile } from "../../helpers";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import MenuAction from "../menu/MenuAction.svelte";

  function onclick() {
    document.getElementById("load-file").click();
  }

  function onchange(e: Event) {
    const files = (e.target as HTMLInputElement).files;

    if (!(files && files[0])) return;

    // Read the data from the input
    const reader = new FileReader();

    reader.readAsText(files[0], "UTF-8");
    reader.onload = (event) => {
      if (!event.target.result) return;
      let data = {};

      try {
        data = JSON.parse(event.target.result as string);
      } catch {
        return;
      }

      setUserData(data);
    };
  }
</script>

<ToolTip text="Load">
  <MenuAction {onclick}>
    <Graphic width={24} height={24} path="load" fill="#000000"></Graphic>
  </MenuAction>
</ToolTip>
<input type="file" id="load-file" class="hidden" {onchange} />
