<script lang="ts">
  import resolveThemeColors from './resolve-theme-colors.js';
  import type { ToastTheme, ToastThemeColors } from './types.js';

  export let category: string | undefined;
  export let theme: ToastTheme;
  let colors: ToastThemeColors;

  $: colors = resolveThemeColors(theme, category);
</script>

<div
  style="
    --toast-background-color: {colors.background};
    --toast-text-color: {colors.text};
    --toast-contrast-color: {colors.contrast};
    --toast-accent-color: {colors.accent};
    --toast-icon-color: {colors.icon};
    --toast-focus-color: {colors.focus};
    --toast-progress-color: {colors.progress};
    --toast-content-background-color: {colors.contentBackground};
    --toast-content-text-color: {colors.contentText};
  "
>
  <slot />
</div>
