import { type Component } from "solid-js";
import WorkspaceCreationStep from "~/components/layouts/WorkspaceCreationStep";

/**
 * @route `/workspace-creation/services`
 */
const Page: Component = () => {
  return (
    <WorkspaceCreationStep
      shouldCheckForUndefinedSetup
  
      title="Vos services"
      description="Sélectionnez vos services de vie scolaire."
  
      located="middle"
      class="px-8 pb-8 flex gap-8 flex-col"
    >
      <div></div>
    </WorkspaceCreationStep>
  );
};

export default Page;
