import React from "react";
import { NavBar } from "../components";

export const KBFITLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};
