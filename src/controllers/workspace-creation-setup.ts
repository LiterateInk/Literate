import { createSignal } from "solid-js";

export interface WorkspaceCreationSetupStore {
  /** Generated automatically using an UUID. */
  id: string

  /** Name of the workspace. */
  name: string

  servicesToConfigure: any[]
  configuredServices: any[]
}

// Allows to keep the setup data in memory while the user navigates between the setup pages.
// Set to `undefined` when setup is not running to free up memory.
export const [
  workspaceCreationSetup,
  setWorkspaceCreationSetup
] = createSignal<WorkspaceCreationSetupStore | undefined>(undefined);
