// @refresh reload
import { Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import "./root.css";
import { Toaster } from "solid-toast";
import { AuthProvider } from "./context/auth";
import { SharedProvider } from "./context/shared";
import { MultiProvider } from "@solid-primitives/context";
import { ChatProvider } from "./context/chat";

export default function Root() {
	return (
		<Html
			lang="en"
			data-theme="dark_re"
		>
			<Head>
				<Title>Telegram RE</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Body style={{ "background-image": "url(/wallpaper.svg)" }}>
				<Suspense>
					<ErrorBoundary>
						<MultiProvider values={[AuthProvider, SharedProvider, ChatProvider]}>
							<Toaster
								position="bottom-center"
								toastOptions={{ className: "!bg-neutral !text-accent md:!text-sm md:!px-3 md:!py-2 !rounded-lg" }}
							/>
							<Routes>
								<FileRoutes />
							</Routes>
						</MultiProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
