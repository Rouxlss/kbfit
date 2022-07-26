import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { KBFITRoutes } from "../kbfit/routes/KBFITRoutes";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Login y Registro */}
            <Route path="/auth/*" element={<AuthRoutes />} />
            {/* Journal App */}
            <Route path="/*" element={<KBFITRoutes />} />
        </Routes>
    );
};
