import { createBrowserRouter, Navigate } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";
import Integrantes from "../pages/Integrantes";
import FAQContato from "../pages/FAQContato";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import BarraLateral from "../components/BarraLateral";
import DadosConta from "../pages/DadosConta";
import FormularioHumor from "../pages/FormularioEmocao";
import HistoricoEmocoes from "../pages/HistoricoEmocoes";
import type { JSX } from "react";
import DashboardRH from "../pages/DashboardRh";
import DashboardGestor from "../pages/DashboardGestor";

const ProtectedRoute = ({ children, tiposPermitidos }: { children: JSX.Element; tiposPermitidos: number[] }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado") || "{}");

    if (!usuario || !tiposPermitidos.includes(usuario.codigoAcesso)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};



export const routes = createBrowserRouter([
    {
        path: "/",
        element: <PaginaInicial />,
        errorElement: <NotFound />
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
    },
    {
        path: '/',
        element: <BarraLateral />,
        children: [
            { path: 'formulario', element: <FormularioHumor /> },
            { path: "historico", element: <HistoricoEmocoes /> },
            { path: 'dados-conta', element: <DadosConta /> },
            {
                path: 'dashboard-rh',
                element: (
                    <ProtectedRoute tiposPermitidos={[1]}>
                        <DashboardRH />
                    </ProtectedRoute>
                ),
            },
            {
                path: "dashboard-gestor",
                element: (
                    <ProtectedRoute tiposPermitidos={[3]}>
                        <DashboardGestor />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);