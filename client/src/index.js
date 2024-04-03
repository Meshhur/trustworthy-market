import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import UserStore from './store/UserStore.js';
import DeviceStore from './store/DeviceStore.js';
import { BrowserRouter } from 'react-router-dom';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>

        </Context.Provider>
    </React.StrictMode>
);