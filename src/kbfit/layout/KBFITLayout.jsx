import React from "react";
import { NavBar } from "../components";

const drawerWidth = "300px";

export const KBFITLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};
