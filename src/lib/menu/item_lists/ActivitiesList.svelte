<script lang="ts">
  import ItemList from "./ItemList.svelte";

  let { submenu } = $props();
</script>

<ItemList itemType="Activities" {submenu}>
  <h2>Hello World</h2>
</ItemList>
