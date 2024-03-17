import { type FlowComponent } from "solid-js";
import { Motion, type MotionComponentProps } from "solid-motionone"

export type PageProps = MotionComponentProps & {
  class?: string;
}

/**
 * A position fixed `<div>` that takes up the entire screen.
 * Used as a page wrapper.
 * 
 * Allows to make easy transitions between pages
 * without having to worry about any breakage.
 */
const PageContainer: FlowComponent<PageProps> = (props) => {
  return (
    <Motion.div
      {...props}

      // When no exit is provided, the page will not animate.
      exit={props.exit ?? { opacity: 0, transition: { duration: 0 }}}
      
      // Always at z-index 0 and full page fixed.
      class={`z-0 fixed inset-0 ${props.class || ""}`}
    />
  )
};

export default PageContainer;
