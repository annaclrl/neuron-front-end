import { createBrowserRouter } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";
import Integrantes from "../pages/Integrantes";
import FAQContato from "../pages/FAQContato";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

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
        path: "/informacoes",
        element: <FAQContato />
    },
    {
        path: "/cadastro",
        element: <Cadastro />
    },
    {
        path: '/login',
        element: <Login />
    }
])