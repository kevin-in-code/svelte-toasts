<script lang="ts">
	import { setContext } from 'svelte';
	import { TOAST_CONTEXT, createToastContext, type ToastContext } from './context.js';
	import type { ToastPosition, ToastTheme } from './types.js';
	import { marker } from './themes.js';

  export let theme: ToastTheme = marker;
  export let defaultPosition: ToastPosition = 'top-right';

  export let context: ToastContext | undefined;

  let localContext = context ?? createToastContext({
    theme,
    defaultPosition
  });

	setContext(TOAST_CONTEXT, localContext);

  $: localContext.theme.set(theme);
  $: localContext.defaultPosition.set(defaultPosition);
  $: context = localContext;
</script>

<slot />
