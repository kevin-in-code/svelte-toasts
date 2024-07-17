import { type ToastTheme } from './types.js';

const candy: ToastTheme = {
  name: 'candy',
  colors: {
    default: {
      accent: 'transparent',
      background: '#330033',
      text: '#dcdcdc',
      contrast: '#393939',
      contentBackground: '#e6e9e6',
      contentText: '#393939',
    },
    success: { accent: '#62df8f' },
    information: { accent: '#5bcad2' },
    warning: { accent: '#efea8f' },
    error: { accent: '#f27a34' },
  },
};

const crisp: ToastTheme = {
  name: 'crisp',
  colors: {
    default: {
      accent: 'transparent',
      background: '#292929',
      text: '#eee',
      contrast: '#292929',
      contentBackground: '#e6e9e6',
      contentText: '#292929',
    },
    success: { accent: '#16a34a' },
    information: { accent: '#0284c7' },
    warning: { accent: '#caba04' },
    error: { accent: '#d12d48' },
  },
};

const marker: ToastTheme = {
  name: 'marker',
  colors: {
    default: {
      accent: '#dddddd',
      background: '#f8f9f6',
      text: '#393939',
      contrast: '#393939',
      focus: '#fff',
      contentBackground: '#f8f9f6',
      contentText: '#393939',
    },
    success: { accent: '#16a34a', background: '#d0f1de', icon: '#393939' },
    information: { accent: '#0284c7', background: '#ceeff2', icon: '#393939' },
    warning: { accent: '#baaa24', background: '#faf9de', icon: '#393939' },
    error: { accent: '#e15d48', background: '#fbc9c3', icon: '#393939' },
  },
};

const chalk: ToastTheme = {
  name: 'chalk',
  colors: {
    default: {
      accent: '#9878d1',
      background: '#506070',
      text: '#e5e5e5',
      contrast: '#393939',
      contentBackground: '#ebebe8',
      contentText: '#393939',
    },
    success: { accent: '#78d18b', icon: '#78d18b' },
    information: { accent: '#6caee5', icon: '#6caee5' },
    warning: { accent: '#e5d36c', icon: '#e5d36c' },
    error: { accent: '#e57b6c', icon: '#e57b6c' },
  },
};

export { candy, chalk, crisp, marker };
