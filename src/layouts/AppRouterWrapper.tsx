import { type RouteSectionProps } from "@solidjs/router";
import { type Component } from "solid-js";
import { Presence } from "solid-motionone";

const RouterWrapper: Component<RouteSectionProps<unknown>> = (props) => {
  return (
    <Presence>
      {props.children}
    </Presence>
  );
};

export default RouterWrapper;
