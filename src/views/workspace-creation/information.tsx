import { type Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { TextField } from "@kobalte/core";

import { setWorkspaceCreationSetup, workspaceCreationSetup } from "~/controllers/workspace-creation-setup";
import WorkspaceCreationStep from "~/components/layouts/WorkspaceCreationStep";

/**
 * @route `/workspace-creation/information`
 */
const Page: Component = () => {
  const navigate = useNavigate();
  const [name, setName] = createSignal(workspaceCreationSetup()?.name ?? "");

  return (
    <WorkspaceCreationStep
      title="Mon espace"
      description="Renseignez les informations ci dessous pour créer le meilleur espace selon vos besoins."
      
      located="start"
      class="px-8 pb-8 flex gap-8 flex-col"
    >

      <main class="h-full">
        <form class="h-full flex flex-col" onSubmit={(event) => {
          event.preventDefault();

          setWorkspaceCreationSetup({
            id: crypto.randomUUID(), // TODO: Remplace with a simpler implementation.
            name: name(),

            // Will be configured in the `services` view.
            servicesToConfigure: [],
            configuredServices: []
          });

          navigate("/workspace-creation/services");
        }}>
          <TextField.Root
            value={name()}
            onChange={setName}
          >
            <TextField.Label class="text-black">
              Nom de l'espace
            </TextField.Label>
            <TextField.Input
              class="mt-1 bg-black/6 border border-black/24 text-black placeholder-black/50 px-4 py-3 rounded-md w-full outline-black"
              type="text"
              placeholder="A literator's space"
              required
            />
            <TextField.Description class="mt-2 text-xs text-black/40">
              Un espace est un endroit dédié où vous pouvez organiser et gérer tous les services qui vous y associerez.
            </TextField.Description>
          </TextField.Root>

          <div class="mt-auto py-4 flex">
            <button type="submit" class="w-full bg-[#841FFD] rounded-full px-4 py-2 text-white text-[15px] text-center outline-black disabled:opacity-60"
              disabled={!name()}
            >
              Commencer
            </button>
          </div>
        </form>
      </main>
    </WorkspaceCreationStep>
  );
};

export default Page;