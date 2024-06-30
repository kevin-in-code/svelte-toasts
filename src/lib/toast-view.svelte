<script lang="ts">
  import ToastList from './toast-list.svelte';
  import type { ToastPosition } from './types.js';

  export let margin = '2em';

  const zones = [
    'top-left',
    'top',
    'top-right',
    'left',
    'center',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as ToastPosition[];
</script>

<slot />
<div class="toast-view" style="--toast-view-margin: {margin}">
  {#each zones as zone}
    <div class={zone}>
      <ToastList bind:zone />
    </div>
  {/each}
</div>

<style>
  div.toast-view {
    position: relative;
    width: 100%;
  }

  div {
    position: absolute;
    margin: var(--toast-view-margin);
    box-sizing: border-box;
    z-index: 1000;
  }

  .top-left {
    left: 0;
    top: 0;
  }

  .top {
    left: calc(50% - var(--toast-view-margin));
    top: 0;
    transform: translate(-50%, 0);
  }

  .top-right {
    right: 0;
    top: 0;
  }

  .left {
    left: 0;
    top: calc(50% - var(--toast-view-margin));
    transform: translate(0, -50%);
  }

  .center {
    left: calc(50% - var(--toast-view-margin));
    top: calc(50% - var(--toast-view-margin));
    transform: translate(-50%, -50%);
  }

  .right {
    right: 0;
    top: calc(50% - var(--toast-view-margin));
    transform: translate(0, -50%);
  }

  .bottom-left {
    left: 0;
    bottom: 0;
  }

  .bottom {
    left: calc(50% - var(--toast-view-margin));
    bottom: 0;
    transform: translate(-50%, 0);
  }

  .bottom-right {
    right: 0;
    bottom: 0;
  }
</style>
