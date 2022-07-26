import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavBar, SideBar } from "../components";

const drawerWidth = "300px";

export const KBFITLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
        // <h1>HOLA MUNDO</h1>
        // <Box sx={{ display: "flex" }}>

        //     <SideBar drawerWidth={drawerWidth} />

        //     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        //         <Toolbar />
        //         {children}
        //     </Box>
        // </Box>
    );
};
