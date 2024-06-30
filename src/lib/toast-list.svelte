<script lang="ts">
  import { flip } from 'svelte/animate';
  import { cubicInOut, quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';

  import { activeToasts } from './context.js';
  import ThemedToast from './themed-toast.svelte';
  import type { ToastCollection, ToastTheme, ToastTransitionName } from './types.js';

  export let enter: ToastTransitionName;
  export let exit: ToastTransitionName;
  export let theme: ToastTheme;

  export let clickTakesFocus: boolean;

  function entryTransition(node: Element, params?: { enter: ToastTransitionName }) {
    switch (params?.enter ?? 'fade') {
      case 'left':
        return fly(node, { delay: 2, duration: 500, x: -300, easing: cubicInOut });
      case 'right':
        return fly(node, { delay: 2, duration: 500, x: +300, easing: cubicInOut });
      case 'top':
        return fly(node, { delay: 2, duration: 500, y: -300, easing: cubicInOut });
      case 'bottom':
        return fly(node, { delay: 2, duration: 500, y: +300, easing: cubicInOut });
      case 'fade':
        return fade(node, { delay: 2, duration: 500, easing: cubicInOut });
    }
  }

  function exitTransition(node: Element, params?: { exit: ToastTransitionName }) {
    switch (params?.exit ?? 'fade') {
      case 'left':
        return fly(node, { delay: 1, duration: 500, x: -300, easing: cubicInOut });
      case 'right':
        return fly(node, { delay: 1, duration: 500, x: +300, easing: cubicInOut });
      case 'top':
        return fly(node, { delay: 1, duration: 500, y: -300, easing: cubicInOut });
      case 'bottom':
        return fly(node, { delay: 1, duration: 500, y: +300, easing: cubicInOut });
      case 'fade':
        return fade(node, { delay: 1, duration: 500, easing: cubicInOut });
    }
  }

  function positiveOrUndefined(value: number) {
    if (value > 0) {
      return value;
    } else {
      return undefined;
    }
  }

  let items: ToastCollection;

  $: items = $activeToasts;
</script>

{#key items.id}
  <div class="list">
    {#each items.list as item (item.id)}
      <div
        class="toast"
        in:entryTransition={{ enter }}
        out:exitTransition={{ exit }}
        animate:flip={{
          delay: 0,
          duration: 1000,
          easing: quintOut,
        }}
      >
        <ThemedToast
          {theme}
          {clickTakesFocus}
          category={item.category ?? ''}
          topic={item.topic}
          status={item.status}
          body={item.body ?? ''}
          isExpanded={item.isExpanded ?? false}
          showStatusInline={item.showStatusInlineWhenCollapsed ?? false}
          showExpiryCountdown={item.showExpiryCountdown ?? false}
          expiresIn={item.expiresAt
            ? positiveOrUndefined(item.expiresAt.getTime() - Date.now())
            : undefined}
          taskProgress={item.taskProgress}
          taskScale={item.taskScale ?? 1}
          on:click={item.onClick}
          on:expand={item.onExpand}
          on:collapse={item.onCollapse}
          on:close={item.onClose}
          on:cancelFocus={item.cancelFocus}
          on:previous={item.transferFocusBackward}
          on:next={item.transferFocusForward}
          on:focusable={(event) => item.update({ focusableElement: event.detail })}
        />
      </div>
    {/each}
  </div>
{/key}

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
</style>
