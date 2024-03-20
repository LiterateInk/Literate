import { type RouteSectionProps } from "@solidjs/router";
import { Presence, Motion } from "solid-motionone";
import { onCleanup, type Component } from "solid-js";

import SolarArrowLeftLinear from '~icons/solar/arrow-left-linear'
import { setTransitionGoingBack } from "~/components/layouts/WorkspaceCreationStep";
import { setWorkspaceCreationSetup } from "~/controllers/workspace-creation-setup";

/**
 * This wrapper allows for a cute navigation top bar on the workspace creation flow.
 * It's also where the transitions between sub-routes are handled
 * thanks to the <Presence> in the main.
 * 
 * @route `/workspace-creation/*`
 */
const WorkspaceCreationWrapper: Component<RouteSectionProps> = (props) => {
  /** @returns the absolute path of the previous page. */
  const previousPageLink = () => {
    const current = props.location.pathname.split('/').pop();
    if (current === "services") return "/workspace-creation/information";
    
    return "/";
  };

  // When the flow is left...
  onCleanup(() => {
    // Reset the transition state to avoid any weird animation behavior.
    setTransitionGoingBack(false);

    // Free up the workspace creation setup state.
    setWorkspaceCreationSetup(undefined);
  });

  return (
    <Motion.div class="flex flex-col fixed inset-0 bg-white"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
    >
      <nav class="flex-shrink-0 p-8">
        <a
          class="text-2xl"
          href={previousPageLink()}
          onClick={() => setTransitionGoingBack(true)}
        >
          <SolarArrowLeftLinear />
        </a>
      </nav>

      <div class="relative h-full">
        <Presence>
          {props.children}
        </Presence>
      </div>
    </Motion.div>
  );
};

export default WorkspaceCreationWrapper;
