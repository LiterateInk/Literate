import { type Component } from "solid-js";

import PageContainer from "~/components/layouts/PageContainer";
import RandomizedLogoPatterns from "~/components/misc/RandomizedLogoPatterns";

/**
 * Shown when no workspace is found in the local database.
 * Could mean that the user is using the app for the first time,
 * or the local database was deleted (so app is in a first time state).
 * 
 * This page will show a welcome message, and a button to create a new workspace.
 * It basically redirects to the [workspace creation](./workspace-creation/) flow.
 * 
 * @route `/first-time`
 */
const Page: Component = () => {
  return (
    <PageContainer class="pt-8 bg-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.35 }}}
      exit={{ x: "-100%" }}
    >
      <header class="flex flex-col gap-2 mb-6">
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
        <RandomizedLogoPatterns />
      </header>

      <main class="px-8 py-6 flex flex-col gap-4">
        <h1 class="font-600 text-4xl">
          Bienvenue<br />
          dans Literate
        </h1>

        <p class="leading-snug">
          Réinventons ensemble l'apprentissage avec une interface sur mesure pour chaque élève.
        </p>

        <a href="/workspace-creation/information" class="mt-4 bg-[#841FFD] rounded-full px-4 py-2 text-white text-[15px] text-center">
          Créer et personnaliser mon espace
        </a>
      </main>
    </PageContainer>
  )
};

export default Page;