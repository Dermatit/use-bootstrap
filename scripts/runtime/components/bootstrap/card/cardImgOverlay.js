import { useBlock, BlockProps } from "../../../composables/base/useBlock.js";
import { hProps } from "../../../composables/utils/useProps.js";
import { defineComponent, h } from "#imports";
export default defineComponent({
  name: "BsCardImgOverlay",
  props: {
    ...BlockProps,
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const block = useBlock(props);
    const current = {
      class: {
        "card-img-overlay": true
      }
    };
    return () => h(props.tag, hProps(current, block), context.slots);
  }
});
