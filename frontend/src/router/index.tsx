import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

// lazy imports
const Chat = lazy(() => import("../screens/chat"));

export const AppRouter: Component = () => {
	return (
		<Routes>
			<Route path="/:username" component={Chat} />
		</Routes>
	);
};