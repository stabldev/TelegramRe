import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MultiProvider } from "@solid-primitives/context";
import { Toaster } from "solid-toast";

import { AuthProvider } from "./context/auth";
import { SharedProvider } from "./context/shared";
import { ChatProvider } from "./context/chat";

import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <MultiProvider values={[AuthProvider, SharedProvider, ChatProvider]}>
            <Toaster
              position="bottom-center"
              toastOptions={{ className: "!bg-neutral !text-accent md:!text-sm md:!px-3 md:!py-2 !rounded-lg" }}
            />
            <Suspense>{props.children}</Suspense>
          </MultiProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
