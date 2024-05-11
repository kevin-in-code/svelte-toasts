import ErrorIcon from './icons/error-icon.svelte';
import InformationIcon from './icons/information-icon.svelte';
import SuccessIcon from './icons/success-icon.svelte';
import WarningIcon from './icons/warning-icon.svelte';
import { type ToastThemeColors, type ToastTheme, type ToastThemeStyle, type ToastThemeInstance } from './types.js';

const commonTitles = {
  success: 'Success',
  information: 'Information',
  warning: 'Warning',
  error: 'Error',
};

const commonIcons = {
  success: SuccessIcon,
  information: InformationIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

const commonStyles = {
  width: '22em',
  fontSize: '87.5%',
}

const marker: ToastTheme = {
  titles: { ...commonTitles },
  icons: { ...commonIcons },
  colors: {
    default: {
      accent: '#3399ff',
      background: '#f8f9f6',
      text: '#393939',
      contrast: '#393939',
      focus: '#fff',
    },
    success: { accent: '#16a34a', background: '#d0f1de', icon: '#393939' },
    information: { accent: '#0284c7', background: '#ceeff2', icon: '#393939' },
    warning: { accent: '#ca8a04', background: '#faf9de', icon: '#393939' },
    error: { accent: '#e11d48', background: '#fbc9c3', icon: '#393939' },
  },
  style: {
    ...commonStyles,
    borderRadius: '0.5em',
    focus: 'dashed',
  },
};

const crisp: ToastTheme = {
  titles: { ...commonTitles },
  icons: { ...commonIcons },
  colors: {
    default: {
      accent: '#3399ff',
      background: '#393939',
      text: '#dcdcdc',
      contrast: '#393939'
    },
    success: { accent: '#16a34a' },
    information: { accent: '#0284c7' },
    warning: { accent: '#ca8a04' },
    error: { accent: '#e11d48' },
  },
  style: {
    ...commonStyles,
    focus: 'winged',
  },
};

const candy: ToastTheme = {
  titles: { ...commonTitles },
  icons: { ...commonIcons },
  colors: {
    default: {
      accent: '#3399ff',
      background: '#330033',
      text: '#dcdcdc',
      contrast: '#393939',
    },
    success: { accent: '#62cf8f' },
    information: { accent: '#5bcad2' },
    warning: { accent: '#efea8f' },
    error: { accent: '#f24a34' },
  },
  style: {
    ...commonStyles,
    borderRadius: '0.5em',
    focus: 'framed',
  },
};

const defaultColors: ToastThemeColors = {
  accent: 'DodgerBlue',
  background: 'DarkSlateGrey',
  text: 'OldLace',
  contrast: 'DarkSlateGrey',
  focus: 'DarkSeaGreen',
  icon: 'OldLace',
  progress: 'DodgerBlue',
};

const defaultStyles: ToastThemeStyle = {
  focus: 'dashed',
  width: '22em',
};

function resolveThemeInstance(theme: ToastTheme, category?: string): ToastThemeInstance {
  const d = 'default';
  category ??= d;
  const accent = theme.colors?.[category]?.accent ?? theme.colors?.[d]?.accent ?? defaultColors.accent;
  return {
    title: theme.titles?.[category] ?? category,
    icon: theme.icons?.[category],
    colors: {
      accent,
      background: theme.colors?.[category]?.background ?? theme.colors?.[d]?.background ?? defaultColors.background,
      text: theme.colors?.[category]?.text ?? theme.colors?.[d]?.text ?? defaultColors.text,
      contrast: theme.colors?.[category]?.contrast ?? theme.colors?.[d]?.contrast ?? defaultColors.contrast,
      focus: theme.colors?.[category]?.focus ?? theme.colors?.[d]?.focus ?? accent ?? defaultColors.focus,
      icon: theme.colors?.[category]?.icon ?? accent ?? theme.colors?.[d]?.icon ?? defaultColors.icon,
      progress: theme.colors?.[category]?.progress ?? accent ?? theme.colors?.[d]?.progress ?? defaultColors.progress,
    },
    style: { ...defaultStyles, ...(theme.style ?? {}) },
  };
}

export { crisp, candy, marker, resolveThemeInstance };
