import { KBFITPage } from "../pages/KBFITPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { WorkflowPage } from "../pages/WorkflowPage";
import { CreateWorkflow } from "../pages/CreateWorkflow";

export const KBFITRoutes = () => {
    return (
        <Routes>
            <Route path="admin" element={<CreateWorkflow />} />
            <Route path="dashboard" element={<KBFITPage />} />
            <Route path="workflow/:id" element={<WorkflowPage />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};
