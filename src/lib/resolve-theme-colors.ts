import type { ToastTheme, ToastThemeColors } from './types.js';

const defaultColors: ToastThemeColors = {
  accent: 'SteelBlue',
  background: 'DarkSlateGrey',
  text: 'OldLace',
  contrast: 'DarkSlateGrey',
  focus: 'DarkSeaGreen',
  icon: 'OldLace',
  progress: 'DodgerBlue',
  contentBackground: 'GhostWhite',
  contentText: 'DarkSlateGrey',
};

export default function resolveThemeColors(theme: ToastTheme, category?: string): ToastThemeColors {
  const d = 'default';
  category ??= d;
  const accent =
    theme.colors?.[category]?.accent ?? theme.colors?.[d]?.accent ?? defaultColors.accent;
  return {
    accent,
    background:
      theme.colors?.[category]?.background ??
      theme.colors?.[d]?.background ??
      defaultColors.background,
    text: theme.colors?.[category]?.text ?? theme.colors?.[d]?.text ?? defaultColors.text,
    contrast:
      theme.colors?.[category]?.contrast ?? theme.colors?.[d]?.contrast ?? defaultColors.contrast,
    focus:
      theme.colors?.[category]?.focus ?? theme.colors?.[d]?.focus ?? accent ?? defaultColors.focus,
    icon: theme.colors?.[category]?.icon ?? accent ?? theme.colors?.[d]?.icon ?? defaultColors.icon,
    progress:
      theme.colors?.[category]?.progress ??
      accent ??
      theme.colors?.[d]?.progress ??
      defaultColors.progress,
    contentBackground:
      theme.colors?.[category]?.contentBackground ??
      theme.colors?.[d].contentBackground ??
      theme.colors?.[category]?.background ??
      defaultColors.contentBackground,
    contentText:
      theme.colors?.[category]?.contentText ??
      theme.colors?.[d].contentText ??
      theme.colors?.[category]?.text ??
      defaultColors.contentText,
  };
}
