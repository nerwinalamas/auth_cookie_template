import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* <CookiesProvider> */}
                <App />
            {/* </CookiesProvider> */}
        </QueryClientProvider>
    </React.StrictMode>
);
