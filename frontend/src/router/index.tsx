import { Route, Routes } from "@solidjs/router";
import Chat from "../screens/chat";

export default function AppRouter() {
	return (
		<Routes>
			<Route path="/:username" component={Chat} />
		</Routes>
	);
};