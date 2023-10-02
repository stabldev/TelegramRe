import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

// lazy imports
const Chat = lazy(() => import("../screens/chat"));

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/:username" component={Chat} />
		</Routes>
	);
};