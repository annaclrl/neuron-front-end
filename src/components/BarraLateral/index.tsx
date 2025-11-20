import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BarChart2,
  ClipboardList,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; 
import type { Usuario } from "../../types/usuario";
import Logo from '../../assets/images/logo-neuron.png'

const BarraLateral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario_logado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado) as Usuario);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario_logado");
    navigate("/login");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  if (!usuario) return null;

  const sidebarLinks = [
    { to: "/historico", label: "Histórico", icon: <BarChart2 size={20} /> },
    { to: "/formulario", label: "Formulário", icon: <ClipboardList size={20} /> },
    { to: "/dados-conta", label: "Perfil", icon: <User size={20} /> },
  ];

  if (usuario.tipo === "RH_CLEVEL") {
    sidebarLinks.push({
      to: "/dashboard-rh",
      label: "Dashboard RH",
      icon: <Home size={20} />,
    });
  } else if (usuario.tipo === "GESTOR") {
    sidebarLinks.push({
      to: "/dashboard-gestor",
      label: "Dashboard Gestor",
      icon: <Home size={20} />,
    });
  }


  const formatarAcesso = (acesso: number) =>{
    switch (acesso) {
      case 1:
        return "Dashboard RH";

      case 2:  
        return null;

      case 3:
         return "Dashboard Gestor";
    
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={`hidden lg:flex lg:w-64 flex-col ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } shadow-xl z-10 transition-colors duration-300`}
      >
        <div className=" border-b border-gray-200 dark:border-gray-700">
          <img
            src={Logo}
            alt="Logo do site com um cérebro e escrito neuron"
            className="h-12 md:h-16 lg:h-30 w-auto mx-auto mb-4"
          />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-(--roxo-vibrante) text-white"
                    : darkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">
              {darkMode ? "Modo Claro" : "Modo Escuro"}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>
      <div
        className={`lg:hidden w-full shadow-sm border-b p-4 fixed top-0 left-0 right-0 z-20 ${
          darkMode 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-gray-800 border-gray-100"
        } transition-colors duration-300`}
      >
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${
            darkMode ? "text-purple-300" : "text-(--roxo-escuro)"
          }`}>
            Neuron
          </h1>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <User size={20} />
              <span className="text-sm font-medium">
                {usuario.nome.split(" ")[0]}
              </span>
            </button>

            {showProfileMenu && (
              <div
                className={`absolute right-0 top-12 rounded-lg shadow-lg border py-2 w-48 z-30 ${
                  darkMode 
                    ? "bg-gray-800 text-white border-gray-700" 
                    : "bg-white text-gray-800 border-gray-200"
                } transition-colors duration-300`}
              >
                <div className={`px-4 py-2 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <p className="text-sm font-semibold">{usuario.nome}</p>
                  <p className="text-xs opacity-80">{usuario.email}</p>

                  {formatarAcesso(usuario.codigoAcesso) && (
                    <p className="text-xs opacity-80 capitalize">
                      {formatarAcesso(usuario.codigoAcesso)}
                    </p>
                  )}
                </div>

                <Link
                  to="/dados-conta"
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Settings size={16} />
                  Editar Perfil
                </Link>

                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? "Modo Claro" : "Modo Escuro"}
                </button>

                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                    darkMode 
                      ? "text-red-400 hover:bg-gray-700" 
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav
        className={`lg:hidden fixed bottom-0 left-0 right-0 border-t p-3 z-20 ${
          darkMode 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-gray-800 border-gray-100"
        } transition-colors duration-300`}
      >
        <div className="flex justify-around items-center">
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? "text-(--roxo-vibrante)" 
                    : darkMode 
                      ? "text-gray-400" 
                      : "text-gray-600"
                } ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <main
        className={`flex-1 w-full min-h-screen overflow-y-auto transition-colors duration-300 ${
          darkMode 
            ? "bg-gray-900 text-white" 
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="pt-16 pb-16 lg:pt-0 lg:pb-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BarraLateral;