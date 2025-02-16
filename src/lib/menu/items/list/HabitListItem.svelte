<script>
  import ItemListItem from "../ItemListItem.svelte";

  let { data } = $props();
</script>

<ItemListItem title={data.name} color="white">
  <div></div>
</ItemListItem>
