import type { ComponentType } from 'svelte';
import type { ToastCategory } from './types.js';

export interface DerivedToastProps {
  category: ToastCategory;
  title?: string;
  topic: string;
  status: string;
  body?: ComponentType;
  progress?: number;

  onClick?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onClose?: () => void;
}
