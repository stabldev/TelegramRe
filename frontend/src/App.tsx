import type { Component } from 'solid-js';
import Sidebar from './components/sidebar';
import { AppRouter } from "./router";

const App: Component = () => {
    return (
        <>
            <main class='w-screen h-screen grid grid-cols-[25vw_1fr]'>
                <Sidebar />
                <AppRouter />
            </main>
        </>
    );
};

export default App;
