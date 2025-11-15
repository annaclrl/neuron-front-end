import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { Home, BarChart2, ClipboardList, Moon, Sun, LogOut, Settings, User, } from "lucide-react";
import type {Usuario} from '../../types/usuario'
import { useTheme } from "../../context/ThemeContext";


const BarraLateral = () => {
  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useTheme();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("mindtrack_usuario_logado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("mindtrack_usuario_logado");
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

  if (usuario.tipo === "RH") {
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

  return (
    <div>


      <aside>
        <div>
          <h1>MindTrack</h1>
        </div>

        <nav>
          {sidebarLinks.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div>
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </button>

          <button onClick={handleLogout}>
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>


      <header>
        <div>
          <h1>MindTrack</h1>

          <div>
            <button onClick={toggleProfileMenu}>
              <User size={20} />
              <span>{usuario.nome.split(" ")[0]}</span>
            </button>

            {showProfileMenu && (
              <div>
                <div>
                  <p>{usuario.nome}</p>
                  <p>{usuario.email}</p>
                  <p>{usuario.tipo.toLowerCase()}</p>
                </div>

                <Link to="/dados-conta" onClick={() => setShowProfileMenu(false)}>
                  <Settings size={16} />
                  Editar Perfil
                </Link>

                <button onClick={toggleDarkMode}>
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? "Modo Claro" : "Modo Escuro"}
                </button>

                <button onClick={handleLogout}>
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav>
        <div>
          {sidebarLinks.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BarraLateral;
