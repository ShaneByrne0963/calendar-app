<script>
  import CheckBox from "../../../inputs/CheckBox.svelte";
  import CheckBoxList from "../../../inputs/CheckBoxList.svelte";
  import NumberInput from "../../../inputs/NumberInput.svelte";
  import ItemListItem from "../ItemListItem.svelte";

  let { data } = $props();
  let record = $state(getRecord());

  function getRecord() {
    let format = data.format;
    if (format === "Checkbox") {
      return data.defaultChecked;
    }
    if (format === "Checklist") {
      return data.checkList.map((item) => ({ label: item, value: false }));
    }
    if (format === "Number") {
      return 0;
    }
  }

  let subtitle = $derived.by(() => {
    let str = data.occurence;

    return str;
  });
</script>

<ItemListItem title={data.name} color="white">
  <div class="text-xs">
    {data.occurence}
  </div>
  {#if data.format === "Checkbox"}
    <CheckBox
      id="{data.id}-checkbox"
      label="Mark{record ? 'ed' : ''} as done"
      bind:checked={record}
      margin={false}
    ></CheckBox>
  {:else if data.format === "Checklist"}
    <CheckBoxList bind:values={record} margin={false} size="xs"></CheckBoxList>
  {:else}
    <NumberInput
      id="{data.id}-number"
      label={data.unit}
      placeholder="Amount"
      bind:value={record}
      alignment="x"
      margin={false}
    ></NumberInput>
  {/if}
</ItemListItem>
