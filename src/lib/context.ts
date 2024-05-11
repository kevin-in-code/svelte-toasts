import { writable, type Readable, type Writable, readonly, get } from 'svelte/store';
import { marker } from './themes.js';
import type { ToastItem, ToastPosition, ToastCategory, ToastTheme } from './types.js';

type ToastFields = Omit<ToastItem, 'id' | 'createdAt'>;

interface ToastContextOptions {
	theme?: ToastTheme;
	defaultPosition?: ToastPosition;
}

interface ToastControl {
  dismiss: () => void;
  update: (category: ToastCategory) => void;
}

interface ToastRaiseFunction {
  (toast: ToastFields): () => void;
  (position: ToastPosition, toast: ToastFields): () => void;
}

export interface ToastContext {
	theme: Writable<ToastTheme>;
	defaultPosition: Writable<ToastPosition>;
	queues: Record<ToastPosition, Readable<ToastItem[]>>;

	raise: ToastRaiseFunction;
}

export function createToastContext(options?: ToastContextOptions): ToastContext {
	const { theme = marker, defaultPosition = 'top-right' } = options ?? {};

	const themeStore = writable<ToastTheme>(theme);

	const defaultPositionStore = writable<ToastPosition>(defaultPosition);

	const queues: Record<ToastPosition, Writable<ToastItem[]>> = {
		'top-left': writable([]),
		top: writable([]),
		'top-right': writable([]),
		left: writable([]),
		center: writable([]),
		right: writable([]),
		'bottom-left': writable([]),
		bottom: writable([]),
		'bottom-right': writable([])
	};

	const readonlyQueues: Record<ToastPosition, Readable<ToastItem[]>> = {
		'top-left': readonly(queues['top-left']),
		top: readonly(queues['top']),
		'top-right': readonly(queues['top-right']),
		left: readonly(queues['left']),
		center: readonly(queues['center']),
		right: readonly(queues['right']),
		'bottom-left': readonly(queues['bottom-left']),
		bottom: readonly(queues['bottom']),
		'bottom-right': readonly(queues['bottom-right'])
	};

  let nextID = 0;

	function raise(toast: ToastFields): () => void;
  function raise(position: ToastPosition, toast: ToastFields): () => void;
  function raise(toastOrPosition: ToastPosition | ToastFields, possibleToast?: ToastFields) {

    const toastId = ++nextID;
    const firstIsString = (typeof toastOrPosition === 'string' || toastOrPosition instanceof String);

    const toastFields: ToastFields = firstIsString ? possibleToast! : toastOrPosition!;

    const position: ToastPosition = firstIsString ? toastOrPosition as ToastPosition : get(defaultPositionStore);

		function removeToast() {
			queues[position].update((items) => items.filter((item) => item.id !== toastId));
		}

		const toast: ToastItem = {
			...toastFields,
      id: toastId,
      createdAt: new Date(),
			onClose: () => {
				removeToast();
				toastFields.onClose?.();
			}
		};

		queues[position].update((items) => [...items, toast]);

		return removeToast;
	}

	return {
		theme: themeStore,
		defaultPosition: defaultPositionStore,
		queues: readonlyQueues,
		raise
	};
}

export const TOAST_CONTEXT = {};
