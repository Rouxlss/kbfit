import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { KBFITApp } from "./KBFITApp";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <BrowserRouter>
            <KBFITApp />
        </BrowserRouter>
    // </React.StrictMode>
);
