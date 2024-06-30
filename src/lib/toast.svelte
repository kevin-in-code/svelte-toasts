<script lang="ts">
  import {
    onMount,
    type ComponentType,
    type SvelteComponent,
    createEventDispatcher,
    getContext,
  } from 'svelte';
  import { resolveThemeInstance } from './themes.js';
  import { tweened } from 'svelte/motion';
  import CloseIcon from './icons/close-icon.svelte';
  import { TOAST_CONTEXT, type ToastContext } from './context.js';
  import { linear } from 'svelte/easing';

  export let category: string | undefined;

  export let topic: string;
  export let status: string | undefined;
  export let body: string | string[] | ComponentType<SvelteComponent> = '';

  export let duration: number | null | undefined = 3000;

  const context = getContext<ToastContext>(TOAST_CONTEXT);
  const themeStore = context.theme;
  const theme = resolveThemeInstance($themeStore, category);

  const dispatch = createEventDispatcher<{
    focusin: void;
    focusout: void;
    click: void;
    expand: void;
    collapse: void;
    close: void;
    next: void;
    previous: void;
    move: void;
  }>();

  let headerButton: HTMLButtonElement;

  const headerPadding = '0.75em';
  const iconSize = '1.5em';
  const iconGap = '0.75em';

  let isExpanded = false;
  let isClosed = false;
  let isClicked = false;
  let isHeaderFocused = false;

  let timeout = duration ? setTimeout(close, duration) : null;

  export function focus() {
    headerButton.focus();
  }

  const progress = tweened(1, {
    duration: duration ?? 0,
    easing: linear,
  });

  function cancelTimer() {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    duration = undefined;
  }

  function close() {
    if (isClosed) return;

    isClosed = true;
    dispatch('close');
  }

  function onFocusIn() {
    dispatch('focusin');
  }

  function onFocusOut() {
    dispatch('focusout');
  }

  function onHeaderFocus() {
    isHeaderFocused = true;
  }

  function onHeaderBlur() {
    isHeaderFocused = false;
  }

  function onHeaderClicked(e: Event) {
    e.preventDefault();
    cancelTimer();
    if (!isClicked) {
      isClicked = true;
      dispatch('click');
    }
    if (contentExists(body)) {
      isExpanded = !isExpanded;
      if (isExpanded) {
        dispatch('expand');
      } else {
        dispatch('collapse');
      }
    }
  }

  function onHeaderKeyDown(e: KeyboardEvent) {
    if (!isHeaderFocused) return;
    switch (e.key) {
      case 'ArrowUp':
        dispatch('previous');
        break;
      case 'ArrowDown':
        dispatch('next');
        break;
      case 'Backspace':
        dispatch('move');
        dispatch('close');
        break;
    }
  }

  function onCloseClicked(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    close();
  }

  function contentExists(content: string | string[] | ComponentType) {
    if (Array.isArray(content)) return content.length > 0;
    return !!content;
  }

  onMount(() => {
    if (progress) {
      progress.set(0);
    }
  });
</script>

{#if !isClosed}
  <div
    class="toast-item"
    class:toast-item-dashed={theme.style.focus === 'dashed'}
    class:toast-item-winged={theme.style.focus === 'winged'}
    class:toast-item-framed={theme.style.focus === 'framed'}
    class:toast-item-in-focus={isHeaderFocused}
    tabindex="-1"
    role="alert"
    style="
    --toast-background-color: {theme.colors.background};
    --toast-text-color: {theme.colors.text};
    --toast-contrast-color: {theme.colors.contrast};
    --toast-accent-color: {theme.colors.accent};
    --toast-icon-color: {theme.colors.icon};
    --toast-focus-color: {theme.colors.focus};
    --toast-progress-color: {theme.colors.progress};
    --toast-header-padding: {headerPadding};
    --toast-icon-size: {iconSize};
    --toast-icon-gap: {iconGap};
    --toast-width: {theme.style.width ?? '22em'};
    --toast-font-size: {theme.style.fontSize ?? 'inherit'};
    --toast-border-radius: {theme.style.borderRadius ?? 0};
    color: {theme.colors.text};
  "
  >
    <button
      bind:this={headerButton}
      class="toast-header"
      type="button"
      on:click={onHeaderClicked}
      on:focusin={onFocusIn}
      on:focusout={onFocusOut}
      on:focus={onHeaderFocus}
      on:blur={onHeaderBlur}
      on:keydown={onHeaderKeyDown}
    >
      {#if theme.icon}
        <span class="toast-category-icon"><svelte:component this={theme.icon} /></span>
      {/if}
      <div class="toast-text">
        {#if theme.title}
          <h3 class="toast-title">{theme.title}</h3>
        {/if}
        <p class="toast-topic">{topic}</p>
        {#if status}
          <h3 class="toast-status">{status}</h3>
        {/if}
      </div>
      <button class="toast-close-button" type="button" aria-label="Close" on:click={onCloseClicked}>
        <div class="toast-close-icon"><CloseIcon /></div>
      </button>
    </button>
    {#if isExpanded}
      <div class="toast-content-separator" />
    {:else if !isClicked && !!duration && !Number.isNaN(duration)}
      <progress value={$progress} />
    {:else if !isClicked && (Number.isNaN(duration) || duration === null)}
      <progress></progress>
    {/if}
    {#if isExpanded && contentExists(body)}
      <div class="toast-content">
        {#if Array.isArray(body)}
          {#each body as paragraph}
            <p>{paragraph}</p>
          {/each}
        {:else if typeof body === 'string' || body instanceof String}
          <p>{body}</p>
        {:else}
          <svelte:component this={body} />
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  .toast-category-icon {
    font-size: var(--toast-icon-size);
    line-height: 0;
    color: var(--toast-icon-color);
  }

  .toast-close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
  }

  .toast-item {
    display: flex;
    flex-direction: column;
    pointer-events: all;
    background-color: var(--toast-background-color);
    box-shadow: 0.5em 0.5em 1em 0.0625em hsla(0, 0%, 0%, 0.5);
    margin: 1em;
    position: relative;
    overflow: hidden;
    width: var(--toast-width);
    font-size: var(--toast-font-size);
    border-radius: var(--toast-border-radius);
  }

  .toast-item-dashed.toast-item-in-focus {
    outline: dashed 0.25em var(--toast-focus-color);
  }

  .toast-item-winged.toast-item-in-focus {
    box-shadow:
      -0.325em 0 var(--toast-focus-color),
      0.325em 0 var(--toast-focus-color),
      0.5em 0.5em 1em 0.0625em hsla(0, 0%, 0%, 0.5);
  }

  .toast-item-framed.toast-item-in-focus {
    box-shadow:
      -0.325em 0 0 0.1em var(--toast-focus-color),
      0.325em 0 0 0.1em var(--toast-focus-color),
      0.5em 0.5em 1em 0.0625em hsla(0, 0%, 0%, 0.5);
  }

  .toast-header {
    display: flex;
    gap: var(--toast-icon-gap);
    padding: var(--toast-header-padding);
    position: relative;
    align-items: baseline;
  }

  .toast-header:focus {
    outline: 0;
    box-shadow: none;
    border-radius: 0;
  }

  .toast-close-button {
    border: none;
    padding: 0;
    background-color: inherit;
    font-size: var(--toast-icon-size);
    align-self: start;
  }

  .toast-close-button:is(:hover, :active, :focus) {
    outline: solid 1px grey;
  }

  .toast-close-button:focus {
    box-shadow: none;
    background-color: var(--toast-focus-color);
    color: var(--toast-contrast-color);
  }

  .toast-content {
    padding: var(--toast-header-padding);
    margin: 0 calc(var(--toast-icon-size) + var(--toast-icon-gap));
  }

  .toast-content-separator {
    background-color: var(--toast-accent-color);
    height: max(1px, 0.0625em);
  }

  progress {
    width: 100%;
    display: block;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 0.325em;
    border-radius: 0;
  }

  progress:indeterminate {
    background: var(--toast-background-color)
      linear-gradient(to right, var(--toast-progress-color) 30%, var(--toast-background-color) 30%)
      top left/150% 150% no-repeat;
    animation: progress-indeterminate 1s linear infinite;
  }

  progress:not(:indeterminate) {
    background-color: var(--toast-background-color);
  }
  progress[value]::-webkit-progress-value {
    background-color: var(--toast-progress-color);
    transition: none;
  }
  progress[value]::-moz-progress-bar {
    background-color: var(--toast-progress-color);
    transition: none;
  }

  .toast-text {
    flex-grow: 1;
  }

  div,
  h3,
  p,
  button,
  progress {
    color: inherit;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h3 {
    font-size: 1.1875em;
  }

  p {
    font-size: 1em;
  }

  button {
    border: none;
    padding: 0;
    margin: 0;
    background-color: inherit;
    font-size: inherit;
    text-align: inherit;
  }

  :global(p + p) {
    margin-top: 1em;
  }
</style>
