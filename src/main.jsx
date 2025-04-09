import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from "react-router";

const root = createRoot(document.getElementById('root'))
root.render(
    <HashRouter>
        <App />
    </HashRouter>
)
