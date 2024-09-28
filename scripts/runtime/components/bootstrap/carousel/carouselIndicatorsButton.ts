import { hProps, hSlots } from '../../../composables/utils/useProps';
import { useBlock, BlockProps } from '../../../composables/base/useBlock';
import {
 CarouselControlProps,
 useCarouselControl,
} from '../../../composables/bootstrap/useCarouselControl';
import { defineComponent, h, ref } from '#imports';
//
export default defineComponent({
 name: 'BsCarouselIndicatorsButton',
 props: {
  ...BlockProps,
  ...CarouselControlProps,
  tag: {
   type: String,
   default: 'button',
  },
 },
 setup(props, context) {
  //
  const elementRef = ref<HTMLElement>();
  const block = useBlock(props);
  const toggle = useCarouselControl(props, elementRef);
  //
  const current = {
   ref: elementRef,
  };
  //
  return () =>
   h(
    props.tag,
    hProps(current, block, toggle),
    hSlots(context.slots.default),
   );
 },
});
