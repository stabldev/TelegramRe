// @refresh reload
import { Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import Sidebar from "./components/sidebar";
import { AuthProvider } from "./context/auth";
import "./root.css";

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Telegram Web</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<AuthProvider>
							<main
								class="relative grid h-screen w-screen grid-cols-[25vw_1fr]"
								style={{
									"background-image": "url(/wallpaper.svg)"
								}}
							>
								{/* dark overlay for background-image */}
								<div class="absolute inset-0 -z-[9999] bg-black/95" />

								<Sidebar />
								<Routes>
									<FileRoutes />
								</Routes>
							</main>
						</AuthProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
