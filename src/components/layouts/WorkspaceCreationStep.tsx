import { createMemo, createSignal, onMount, type FlowComponent, Show } from "solid-js";
import { Navigate } from "@solidjs/router";

import PageContainer from "~/components/layouts/PageContainer";
import { workspaceCreationSetup } from "~/controllers/workspace-creation-setup";

const [transitionGoingBack, setTransitionGoingBack] = createSignal(false);
export { setTransitionGoingBack };

const WorkspaceCreationStep: FlowComponent<{
  class?: string;

  /** Used for the transition of the page. */
  located: "start" | "middle" | "end";
  
  title: string
  description: string

  /**
   * Should go back to the first page
   * if the setup is still `undefined`.
   * 
   * For more context : the setup is defined only when
   * the first page is completed. 
  */
  shouldCheckForUndefinedSetup?: boolean;
}> = (props) => {
  const initialX = createMemo(() => {
    if (props.located === "start") {
      if (transitionGoingBack()) return "-100%";
      else return 0;
    }
    else if (props.located === "middle") {
      if (transitionGoingBack()) return "-100%";
      else return "100%";
    }
    else { // if located at "end"
      if (transitionGoingBack()) return "100%";
      else return "-100%";
    }
  });

  const exitX = createMemo(() => {
    if (props.located === "start") {
      if (transitionGoingBack()) return 0;
      else return "-100%";
    }
    else if (props.located === "middle") {
      if (transitionGoingBack()) return "100%";
      else return "-100%";
    }
    else { // if located at "end"
      if (transitionGoingBack()) return "-100%";
      else return "100%";
    }
  });

  // When a page finished to transition, reset the state to default.
  onMount(() => setTransitionGoingBack(false));

  return (
    <Show when={!props.shouldCheckForUndefinedSetup || (props.shouldCheckForUndefinedSetup && typeof workspaceCreationSetup() !== "undefined")}
      fallback={<Navigate href="/workspace-creation/information" />}
    >
      <PageContainer
        class={props.class}
        initial={{ x: initialX() }}
        animate={{ x: 0 }}
        exit={{ x: exitX() }}
      >
        <header>
          <h1 class="text-3xl font-600">
            {props.title}
          </h1>
          <p class="text-sm text-black/60">
            {props.description}
          </p>
        </header>

        {props.children}
      </PageContainer>
    </Show>
  );
};

export default WorkspaceCreationStep;
