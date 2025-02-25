import { useBlock, BlockProps } from "../../../composables/base/useBlock.js";
import { hProps } from "../../../composables/utils/useProps.js";
import { defineComponent, h } from "#imports";
export default defineComponent({
  name: "BsDropdownItemDivider",
  props: {
    ...BlockProps,
    divider: {
      type: Boolean
    }
  },
  setup(props, context) {
    const block = useBlock(props);
    const current = {
      class: {
        "dropdown-divider": true
      }
    };
    return () => h("li", h("hr", hProps(block, current), context.slots));
  }
});
