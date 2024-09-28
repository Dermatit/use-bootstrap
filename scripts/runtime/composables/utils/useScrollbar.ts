import { omit, defaultDocument, set } from './helpers';
import { ref } from '#imports';
//
const SELECTOR_FIXED_CONTENT
  = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';
const PROPERTY_PADDING = 'padding-right';
const PROPERTY_MARGIN = 'margin-right';
// ScrollBarHelper
export interface UseScrollbarOptions {
 document?: Document;
 element?: HTMLElement;
}

export interface IInitial {
 overflow?: string;
}

export function useScrollbar(options: UseScrollbarOptions = {}) {
 //
 const { document = defaultDocument, element = defaultDocument?.body }
    = options;
 if (!element || !document) {
  return;
 }
 //
 const actualValue = ref<Record<string, string>>({});
 //
 // const initial: IInitial = {}
 // スクロールバーの幅
 const getWidth = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
 };
  // スクロールバーを非表示
 const hide = () => {
  const width = getWidth();
  disableOverFlow();
  // give padding to element to balance the hidden scrollbar width
  setElementAttributes(
   element,
   PROPERTY_PADDING,
   (calculatedValue: number) => calculatedValue + width,
  );
  // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
  document
   .querySelectorAll<HTMLElement>(SELECTOR_FIXED_CONTENT)
   .forEach((item) => {
    setElementAttributes(
     item,
     PROPERTY_PADDING,
     (calculatedValue: number) => calculatedValue + width,
    );
   });
  document
   .querySelectorAll<HTMLElement>(SELECTOR_STICKY_CONTENT)
   .forEach((item) => {
    setElementAttributes(
     item,
     PROPERTY_MARGIN,
     (calculatedValue: number) => calculatedValue - width,
    );
   });
 };

 const reset = () => {
  // element.style.removeProperty('overflow');
  resetElementAttributes(element, 'overflow');
  resetElementAttributes(element, PROPERTY_PADDING);
  document
   .querySelectorAll<HTMLElement>(SELECTOR_FIXED_CONTENT)
   .forEach((item) => {
    resetElementAttributes(item, PROPERTY_PADDING);
   });
  document
   .querySelectorAll<HTMLElement>(SELECTOR_STICKY_CONTENT)
   .forEach((item) => {
    resetElementAttributes(item, PROPERTY_MARGIN);
   });
 };

 const isOverflowing = () => {
  return getWidth() > 0;
 };

 // overflowを非表示
 const disableOverFlow = () => {
  // initial.overflow = element.style.getPropertyValue("overflow")
  saveInitialAttribute(element, 'overflow');
  element.style.overflow = 'hidden';
 };

 function setElementAttributes(
  current: HTMLElement,
  styleProperty: string,
  callback: (size: number) => number,
 ) {
  if (
   current !== element
   && window.innerWidth > current.clientWidth + getWidth()
  ) {
   return;
  }
  saveInitialAttribute(current, styleProperty);
  const calculatedValue = window
   .getComputedStyle(current)
   .getPropertyValue(styleProperty);
  current.style.setProperty(
   styleProperty,
   `${callback(Number.parseFloat(calculatedValue))}px`,
  );
 }

 //  function datasetName(property: string) {
 //   return camelCase(`bs-${property}`);
 //  }

 // 初期属性を保存
 function saveInitialAttribute(current: HTMLElement, styleProperty: string) {
  set(actualValue.value, styleProperty, current.style.getPropertyValue(styleProperty));
  // actualValue.valueOf[styleProperty] = current.style.getPropertyValue(styleProperty);
  // const actualValue = current.style.getPropertyValue(styleProperty);
  // if (actualValue) {
  //  current.dataset[datasetName(styleProperty)] = actualValue;
  // }
 }

 function resetElementAttributes(current: HTMLElement, styleProperty: string) {
  const value = actualValue.value[styleProperty];
  // const value = current.dataset[datasetName(styleProperty)];
  const actual = actualValue.value;
  const newVal = omit(actual, styleProperty);
  actualValue.value = newVal;
  // We only want to remove the property if the value is `null`; the value can also be zero
  if (!value) {
   current.style.removeProperty(styleProperty);
   if (current.style.length == 0) {
    current.removeAttribute('style');
   }
   return;
  }
  // omit(current.dataset, styleProperty);

  current.style.setProperty(styleProperty, value);
 }

 //
 return {
  getWidth,
  hide,
  reset,
  isOverflowing,
 };
}
