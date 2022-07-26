import React from "react";
import { KBFITPage } from "../pages/KBFITPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { WorkflowPage } from "../pages/WorkflowPage";

export const KBFITRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<KBFITPage />} />
            <Route path="/workflow/:id" element={<WorkflowPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    );
};
