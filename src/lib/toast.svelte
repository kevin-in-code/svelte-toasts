<script lang="ts">
  import { type ComponentType, createEventDispatcher, onDestroy, onMount } from 'svelte';
  import { linear } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  import CloseIcon from './icons/close-icon.svelte';
  import type {
    ToastAnimationState,
    ToastIconComponent,
    ToastStatus,
    ToastTitleComponent,
  } from './types.js';

  export let title: ToastTitleComponent;
  export let icon: ToastIconComponent | undefined = undefined;

  export let clickTakesFocus: boolean;
  export let category: string;
  export let topic: string;
  export let status: ToastStatus | undefined;
  export let body: string | string[] | ComponentType;

  export let showStatusInline: boolean;
  export let showExpiryCountdown: boolean;
  export let expiresIn: number | undefined;

  export let taskProgress: number | undefined;
  export let taskScale: number;

  export let isExpanded: boolean;

  export let showMidSeparator: 'always' | 'when-no-category' | 'never' = 'never';
  export let hasMultistageExpansion: boolean = false;
  export let clipTitle: boolean = false;

  let isClosed = false;
  let isClicked = false;
  let isHeaderFocused = false;

  let expiryTimeout = expiresIn ? setTimeout(() => {}, expiresIn) : null;

  let state: ToastAnimationState;

  let headerButton: HTMLElement;
  let ready: boolean;

  let measureTopConstrained: HTMLElement;
  let measureTopUnconstrained: HTMLElement;
  let measureBottom: HTMLElement;
  let topConstainedHeight: number;
  let topUnconstrainedHeight: number;
  let bottomHeight: number;

  let observer: ResizeObserver;

  const dispatch = createEventDispatcher<{
    click: void;
    expand: void;
    collapse: void;
    close: void;
    cancelFocus: void;

    next: void;
    previous: void;

    focusable: HTMLElement;
  }>();

  const expiryCountdown = tweened(1, {
    duration: expiresIn ?? 0,
    easing: linear,
  });

  function isString<T>(value: string | T): value is string {
    return typeof value === 'string' || value instanceof String;
  }

  function cancelTimer() {
    if (expiryTimeout !== null) {
      clearTimeout(expiryTimeout);
    }
    expiresIn = undefined;
  }

  function close() {
    if (isClosed) return;
    isClosed = true;
    dispatch('close');
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
      if (!isExpanded) {
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
        e.preventDefault();
        e.stopPropagation();
        dispatch('previous');
        break;
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        dispatch('next');
        break;
      case 'Backspace':
        e.preventDefault();
        e.stopPropagation();
        dispatch('close');
        break;
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        dispatch('cancelFocus');
        break;
    }
  }

  function onCloseClicked(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    close();
  }

  function conditionallyDoNotTakeFocus(e: Event) {
    if (!clickTakesFocus) e.preventDefault();
  }

  function doNotTakeFocus(e: Event) {
    e.preventDefault();
  }

  function contentExists(content: string | string[] | ComponentType) {
    if (Array.isArray(content)) return content.length > 0;
    return !!content;
  }

  function setState(value: ToastAnimationState) {
    state = value;
  }

  setState(isExpanded ? 'unrolled' : 'resting');

  async function advanceState() {
    switch (state) {
      case 'resting':
        if (isExpanded) {
          if (hasMultistageExpansion) {
            setState('preparing');
          } else {
            setState('unrolled');
          }
        }
        break;
      case 'preparing':
        if (isExpanded) {
          setState('unrolling');
          setTimeout(() => {
            setState('unrolled');
          }, 0);
        }
        break;
      case 'unrolling':
        if (!isExpanded) {
          setState('preparing');
          setTimeout(() => {
            setState('resting');
          }, 0);
        }
        break;
      case 'unrolled':
        if (!isExpanded) {
          setState('unrolling');
        }
        break;
    }
  }

  function onEndTransition() {
    if (isExpanded !== undefined) advanceState();
  }

  $: if (isExpanded !== undefined) {
    advanceState();
  }

  onDestroy(() => observer && observer.disconnect());

  onMount(() => {
    if (ResizeObserver) {
      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === measureTopConstrained) {
            topConstainedHeight = entry.contentRect.height;
          } else if (entry.target === measureTopUnconstrained) {
            topUnconstrainedHeight = entry.contentRect.height;
          } else {
            bottomHeight = entry.contentRect.height;
          }
        }
      });

      observer.observe(measureTopConstrained);
      observer.observe(measureTopUnconstrained);
      observer.observe(measureBottom);
    }

    if (expiryCountdown) {
      expiryCountdown.set(0);
    }
  });

  $: headerButton, dispatch('focusable', headerButton);

  setTimeout(() => {
    ready = true;
  }, 0);
</script>

<div style="position: absolute; left: 0; top: 0; visibility: hidden;">
  <div class="toast-item" bind:this={measureTopConstrained}>
    <div class="toast-column">
      <div class="toast-top">
        <button class="toast-header resting-side" type="button">
          <span class="toast-category-icon">
            <svelte:component this={icon} {category} />
          </span>
          <div class="toast-text">
            <h3 class="toast-title"><svelte:component this={title} {category} /></h3>
            <div
              class:toast-flex-row={clipTitle &&
                status &&
                (isString(status) || isString(status.collapsed)) &&
                showStatusInline}
            >
              <p class="toast-topic" class:toast-constrain-text={clipTitle}>
                {topic}
              </p>
              {#if status && (isString(status) || isString(status.collapsed))}
                <p
                  class="toast-status"
                  class:toast-no-margin={clipTitle &&
                    status &&
                    (isString(status) || isString(status.collapsed)) &&
                    showStatusInline}
                >
                  {isString(status) ? status : status.collapsed}
                </p>
              {/if}
            </div>
          </div>
          <button class="toast-close-button" type="button" aria-label="Close">
            <div class="toast-close-icon"><CloseIcon /></div>
          </button>
        </button>
      </div>
    </div>
  </div>

  <div class="toast-item" bind:this={measureTopUnconstrained}>
    <div class="toast-column">
      <div class="toast-top">
        <button class="toast-header resting-side" type="button">
          <span class="toast-category-icon">
            <svelte:component this={icon} {category} />
          </span>
          <div class="toast-text">
            <h3 class="toast-title"><svelte:component this={title} {category} /></h3>
            <div>
              <p class="toast-topic">
                {topic}
              </p>
              {#if status && (isString(status) || isString(status.collapsed))}
                <p
                  class="toast-status"
                  class:toast-no-margin={clipTitle &&
                    status &&
                    (isString(status) || isString(status.collapsed)) &&
                    showStatusInline}
                >
                  {isString(status) ? status : status.collapsed}
                </p>
              {/if}
            </div>
          </div>
          <button class="toast-close-button" type="button" aria-label="Close">
            <div class="toast-close-icon"><CloseIcon /></div>
          </button>
        </button>
      </div>
    </div>
  </div>

  <div class="toast-item">
    <div class="toast-column">
      <div class="toast-bottom" bind:this={measureBottom}>
        {#if showMidSeparator === 'always' || (showMidSeparator === 'when-no-category' && !category)}
          <div class="mid-separator"></div>
        {/if}
        <div class="toast-content">
          {#if Array.isArray(body)}
            {#each body as paragraph}
              <p>{paragraph}</p>
            {/each}
          {:else if isString(body)}
            <p>{body}</p>
          {:else}
            <svelte:component this={body} />
          {/if}
          {#if status && (isString(status) || isString(status.expanded))}
            <p class="toast-status">{isString(status) ? status : status.expanded}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<div
  class="toast-item"
  class:unrolling={state === 'unrolling' || state === 'unrolled'}
  class:toast-item-in-focus={isHeaderFocused}
  tabindex="-1"
  role="alert"
>
  <div class="toast-column">
    <div class="toast-top">
      <div
        class="toast-header-underlay"
        class:resting={state === 'resting'}
        class:preparing={state === 'preparing'}
        class:unrolling={state === 'unrolling' || state === 'unrolled'}
        class:toast-item-in-focus={isHeaderFocused}
        on:transitionend={onEndTransition}
      >
        <div class="toast-left-edge"></div>
        <div class="toast-column">
        {#if taskProgress !== undefined}
          {#if taskProgress !== taskScale}
            <progress value={taskProgress} max={taskScale} />
          {/if}
        {:else if !isExpanded && showExpiryCountdown && !isClicked && !!expiresIn}
          {#if !Number.isNaN(expiresIn)}
            <progress value={$expiryCountdown} />
          {:else if Number.isNaN(expiresIn)}
            <progress></progress>
          {/if}
        {/if}
        </div>
        <div class="toast-right-edge"></div>
      </div>
      <button
        bind:this={headerButton}
        class="toast-header"
        class:resting-side={state === 'resting' || state === 'preparing'}
        type="button"
        style="height: {clipTitle && state !== 'unrolled'
          ? topConstainedHeight
          : topUnconstrainedHeight}px;"
        on:mousedown={conditionallyDoNotTakeFocus}
        on:click={onHeaderClicked}
        on:focus={onHeaderFocus}
        on:blur={onHeaderBlur}
        on:keydown={onHeaderKeyDown}
      >
        <span class="toast-category-icon">
          <svelte:component this={icon} {category} />
        </span>
        <div class="toast-text">
          <h3 class="toast-title"><svelte:component this={title} {category} /></h3>
          <div
            class:toast-flex-row={clipTitle &&
              !isExpanded &&
              status &&
              (isString(status) || isString(status.collapsed)) &&
              showStatusInline}
          >
            <p
              class="toast-topic"
              class:toast-constrain-text={clipTitle && (state === 'resting' || state === 'preparing')}
            >
              {topic}
            </p>
            {#if status && (isString(status) || isString(status.collapsed))}
              <p
                class="toast-status"
                class:toast-no-margin={clipTitle &&
                  status &&
                  (isString(status) || isString(status.collapsed)) &&
                  showStatusInline}
              >
                {isString(status) ? status : status.collapsed}
              </p>
            {/if}
          </div>
        </div>
        <button
          class="toast-close-button"
          type="button"
          aria-label="Close"
          on:mousedown={doNotTakeFocus}
          on:click={onCloseClicked}
        >
          <div class="toast-close-icon"><CloseIcon /></div>
        </button>
      </button>
    </div>
    <div
      style="height: {state === 'unrolled' ? bottomHeight : 0}px;"
      class="toast-bottom"
      class:not-unrolled={state !== 'unrolled'}
      class:transition={ready}
      on:transitionend={onEndTransition}
    >
      {#if showMidSeparator === 'always' || (showMidSeparator === 'when-no-category' && !category)}
        <div class="mid-separator"></div>
      {/if}
      <div class="toast-content">
        {#if Array.isArray(body)}
          {#each body as paragraph}
            <p>{paragraph}</p>
          {/each}
        {:else if isString(body)}
          <p>{body}</p>
        {:else}
          <svelte:component this={body} />
        {/if}
        {#if status && (isString(status) || isString(status.expanded))}
          <p class="toast-status">{isString(status) ? status : status.expanded}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .toast-item {
    display: flex;
    position: relative;
    border-radius: var(--toast-border-radius);
    pointer-events: all;
    width: var(--toast-width);
    font-size: var(--toast-font-size);
    color: var(--toast-text-color);
  }

  .toast-item.toast-item-in-focus {
    border-radius: var(--toast-focus-border-radius, var(--toast-border-radius));
  }

  .toast-column {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    flex: 0 1 auto;
  }

  .toast-left-edge {
    width: var(--toast-left-edge-width, 0);
    background-color: var(--toast-accent-color);
  }

  .toast-right-edge {
    width: var(--toast-right-edge-width, 0);
    background-color: var(--toast-accent-color);
  }

  .toast-item.unrolling {
    background-color: var(--toast-background-color);
    overflow: hidden;
  }

  .toast-item.unrolling:not(.toast-item-in-focus) {
    box-shadow: var(--toast-box-shadow);
  }

  .toast-item.unrolling.toast-item-in-focus {
    box-shadow: var(--toast-in-focus-box-shadow);
    outline: var(--toast-in-focus-outline);
  }

  .toast-top {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .toast-bottom {
    overflow: hidden;
  }

  .toast-bottom.not-unrolled {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .toast-bottom.transition {
    transition:
      transform 0.4s ease-in-out,
      padding 0.4s ease-in-out,
      height 0.4s ease-out;
  }

  .toast-header-underlay {
    background-color: var(--toast-background-color);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: var(--toast-border-radius);
    overflow: hidden;
    z-index: 0;
    transition: var(--toast-underlay-transition);
    display: flex;
  }

  .toast-header-underlay.toast-item-in-focus {
    border-radius: var(--toast-focus-border-radius, var(--toast-border-radius));
  }

  .toast-header-underlay.resting {
    transform: var(--toast-underlay-contracted-transform);
  }

  .toast-header-underlay.preparing {
    transform: var(--toast-underlay-expanded-transform);
  }

  .toast-header-underlay.unrolling {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .toast-header-underlay:not(.unrolling):not(.toast-item-in-focus) {
    box-shadow: var(--toast-box-shadow);
  }

  .toast-header-underlay:not(.unrolling).toast-item-in-focus {
    box-shadow: var(--toast-in-focus-box-shadow);
    outline: var(--toast-in-focus-outline);
  }

  .toast-header {
    display: flex;
    gap: var(--toast-icon-gap);
    padding: var(--toast-header-padding);
    position: relative;
    align-items: baseline;
    z-index: 1;
    transition: height 0.4s ease-in;
    overflow: hidden;
  }

  .toast-header:focus {
    outline: 0;
    box-shadow: none;
    border-radius: 0;
  }

  .toast-category-icon {
    font-size: var(--toast-icon-size);
    line-height: 0;
    color: var(--toast-icon-color);
    min-width: 1em;
  }

  .toast-close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
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
    padding: var(--toast-header-padding)
      calc(var(--toast-icon-size) + var(--toast-icon-gap) + var(--toast-header-padding));
    background-color: var(--toast-content-background-color);
    color: var(--toast-content-text-color);
  }

  .mid-separator {
    height: var(--toast-mid-separator-thickness);
    background-color: var(--toast-progress-color);
  }

  progress {
    width: 100%;
    display: block;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 0.325em;
    border-radius: 0;
    border: none;
    color-scheme: light;
    -webkit-tap-highlight-color: transparent;
    position: absolute;
    bottom: 0;
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
  progress[value]::-webkit-progress-bar {
    background-color: transparent;
    transition: none;
  }
  progress[value]::-webkit-progress-value {
    background: var(--toast-progress-color);
    transition: none;
    border-left: solid 1px var(--toast-background-color);
    border-right: solid 1px var(--toast-background-color);
  }
  progress[value]::-moz-progress-bar {
    background: var(--toast-progress-color);
    transition: none;
    border-left: solid 1px var(--toast-background-color);
    border-right: solid 1px var(--toast-background-color);
  }

  .toast-text {
    flex-grow: 1;
    min-width: 0;
  }

  .toast-constrain-text {
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
  }

  .toast-topic {
    flex: 1 1 auto;
  }

  .toast-status {
    font-style: italic;
    text-align: right;
    text-wrap: pretty;
    flex: 0 0 auto;
    margin: 0;
  }

  .toast-flex-row {
    display: flex;
  }

  .toast-no-margin {
    margin: 0;
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

  p + p {
    margin-top: 1em;
  }

  button {
    border: none;
    padding: 0;
    margin: 0;
    background-color: inherit;
    font-size: inherit;
    text-align: inherit;
  }
</style>
