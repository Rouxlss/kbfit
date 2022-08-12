import React from "react";
import { KBFITLayout } from "../layout/KBFITLayout";
import { WorkflowView, FooterView } from "../views";

export const KBFITPage = () => {
    
    return (
        <>
            <KBFITLayout>
                <WorkflowView />
                <FooterView/>
            </KBFITLayout>
        </>
    );
};
