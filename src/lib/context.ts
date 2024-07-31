import { type Writable, get, readonly, writable } from 'svelte/store';

import type {
  ToastCollection,
  ToastControl,
  ToastInitFields,
  ToastItem,
  ToastUpdateFields,
} from './types.js';

let nextListId = 0;
let nextToastId = 0;

const queue: Writable<ToastCollection> = writable({ id: nextListId++, list: [] });
export const activeToasts = readonly(queue);

const updateToastList = (fn: (list: ToastItem[]) => ToastItem[]) => {
  queue.update((collection) => ({
    id: collection.id,
    list: fn(collection.list),
  }));
};

const newToast = (fields: ToastInitFields): ToastItem => {
  const id = ++nextToastId;
  const { expiresIn, onClose, onExpand, onCollapse, ...remainingFields } = fields;
  const now = new Date();

  const dismiss = () => removeToast(id);
  const focus = () => focusOnToast(id);
  const cancelFocus = () => cancelFocusOnToast(id);
  const transferFocusBackward = () => transferToastFocusBackward(id);
  const transferFocusForward = () => transferToastFocusForward(id);
  const update = (fields: ToastUpdateFields) => updateToast(id, fields);
  const expand = (expanded?: boolean) => updateToast(id, { isExpanded: expanded ?? true });

  const closeHandler = () => {
    dismiss();
    onClose?.();
  };

  const expandHandler = () => {
    expand(true);
    onExpand?.();
  };

  const collapseHandler = () => {
    expand(false);
    onCollapse?.();
  };

  return {
    ...remainingFields,
    id,
    createdAt: now,
    expiresAt: !expiresIn ? undefined : new Date(now.getTime() + expiresIn),
    timeout: !expiresIn ? undefined : setTimeout(dismiss, expiresIn),
    dismiss,
    focus,
    cancelFocus,
    transferFocusBackward,
    transferFocusForward,
    update,
    expand,
    onClose: closeHandler,
    onExpand: expandHandler,
    onCollapse: collapseHandler,
  };
};

const addToast = (fields: ToastInitFields): ToastItem => {
  const toast = newToast(fields);
  updateToastList((list) => {
    return [...list, toast];
  });
  return toast;
};

const removeToast = (id: number) => {
  updateToastList((list) => {
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) return list;

    if (list.length > 1 && list[index].focusableElement?.matches(':focus-within')) {
      const nextToFocus = index + 1 < list.length ? index + 1 : index - 1;
      list[nextToFocus].focusableElement?.focus();
    }

    const newCollection = list.slice(0, index);
    newCollection.push(...list.slice(index + 1));
    return newCollection;
  });
};

const focusOnToast = (id: number) => {
  const toast = get(queue).list.find((item) => item.id === id);
  toast?.focusableElement?.focus();
};

const cancelFocusOnToast = (id: number) => {
  const toast = get(queue).list.find((item) => item.id === id);
  toast?.focusableElement?.blur();
};

const transferToastFocusBackward = (id: number) => {
  const list = get(queue).list;
  const index = list.findIndex((item) => item.id === id);
  if (list.length > 1 && list[index].focusableElement?.matches(':focus-within')) {
    list[(index + list.length - 1) % list.length].focusableElement?.focus();
  }
};

const transferToastFocusForward = (id: number) => {
  const list = get(queue).list;
  const index = list.findIndex((item) => item.id === id);
  if (list.length > 1 && list[index].focusableElement?.matches(':focus-within')) {
    list[(index + 1) % list.length].focusableElement?.focus();
  }
};

const computeUpdatedToast = (now: Date, toast: ToastItem, fieldsToUpdate: ToastUpdateFields) => {
  const { expiresIn, isExpanded, ...remainingFields } = fieldsToUpdate;

  const setIsExpanded = 'isExpanded' in fieldsToUpdate;

  const clearExpiresIn =
    (expiresIn === undefined && 'expiresIn' in fieldsToUpdate) || setIsExpanded;

  if (toast.timeout !== null && toast.timeout !== undefined && (expiresIn || clearExpiresIn)) {
    clearTimeout(toast.timeout);
  }

  return {
    ...toast,
    ...remainingFields,
    isExpanded: setIsExpanded ? isExpanded ?? false : toast.isExpanded,
    expiresAt: clearExpiresIn
      ? undefined
      : !expiresIn
        ? toast.expiresAt
        : new Date(now.getTime() + expiresIn),
    timeout: clearExpiresIn
      ? undefined
      : !expiresIn
        ? toast.timeout
        : setTimeout(toast.dismiss, expiresIn),
  };
};

const updateToast = (id: number, fields: ToastUpdateFields) => {
  updateToastList((list) => {
    const now = new Date();
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) return list;

    const toast = list[index];
    const updatedToast = computeUpdatedToast(now, toast, fields);

    const newCollection = list.slice(0, index);
    newCollection.push(updatedToast, ...list.slice(index + 1));
    return newCollection;
  });
};

export const updateToasts = (fieldsToUpdate: (toast: ToastItem) => ToastUpdateFields) => {
  updateToastList((list) => {
    const now = new Date();
    return list.map((toast) => {
      const fields = fieldsToUpdate(toast);
      return computeUpdatedToast(now, toast, fields);
    });
  });
};

export const raiseToast = (fields: ToastInitFields): ToastControl => {
  const { topic, body, ...rest } = fields;
  const shortenedTopic = topic.split(/[,.] /)[0];
  const toast = addToast({
    ...rest,
    topic: body ? topic : shortenedTopic,
    body: !body && shortenedTopic !== topic ? topic : body,
  });
  return {
    dismiss: toast.dismiss,
    focus: toast.focus,
    update: toast.update,
    expand: toast.expand,
  };
};

export const clearToasts = () => {
  queue.set({ id: nextListId++, list: [] });
};
