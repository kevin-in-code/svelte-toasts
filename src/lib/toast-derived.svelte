<script lang="ts">
	import { type ComponentType, createEventDispatcher } from 'svelte';
	import type { ToastCategory } from './types.js';
	import { darkTheme } from './themes.js';
	import SuccessIcon from './icons/success-icon.svelte.js';
	import InfoIcon from './icons/information-icon.svelte.js';
	import WarningIcon from './icons/warning-icon.svelte.js';
	import ErrorIcon from './icons/error-icon.svelte.js';
	import CloseIcon from './icons/close-icon.svelte.js';
	import { tweened } from 'svelte/motion';

  export let category: ToastCategory;
  export let title: string | undefined = undefined;
  export let topic: string;
  export let status: string;
	export let body: ComponentType | undefined = undefined;
  export let progress: number | undefined = undefined;

  const dispatch = createEventDispatcher<{
    'focusin': void,
    'focusout': void,
    'click': void,
    'expand': void,
    'collapse': void,
    'close': void,
  }>();

	let theme = darkTheme;

	const backgroundColor = theme.colors.background;
	const accentColor = theme.colors[category];
	const headerPadding = '0.75em';
	const iconSize = '1.5em';
	const iconGap = '0.75em';

	let isExpanded = false;
  let isClosed = false;

  const tweenedProgress = tweened(progress);

  $: progress !== undefined && tweenedProgress.set(progress);

  function clampEnds(percentage: number) {
    return (percentage < 0.01) ? 0.0 : (percentage > 0.99) ? 1.0 : percentage;
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

	function onHeaderClicked(e: Event) {
		e.preventDefault();
    dispatch('click');
    if (body) {
  		isExpanded = !isExpanded;
      if (isExpanded) {
        dispatch('expand');
      } else {
        dispatch('collapse');
      }
    }
	}

	function onCloseClicked(e: Event) {
		e.preventDefault();
		e.stopPropagation();
    close();
	}
</script>

{#if !isClosed}
<div
	class="toast-item"
	role="alert"
	style="
    --toast-background-color: {backgroundColor};
    --toast-accent-color: {accentColor};
    --toast-header-padding: {headerPadding};
    --toast-icon-size: {iconSize};
    --toast-icon-gap: {iconGap};
  "
>
	<button class="toast-header" type="button" on:click={onHeaderClicked} on:focusin={onFocusIn} on:focusout={onFocusOut}>
		<span class="toast-category-icon">
			{#if category === 'success'}
				<SuccessIcon color={accentColor} />
			{:else if category === 'information'}
				<InfoIcon color={accentColor} />
			{:else if category === 'warning'}
				<WarningIcon color={accentColor} />
			{:else if category === 'error'}
				<ErrorIcon color={accentColor} />
			{/if}
    </span>
		<div class="toast-text">
			{#if title}
				<h3 class="toast-title">{title}</h3>
			{/if}
			<p class="toast-topic">{topic}</p>
			{#if status}
				<h3 class="toast-status">{status}</h3>
			{/if}
		</div>
    <button class="toast-close-button" type="button" aria-label="Close" on:click={onCloseClicked}>
      <div class="toast-close-icon">
        <CloseIcon />
      </div>
    </button>
	</button>
	{#if isExpanded}
		<div class="toast-content-separator" />
  {:else if progress !== undefined}
    {#if Number.isNaN(progress)}
  		<progress></progress>
    {:else}
  		<progress value={clampEnds($tweenedProgress)} />
    {/if}
	{/if}
	{#if isExpanded && body}
		<div class="toast-content">
      <svelte:component this={body} />
		</div>
	{/if}
</div>
{/if}

<style>
	.toast-category-icon {
		font-size: var(--toast-icon-size);
	}

	.toast-item {
		display: flex;
		flex-direction: column;
		width: 22em;
		pointer-events: all;
		cursor: pointer;
		font-size: 87.5%;
		background-color: var(--toast-background-color);
		color: white;
		box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.3);
		border-left: solid 0.325em var(--toast-accent-color);
		margin: 1em;
	}

	.toast-item:focus-within {
		box-shadow: 0 0 1em 0.5em grey;
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
		background-color: darkslategray;
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
			linear-gradient(to right, var(--toast-accent-color) 30%, var(--toast-background-color) 30%)
			top left/150% 150% no-repeat;
		animation: progress-indeterminate 1s linear infinite;
	}

	progress:not(:indeterminate) {
		background-color: var(--toast-background-color);
	}
	progress[value]::-webkit-progress-value {
		background-color: var(--toast-accent-color);
		transition: none;
	}
	progress[value]::-moz-progress-bar {
		background-color: var(--toast-accent-color);
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
