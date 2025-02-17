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
      return { value: "0" };
    }
  }

  let subtitle = $derived.by(() => {
    let str = data.occurence;

    return str;
  });

  let color = $derived.by(() => {
    const colors = { success: "lime-500", fail: "red-500" };
    let format = data.format;

    if (format === "Checkbox") {
      if (data.defaultChecked) {
        if (!record) {
          return colors.fail;
        }
      } else if (record) {
        return colors.success;
      }
    } else if (format === "Checklist") {
      let unchecked = record.filter((item) => !item.value);
      if (unchecked.length === 0) {
        return colors.success;
      }
    } else if (format === "Number") {
      let numVal = parseInt(record.value);
      if (!numVal) return "white";

      if (data.limit === "At least") {
        if (numVal >= data.numberAmount) {
          return colors.success;
        }
      } else if (data.limit === "No more than") {
        if (numVal > data.numberAmount) {
          return colors.fail;
        }
      } else {
        if (numVal > data.numberAmount) {
          return colors.fail;
        }
        if (numVal === data.numberAmount) {
          return colors.success;
        }
      }
    }
    return "white";
  });
</script>

<ItemListItem title={data.name} {color}>
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
