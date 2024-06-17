import { MetaProvider, Title, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MultiProvider } from "@solid-primitives/context";
import { Toaster } from "solid-toast";

import { AuthProvider } from "./context/auth";
import { SharedProvider } from "./context/shared";
import { ChatProvider } from "./context/chat";

// import styles
import "./app.css";

const App = () => {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>Telegram</Title>
					<Link
						rel="icon"
						href="/favicon.svg"
						type="image/svg+xml"
					/>

					<MultiProvider values={[AuthProvider, SharedProvider, ChatProvider]}>
						<Toaster
							position="bottom-center"
							toastOptions={{
								className:
									"!bg-neutral !text-accent md:!text-sm md:!px-3 md:!py-2 !rounded-lg"
							}}
						/>
						<Suspense>{props.children}</Suspense>
					</MultiProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
};

export default App;
