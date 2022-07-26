import React from "react";
import { KBFITLayout } from "../layout/KBFITLayout";
import { FooterView, WorkflowItemView } from "../views";

export const WorkflowPage = () => {
    return (
        <>
            <KBFITLayout>
                <section className="content">
                    <WorkflowItemView />
                </section>
                <FooterView />
            </KBFITLayout>
        </>
    );
};
