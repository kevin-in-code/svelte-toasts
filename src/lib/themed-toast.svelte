<script lang="ts">
  import { type ComponentType } from 'svelte';

  import ConfigureToastTheme from './configure-toast-theme.svelte';
  import type {
    ToastDesignComponent,
    ToastIconComponent,
    ToastStatus,
    ToastTheme,
    ToastTitleComponent,
  } from './types.js';

  export let theme: ToastTheme;

  export let design: ToastDesignComponent;
  export let title: ToastTitleComponent;
  export let icon: ToastIconComponent;

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
</script>

<ConfigureToastTheme {theme} {category}>
  <svelte:component
    this={design}
    {title}
    {icon}
    {clickTakesFocus}
    {category}
    {topic}
    {status}
    {body}
    {showStatusInline}
    {showExpiryCountdown}
    {expiresIn}
    {taskProgress}
    {taskScale}
    {isExpanded}
    on:click
    on:expand
    on:collapse
    on:close
    on:cancelFocus
    on:previous
    on:next
    on:focusable
  />
</ConfigureToastTheme>
