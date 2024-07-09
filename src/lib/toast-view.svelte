<script lang="ts">
  import DefaultIcon from './default-icon.svelte';
  import DefaultTitle from './default-title.svelte';
  import DashedToast from './designs/timeless-toast.svelte';
  import { marker } from './themes.js';
  import ToastList from './toast-list.svelte';
  import type { ToastDesignComponent, ToastIconComponent, ToastTheme, ToastTitleComponent, ToastTransitionName, ToastViewZone } from './types.js';

  export let design: ToastDesignComponent | undefined = undefined;
  export let title: ToastTitleComponent | undefined = undefined;
  export let icon: ToastIconComponent | undefined = undefined;

  export let margin = '2em';
  export let zone: ToastViewZone = 'top-right';
  export let enter: ToastTransitionName = 'fade';
  export let exit: ToastTransitionName = 'top';
  export let theme: ToastTheme = marker;
  export let clickTakesFocus: boolean = false;
</script>

<slot />
<div class="toast-view" style="--toast-view-margin: {margin}">
  <div class={zone}>
    <ToastList
      {theme}
      design={design ?? DashedToast}
      title={title ?? DefaultTitle}
      icon={icon ?? DefaultIcon}
      {enter}
      {exit}
      {clickTakesFocus}
    />
  </div>
</div>

<style>
  div.toast-view {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    overflow: hidden;
  }

  div {
    position: absolute;
    box-sizing: border-box;
    z-index: 1000;
  }

  .top-left {
    left: var(--toast-view-margin);
    top: var(--toast-view-margin);
  }

  .top {
    left: 50%;
    top: var(--toast-view-margin);
    transform: translate(-50%, 0);
  }

  .top-right {
    right: var(--toast-view-margin);
    top: var(--toast-view-margin);
  }

  .left {
    left: var(--toast-view-margin);
    top: 50%;
    transform: translate(0, -50%);
  }

  .center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .right {
    right: var(--toast-view-margin);
    top: 50%;
    transform: translate(0, -50%);
  }

  .bottom-left {
    left: var(--toast-view-margin);
    bottom: var(--toast-view-margin);
  }

  .bottom {
    left: 50%;
    bottom: var(--toast-view-margin);
    transform: translate(-50%, 0);
  }

  .bottom-right {
    right: var(--toast-view-margin);
    bottom: var(--toast-view-margin);
  }
</style>
