import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; 
import type {Usuario} from '../../types/usuario';
import { useNavigate } from 'react-router-dom';

const DadosConta = () => {
  const { darkMode } = useTheme();
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [showFormEdicao, setShowFormEdicao] = useState(false);
  const [showDesativarModal, setShowDesativarModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Usuario>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userJSON = localStorage.getItem("usuario_logado");

      if (userJSON) {
        const user = JSON.parse(userJSON);

        const usuarioAtualizado: Usuario = {
          nome: typeof user.nome === "string" ? user.nome : "",
          email: typeof user.email === "string" ? user.email : "",
          tipo: typeof user.tipo === "string" ? user.tipo : "FUNCIONARIO"
        };

        setUsuarioLogado(usuarioAtualizado);
        reset(usuarioAtualizado);
      } else {
        setUsuarioLogado(null);
        navigate('/login');
      }

    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
      setUsuarioLogado(null);
      navigate('/login');
    }
  }, [reset, navigate]);

  const onSubmit: SubmitHandler<Usuario> = (data) => {
    if (!usuarioLogado) return;

    const atualizado: Usuario = {
      ...usuarioLogado,
      nome: data.nome,
      email: data.email
    };

    localStorage.setItem("usuario_logado", JSON.stringify(atualizado));
    setUsuarioLogado(atualizado);
    setShowFormEdicao(false);
    alert("Dados atualizados com sucesso!");
  };

  const handleCancelarEdicao = () => {
    reset(usuarioLogado!);
    setShowFormEdicao(false);
  };

  const handleDesativarConta = () => {
    localStorage.removeItem('usuario_logado');
    alert("Conta desativada com sucesso!");
    setShowDesativarModal(false);
    navigate('/login');
  };

  const getTipoUsuarioLabel = (tipo: string) => {
    switch (tipo) {
      case "RH":
        return "Recursos Humanos";
      case "GESTOR":
        return "Gestor";
      case "FUNCIONARIO":
        return "Funcionário";
      default:
        return tipo;
    }
  };

  if (!usuarioLogado) {
    return (
      <div className={`min-h-screen bg-linear-to-br flex items-center justify-center transition-colors duration-300 ${
        darkMode 
          ? "from-gray-900 to-gray-800 text-white" 
          : "from-(--cinza-cl to-white text-gray-800"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--roxo-vibrante)] mx-auto mb-4"></div>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-linear-to-br py-8 px-4 sm:py-12 sm:px-6 transition-colors duration-300 ${
      darkMode 
        ? "from-gray-900 to-gray-800 text-white" 
        : "from-(--cinza-claro)] to-white text-gray-800"
    }`}>
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Dados da Conta
          </h1>
          <p className={`text-lg ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg border p-6 sm:p-8 mb-6 transition-colors duration-300 ${
          darkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-100"
        }`}>

          <div className={`flex items-center gap-4 mb-6 pb-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}>
            <div className="w-16 h-16 bg-linear-to-br from-(--roxo-vibrante) to-(--roxo-escuro) rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {usuarioLogado.nome.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}>
                {usuarioLogado.nome}
              </h2>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {usuarioLogado.email}
              </p>
              <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                darkMode 
                  ? "bg-blue-900/30 text-blue-300" 
                  : "bg-blue-100 text-blue-700"
              }`}>
                {getTipoUsuarioLabel(usuarioLogado.tipo)}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Nome completo
                </label>
                <div className={`w-full px-4 py-3 border rounded-xl ${
                  darkMode 
                    ? "border-gray-600 bg-gray-700 text-gray-300" 
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}>
                  {usuarioLogado.nome}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Email
                </label>
                <div className={`w-full px-4 py-3 border rounded-xl ${
                  darkMode 
                    ? "border-gray-600 bg-gray-700 text-gray-300" 
                    : "border-gray-200 bg-gray-50 text-gray-800"
                }`}>
                  {usuarioLogado.email}
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                Tipo de usuário
              </label>
              <div className={`w-full px-4 py-3 border rounded-xl ${
                darkMode 
                  ? "border-gray-600 bg-gray-700 text-gray-300" 
                  : "border-gray-200 bg-gray-50 text-gray-800"
              }`}>
                {getTipoUsuarioLabel(usuarioLogado.tipo)}
              </div>
              <p className={`text-xs mt-2 ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}>
                O tipo de usuário não pode ser alterado
              </p>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-3 pt-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}>
            <button
              type="button"
              onClick={() => setShowFormEdicao(!showFormEdicao)}
              className="flex-1 bg-linear-to-r from-(--roxo-vibrante) to-(--roxo-escuro) text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {showFormEdicao ? "Cancelar Atualização" : "Atualizar Dados"}
            </button>
            <button
              type="button"
              onClick={() => setShowDesativarModal(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold border transition-all duration-300 ${
                darkMode 
                  ? "bg-red-900/30 text-red-400 border-red-800 hover:bg-red-900/50" 
                  : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              }`}
            >
              Desativar Conta
            </button>
          </div>

          {showFormEdicao && (
            <div className={`mt-6 pt-6 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}>
                Atualizar Dados da Conta
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Nome completo
                    </label>
                    <input
                      type="text"
                      {...register("nome", {
                        required: "O nome é obrigatório",
                        minLength: {
                          value: 2,
                          message: "Nome deve ter pelo menos 2 caracteres"
                        }
                      })}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-700"
                      } ${errors.nome ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Digite seu nome completo"
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm mt-2">{errors.nome.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={usuarioLogado.email}
                      disabled
                      className={`w-full px-4 py-3 border rounded-xl cursor-not-allowed ${
                        darkMode
                          ? "border-gray-600 bg-gray-700 text-gray-400"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    />
                    <p className={`text-xs mt-2 ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}>
                      O email não pode ser alterado
                    </p>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Tipo de usuário
                  </label>
                  <input
                    type="text"
                    value={getTipoUsuarioLabel(usuarioLogado.tipo)}
                    disabled
                    className={`w-full px-4 py-3 border rounded-xl cursor-not-allowed ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-400"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                  <p className={`text-xs mt-2 ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}>
                    O tipo de usuário não pode ser alterado
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-(--roxo-vibrante) to-(--roxo-escuro) text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelarEdicao}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold border transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {showDesativarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-2xl p-6 max-w-md w-full transition-colors duration-300 ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}>
            <h3 className={`text-xl font-semibold mb-3 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
              Desativar Conta
            </h3>
            <p className={`mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Tem certeza que deseja desativar sua conta? Esta ação é irreversível e
              todos os seus dados serão permanentemente excluídos.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDesativarConta}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Sim, Desativar
              </button>
              <button
                onClick={() => setShowDesativarModal(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DadosConta;
