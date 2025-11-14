import { createBrowserRouter } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PaginaInicial />
    }
])