<script>
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import ItemListItem from "../ItemListItem.svelte";

  let { data } = $props();
  let checkList = $state(
    "checkList" in data
      ? data.checkList.map((item) => ({ label: item, value: false }))
      : []
  );

  let subtitle = $derived.by(() => {
    let str = data.occurence;

    return str;
  });
</script>

<ItemListItem title={data.name} color="white">
  <div class="text-xs">
    {data.occurence}
  </div>
  {#if data.format === "Checklist"}
    <CheckBoxList bind:values={checkList} margin={false} size="xs"
    ></CheckBoxList>
  {/if}
</ItemListItem>
