import type { ComponentType } from 'svelte';

export type ToastPosition =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export interface ToastThemeColors {
  accent: string;
  background: string;
  text: string;
  contrast: string;
  focus: string;
  icon: string;
  progress: string;
}

export interface ToastCategoryTheme {
  title?: string;
  colors: { accent: string } & Partial<ToastThemeColors>;
}

export interface ToastThemeStyle {
  borderRadius?: string;
  focus?: 'dashed' | 'winged' | 'framed';
  fontSize?: string;
  width?: string;
}

export interface ToastTheme {
  icons?: Record<string, ComponentType>;
  titles?: Record<string, string>;
  colors?: Record<string, Partial<ToastThemeColors>>;
  style?: ToastThemeStyle;
}

export interface ToastThemeInstance {
  icon?: ComponentType;
  title?: string;
  colors: ToastThemeColors;
  style: ToastThemeStyle;
}

export interface ToastItem {
  id: number;
  createdAt: Date;

  category?: string;
  topic: string;
  status?: string;
  body?: string | string[] | ComponentType;

  duration?: number | null;

  onClick?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
}
