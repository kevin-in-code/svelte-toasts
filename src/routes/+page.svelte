<script lang="ts">
  import { tick } from 'svelte';

  import {
    ToastView,
    activeToasts,
    candy,
    chalk,
    clearToasts,
    crisp,
    marker,
    raiseToast,
  } from '$lib/index.js';

  import SaveNow from './save-now.svelte';
  import { get } from 'svelte/store';
  import ClassicToast from '$lib/designs/classic-toast.svelte';
  import ActionToast from '$lib/designs/action-toast.svelte';
  import FormalToast from '$lib/designs/formal-toast.svelte';

  let theme = marker;
  let design = ClassicToast;
  let clickTakesFocus = false;
  let mode: 'light' | 'dark' = 'light';
  let numberOfToastsRaised = 0;
  let abortDemo: AbortController | undefined;

  function delay(milliseconds: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
  }

  const toastFactories = [
    async (animate: boolean) => {
      const control = raiseToast({
        topic: 'Out-of-band events happen',
        body: [
          "Out-of-band events in your app will happen, and you may need to bring them to the user's attention.",
          'Toasts allow you to do this without taking the user out of the current activity.',
        ],
        status: {
          collapsed: 'clicking a toast may reveal more',
          expanded: 'toasts are keyboard-friendly',
        },
      });
      if (animate) {
        await delay(1500);
        control.expand(true);
        await delay(4500);
        control.expand(false);
        await delay(500);
      }
    },
    async (animate: boolean) => {
      const control = raiseToast({
        category: 'warning',
        topic: 'You have made 39 changes to this document without saving.',
        body: SaveNow,
        status: { expanded: 'a toast body can contain any component', collapsed: '' },
      });
      if (animate) {
        await delay(2500);
        control.expand(true);
        await delay(4500);
        control.expand(false);
        await delay(500);
      }
    },
    async (animate: boolean) => {
      const control = raiseToast({
        category: 'information',
        topic: 'Uploading your video...',
        clipTitleOnCollapse: true,
        showStatusInlineWhenCollapsed: true,
      });
      control.update({ taskProgress: 0, taskScale: 20 });

      let progress = 0;
      const completion = new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (progress < 20) {
            const extra = Math.floor(Math.random() * 4);
            progress = Math.min(20, progress + extra);
            control.update({ taskProgress: progress });
            if (progress === 20) {
              control.update({ status: 'Done' });
              clearInterval(timer);
              resolve();
            }
          }
        }, 500);
      });
      if (animate) {
        await completion;
        await delay(2000);
      }
    },
    async (animate: boolean) => {
      const control = raiseToast({
        category: 'error',
        topic: 'A network error has occurred',
        body: 'This toast demonstrates auto-expiry of toasts.',
        status: { expanded: 'interacting with the toast prevents expiry', collapsed: '' },
        showExpiryCountdown: true,
        expiresIn: 5000,
      });
      if (animate) {
        await delay(3000);
        control.expand(true);
        await delay(3500);
        control.expand(false);
        await delay(500);
      }
    },
    async (animate: boolean) => {
      const control = raiseToast({
        category: 'success',
        topic: 'Achievement Unlocked!',
        body: [
          'Toasts now allow you to provide essential information to your users without breaking their flow.',
        ],
        status: { expanded: '✔️', collapsed: '' },
      });
      if (animate) {
        await delay(1500);
        control.expand(true);
        await delay(4500);
        control.expand(false);
        await delay(500);
      }
    },
  ];

  function reset() {
    clearToasts();
    numberOfToastsRaised = 0;
    abortDemo?.abort();
    abortDemo = undefined;
  }

  async function post(animate: boolean = false): Promise<void> {
    const toastToRaise = toastFactories[numberOfToastsRaised++ % toastFactories.length];
    await toastToRaise(animate);
  }

  async function demo() {
    reset();
    await tick();
    let localAbortDemo = new AbortController();
    abortDemo = localAbortDemo;
    clearToasts();
    for (let k = 0; k < toastFactories.length; k++) {
      if (localAbortDemo.signal.aborted) return;
      await post(true);
    }
    if (abortDemo === localAbortDemo) {
      abortDemo = undefined;
    }
  }

  function postInitialToast() {
    if (get(activeToasts).list.length === 0) {
      post();
    }
  }

  setTimeout(postInitialToast, 0);
</script>

<ToastView {theme} {design} {clickTakesFocus} zone="top" />
<div class="panel" class:dark={mode === 'dark'} data-theme={mode}>
  <div></div>
  <div class="controls">
    <div class="row gap">
      <label class="primary-color">
        <input type="checkbox" bind:checked={clickTakesFocus} />
        Click takes focus
      </label>
    </div>
    <div role="group" class="row break">
      <button class:outline={theme !== candy} on:click={() => (theme = candy)}>candy</button>
      <button class:outline={theme !== crisp} on:click={() => (theme = crisp)}>crisp</button>
      <button class:outline={theme !== chalk} on:click={() => (theme = chalk)}>chalk</button>
      <button class:outline={theme !== marker} on:click={() => (theme = marker)}>marker</button>
    </div>
    <div role="group" class="row">
      <button class:outline={design !== ClassicToast} on:click={() => (design = ClassicToast)}
        >classic</button
      >
      <button class:outline={design !== FormalToast} on:click={() => (design = FormalToast)}
        >formal</button
      >
      <button class:outline={design !== ActionToast} on:click={() => (design = ActionToast)}
        >action</button
      >
    </div>
    <div role="group" class="row">
      <button class:outline={mode !== 'light'} on:click={() => (mode = 'light')}
        >on light background</button
      >
      <button class:outline={mode !== 'dark'} on:click={() => (mode = 'dark')}
        >on dark background</button
      >
    </div>
    <div class="row gap">
      <button class="contrast" on:click={demo}>Run a Demo</button>
      <button on:click={reset}>Clear</button>
      <button on:click={() => post()}>Raise a Toast</button>
    </div>
  </div>
</div>

<style>
  :global(:root) {
    font-size: 16px;
  }

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: stretch;
    /* default to light background */
    background-color: #f2f4f6;
  }

  .panel > :first-child {
    flex: 1;
    display: flex;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding: 1em;
    align-items: baseline;
  }

  .controls > * {
    flex: 1 1 content;
    margin-bottom: 0;
  }

  .break {
    flex-basis: 100%;
  }

  .dark {
    background-color: rgb(36, 60, 66);
  }

  .row {
    display: flex;
    align-items: baseline;
  }

  .row > * {
    flex: 1 1 content;
  }

  .gap {
    gap: 1em;
  }

  .primary-color {
    --pico-color: var(--pico-primary);
  }

  button {
    --pico-form-element-spacing-horizontal: 0.5em;
    --pico-form-element-spacing-vertical: 0.5em;
  }
</style>
