import React from "react";
import { AppRouter } from "./router/AppRouter";
import { UserProvider } from "./context/";

export const KBFITApp = () => {
    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
};
