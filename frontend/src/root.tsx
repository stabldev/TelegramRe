// @refresh reload
import { Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import "./root.css";
import { Toaster } from "solid-toast";
import { AuthProvider } from "./context/auth";
import { SharedProvider } from "./context/shared";
import { MultiProvider } from "@solid-primitives/context";

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Telegram RE</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<MultiProvider values={[AuthProvider, SharedProvider]}>
							<Toaster position="bottom-right" />
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
