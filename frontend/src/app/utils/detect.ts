import { BrowserInfo, detect } from 'detect-browser';

const detectBrowser = detect() as BrowserInfo;

export const { name, version, os, type } = detectBrowser;
export const isIE = name === 'ie';
export const isSafari = name === 'safari';
export const isIosSafari = name === 'ios';
export const isChrome = name === 'chrome';
export const isEdge = name === 'edge';
export const isFireFox = name === 'firefox';


