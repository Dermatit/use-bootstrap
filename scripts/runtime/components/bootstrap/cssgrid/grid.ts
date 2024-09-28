import { addProp, hProps } from '../../../composables/utils/useProps';
import { useBlock, BlockProps } from '../../../composables/base/useBlock';
import { defineComponent, h, computed } from '#imports';
//
export default defineComponent({
 name: 'BsCssGrid',
 props: {
  ...BlockProps,
  tag: {
   type: String,
   default: 'div',
  },
  columns: {
   type: Number,
   default: 12,
  },
  gap: {
   type: String,
   default: undefined,
  },
  rows: {
   type: Number,
   default: undefined,
  },
  rowGap: {
   type: Number,
   default: undefined,
  },
 },
 setup(props, context) {
  //
  const block = useBlock(props);
  //
  const current = {
   class: {
    grid: true,
   },
   style: computed(() => {
    return {
     ...addProp(props.rows, '--bs-rows', `${props.rows}`),
     ...addProp(props.columns != 12, '--bs-columns', `${props.columns}`),
     ...addProp(props.gap, '--bs-gap', `${props.gap}`),
     ...addProp(props.rowGap, 'row-gap', `${props.rowGap}`),
    };
   }),
  };
  //
  return () => h(props.tag, hProps(current, block), context.slots);
 },
});
