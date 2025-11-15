import { createBrowserRouter } from "react-router-dom";
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
        element: <BarraLateral/>,
        children: [
            { path: 'formulario', element: <FormularioHumor/>},
            { path: "historico", element: <HistoricoEmocoes /> },
            { path: 'dados-conta', element: <DadosConta/>}
        ]
    }
])