import type { ComponentType, SvelteComponent } from 'svelte';

export type ToastViewZone =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'center'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type ToastTransitionName = 'left' | 'right' | 'top' | 'bottom' | 'fade' | null;

export interface ToastThemeColors {
  accent: string;
  background: string;
  text: string;
  contrast: string;
  focus: string;
  icon: string;
  progress: string;
  contentBackground: string;
  contentText: string;
}

export interface ToastTheme {
  name: string;
  colors?: Record<string, Partial<ToastThemeColors>>;
}

export type ToastStatus = string | { expanded?: string; collapsed?: string };

interface ToastItemFields {
  category?: string;
  topic: string;
  status?: ToastStatus;
  isExpanded?: boolean;
  clipTitleOnCollapse?: boolean;
  showExpiryCountdown?: boolean;
  showStatusInlineWhenCollapsed?: boolean;
  taskProgress?: number;
  taskScale?: number;
  body?: string | string[] | ComponentType;
}

interface ToastItemEvents {
  onClick?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
}

interface ToastItemTransientFields {
  expiresIn?: number;
  focusableElement?: HTMLElement;
}

export type ToastInitFields = ToastItemFields & ToastItemTransientFields & ToastItemEvents;
export type ToastUpdateFields = Partial<ToastItemFields & ToastItemTransientFields>;

export interface ToastItem extends ToastItemFields, ToastItemEvents {
  id: number;
  createdAt: Date;
  expiresAt?: Date | null;
  focusableElement?: HTMLElement;
  timeout?: ReturnType<typeof setTimeout>;

  dismiss: () => void;
  focus: () => void;
  cancelFocus: () => void;
  transferFocusBackward: () => void;
  transferFocusForward: () => void;
  update: (fields: ToastUpdateFields) => void;
  expand: (expanded?: boolean) => void;
}

export type ToastCollection = {
  id: number;
  list: ToastItem[];
};

export interface ToastControl {
  dismiss: () => void;
  focus: () => void;
  update: (fields: ToastUpdateFields) => void;
  expand: (expanded?: boolean) => void;
}

export type ToastAnimationState = 'resting' | 'preparing' | 'unrolling' | 'unrolled';

interface ToastDesignProps {
  title: ToastTitleComponent;
  icon?: ToastIconComponent | undefined;

  clickTakesFocus: boolean;
  category: string;
  topic: string;
  status: ToastStatus | undefined;
  body: string | string[] | ComponentType;

  showStatusInline: boolean;
  showExpiryCountdown: boolean;
  expiresIn: number | undefined;

  taskProgress: number | undefined;
  taskScale: number;

  isExpanded: boolean;
}

interface ToastDesignEvents {
  click: CustomEvent<void>;
  expand: CustomEvent<void>;
  collapse: CustomEvent<void>;
  close: CustomEvent<void>;
  cancelFocus: CustomEvent<void>;
  next: CustomEvent<void>;
  previous: CustomEvent<void>;
  focusable: CustomEvent<HTMLElement>;
}

export type ToastDesignComponent = ComponentType<
  SvelteComponent<ToastDesignProps, ToastDesignEvents>
>;
export type ToastIconComponent = ComponentType<SvelteComponent<{ category: string | undefined }>>;
export type ToastTitleComponent = ComponentType<SvelteComponent<{ category: string | undefined }>>;
