import type { Component } from 'solid-js';
import Sidebar from './components/sidebar';

const App: Component = () => {
    return (
        <>
            <main class='w-screen h-screen grid grid-cols-[25vw_1fr]'>
                <Sidebar />
            </main>
        </>
    );
};

export default App;
