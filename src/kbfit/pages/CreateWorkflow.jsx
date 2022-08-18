import React from "react";
import { KBFITLayout } from "../layout/KBFITLayout";
import { FooterView } from "../views";
import { CreateWorkflowView } from "../views/CreateWorkflowView";

export const CreateWorkflow = () => {
    return (
        <>
            <KBFITLayout>
                
                    <CreateWorkflowView />
                
                <FooterView />
            </KBFITLayout>
        </>
    );
};
