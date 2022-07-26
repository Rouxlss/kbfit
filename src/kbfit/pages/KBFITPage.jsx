import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { KBFITLayout } from "../layout/KBFITLayout";
import { WorkflowView, FooterView } from "../views";

export const KBFITPage = () => {
    return (
        <>
            <KBFITLayout>
                <WorkflowView />
                <FooterView/>
                {/* <NoteView /> 
                <NothingSelectedView />
                <IconButton
                    size="large"
                    sx={{
                        color: "white",
                        backgroundColor: "error.main",
                        ":hover": { backgroundColor: "error.main", opacity: 0.8 },
                        position: "fixed",
                        bottom: 50,
                        right: 50,
                    }}
                >
                    <AddOutlined sx={{fontSize: 30}}/>
                </IconButton> */}
            </KBFITLayout>
        </>
    );
};
