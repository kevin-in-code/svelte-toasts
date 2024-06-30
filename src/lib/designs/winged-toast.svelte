<script lang="ts">
  import { type ComponentType } from 'svelte';

  import Toast from '../toast.svelte';
  import type { ToastIconComponent, ToastStatus, ToastTitleComponent } from '../types.js';

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
</script>

<div
  style="
    --toast-border-radius: none;
    --toast-box-shadow: -0.325em 0 var(--toast-focus-color), 0.5em 0.7em 1em 0.0625em hsla(0, 0%, 0%, 0.5);
    --toast-font-size: 87.5%;
    --toast-header-padding: 0.75em;
    --toast-icon-gap: 0.75em;
    --toast-icon-size: 1.5em;
    --toast-in-focus-box-shadow: -0.325em 0 var(--toast-focus-color), 0.325em 0 var(--toast-focus-color), 0.5em 0.7em 1em 0.0625em hsla(0, 0%, 0%, 0.5);
    --toast-in-focus-outline: none;
    --toast-mid-separator-thickness: 0.325em;
    --toast-underlay-contracted-transform: none;
    --toast-underlay-expanded-transform: none;
    --toast-underlay-transition: none;
    --toast-width: 22em;
  "
>
  <Toast
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
</div>
