<script lang="ts">
  import { addToast, setUserData } from "../../shared.svelte";
  import Graphic from "../global/Graphic.svelte";
  import ToolTip from "../global/ToolTip.svelte";
  import MenuAction from "../menu/MenuAction.svelte";
  import { init } from "../../init";

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
        addToast("error", "The file you are trying to load is invalid.");
        return;
      }

      if (
        !(
          "activities" in data &&
          "events" in data &&
          "tasks" in data &&
          "journal" in data &&
          "notes" in data &&
          "habits" in data &&
          "goals" in data &&
          "records" in data &&
          "preferences" in data &&
          "calendar" in data
        )
      ) {
        addToast(
          "error",
          "The data you are loading does not match the requested format."
        );
        return;
      }
      setUserData(data);
      init();
    };
  }
</script>

<ToolTip text="Load">
  <MenuAction {onclick}>
    <Graphic width={24} height={24} path="load" fill="#000000"></Graphic>
  </MenuAction>
</ToolTip>
<input type="file" id="load-file" class="hidden" {onchange} />
