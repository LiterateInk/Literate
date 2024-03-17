import { type Component } from "solid-js";
import { Navigate } from "@solidjs/router";

const Page: Component = () => {
  return (
    <Navigate href="/first-time" />
  );
};

export default Page;