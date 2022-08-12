import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { KBFITRoutes } from "../kbfit/routes/KBFITRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
    return (
        <Routes>

            <Route
                path="/auth/*"
                element={
                    <PublicRoute>
                        <AuthRoutes />
                    </PublicRoute>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <KBFITRoutes />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
