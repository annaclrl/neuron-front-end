import { createBrowserRouter } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";
import Integrantes from "../pages/Integrantes";
import FAQContato from "../pages/FAQContato";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PaginaInicial />
    },
    {
        path: "/integrantes",
        element: <Integrantes />
    },
    {
        path: "/sobre",
        element: <FAQContato />
    }
])