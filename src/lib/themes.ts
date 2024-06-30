import DefaultIcon from './default-icon.svelte';
import DefaultTitle from './default-title.svelte';
import DashedToast from './designs/dashed-toast.svelte';
import FramedToast from './designs/framed-toast.svelte';
import SkewedToast from './designs/skewed-toast.svelte';
import WingedToast from './designs/winged-toast.svelte';
import { type ToastTheme } from './types.js';

const action: ToastTheme = {
  name: 'action',
  component: {
    icon: DefaultIcon,
    title: DefaultTitle,
    design: SkewedToast,
  },
  colors: {
    default: {
      accent: '#3399ff',
      background: '#f8f9f6',
      text: '#393939',
      contrast: '#393939',
      focus: '#fff',
      contentBackground: '#f8f9f6',
      contentText: '#393939',
    },
    success: { accent: '#16a34a', background: '#d0f1de', icon: '#393939' },
    information: { accent: '#0284c7', background: '#ceeff2', icon: '#393939' },
    warning: { accent: '#ca8a04', background: '#faf9de', icon: '#393939' },
    error: { accent: '#e11d48', background: '#fbc9c3', icon: '#393939' },
  },
};

const candy: ToastTheme = {
  name: 'candy',
  component: {
    icon: DefaultIcon,
    title: DefaultTitle,
    design: FramedToast,
  },
  colors: {
    default: {
      accent: '#3399ff',
      background: '#330033',
      text: '#dcdcdc',
      contrast: '#393939',
      contentBackground: '#e6e9e6',
      contentText: '#393939',
    },
    success: { accent: '#62cf8f' },
    information: { accent: '#5bcad2' },
    warning: { accent: '#efea8f' },
    error: { accent: '#f24a34' },
  },
};

const crisp: ToastTheme = {
  name: 'crisp',
  component: {
    icon: DefaultIcon,
    title: DefaultTitle,
    design: WingedToast,
  },
  colors: {
    default: {
      accent: '#0284c7',
      background: '#292929',
      text: '#eee',
      contrast: '#292929',
      contentBackground: '#e6e9e6',
      contentText: '#292929',
    },
    success: { accent: '#16a34a' },
    information: { accent: '#0284c7' },
    warning: { accent: '#ca8a04' },
    error: { accent: '#e11d48' },
  },
};

const marker: ToastTheme = {
  name: 'marker',
  component: {
    icon: DefaultIcon,
    title: DefaultTitle,
    design: DashedToast,
  },
  colors: {
    default: {
      accent: '#3388cc',
      background: '#f8f9f6',
      text: '#393939',
      contrast: '#393939',
      focus: '#fff',
      contentBackground: '#f8f9f6',
      contentText: '#393939',
    },
    success: { accent: '#16a34a', background: '#d0f1de', icon: '#393939' },
    information: { accent: '#0284c7', background: '#ceeff2', icon: '#393939' },
    warning: { accent: '#ca8a04', background: '#faf9de', icon: '#393939' },
    error: { accent: '#e11d48', background: '#fbc9c3', icon: '#393939' },
  },
};

export { action, candy, crisp, marker };
