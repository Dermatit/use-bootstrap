import { hProps } from "../../composables/utils/useProps.js";
import { InlineProps, useInline } from "../../composables/base/useInline.js";
import { defineComponent, h } from "#imports";
export default defineComponent({
  name: "HtmlStrong",
  props: {
    ...InlineProps,
    tag: {
      type: String,
      default: "strong"
    }
  },
  setup(props, context) {
    const inline = useInline(props);
    return () => h(props.tag, hProps(inline), context.slots);
  }
});
