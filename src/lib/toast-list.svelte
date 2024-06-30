<script lang="ts">
  import { getContext } from 'svelte';
  import { TOAST_CONTEXT, type ToastContext } from './context.js';
  import type { ToastPosition, ToastItem } from './types.js';
  import Toast from './toast.svelte';

  export let zone: ToastPosition;

  const context = getContext<ToastContext>(TOAST_CONTEXT);
  const list = context.queues[zone];

  interface Item {
    ref?: Toast;
    entry: ToastItem;
  }

  let items: Item[] = [];

  function updateItems(currentList: ToastItem[]) {
    const newItems = [];
    for (let entry of currentList) {
      const existingItem = items.find((i) => i.entry.id === entry.id);
      newItems.push({
        entry,
        ref: existingItem?.ref,
      });
    }
    items = newItems;
  }

  $: updateItems($list);
</script>

<ul>
  {#each items as item, index (item.entry.id)}
    <li>
      <Toast
        bind:this={item.ref}
        category={item.entry.category}
        topic={item.entry.topic}
        status={item.entry.status}
        body={item.entry.body}
        duration={item.entry.duration}
        on:click={item.entry.onClick}
        on:expand={item.entry.onExpand}
        on:collapse={item.entry.onCollapse}
        on:close={item.entry.onClose}
        on:previous={() => {
          index - 1 >= 0 && items[index - 1]?.ref?.focus?.();
        }}
        on:next={() => {
          index + 1 < items.length && items[index + 1]?.ref?.focus?.();
        }}
        on:move={() => {
          index + 1 < items.length
            ? items[index + 1]?.ref?.focus?.()
            : items[index - 1]?.ref?.focus?.();
        }}
      />
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }
</style>
