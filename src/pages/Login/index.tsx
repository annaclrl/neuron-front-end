import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Usuario, UsuarioComLogin } from '../../types/usuario';
import Logo from '../../assets/images/logo-neuron.png'
import { buscarUsuarioPorId, buscarUsuarios } from '../../services/usuarioService';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UsuarioComLogin>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const message = location.state?.message;

  useEffect(() => {
    const buscarTodosUsuarios = async () => {
        try {
            const response = await buscarUsuarios();

            setUsuarios(response);

            console.log("Usuários carregados:", response);
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        }
        
    };

    buscarTodosUsuarios();
  }, []);

  const onSubmit = async (data: UsuarioComLogin) => {
    setIsLoading(true);
    setLoginError('');

    try {

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === data.email && u.senha === data.senha
      );

      localStorage.setItem("userId", String(usuarioEncontrado?.id));

      const usuarioLogado = await buscarUsuarioPorId(Number(usuarioEncontrado?.id));
      console.log("Usuário logado:", usuarioLogado);

      const tipoMap: Record<number, string> = {
        1: "RH_CLEVEL",
        2: "FUNCIONARIO",
        3: "GESTOR"
      };

      const tipo = tipoMap[usuarioLogado.codigoAcesso] || "FUNCIONARIO";

      localStorage.setItem("usuario_logado", JSON.stringify({
        id: usuarioLogado.id,
        nome: usuarioLogado.nome,
        tipo,
        codigoAcesso: usuarioLogado.codigoAcesso,
        email: usuarioLogado.email,
        codigoDepartamento: usuarioLogado.codigoDepartamento
      }));

      switch (usuarioLogado.codigoAcesso) {
        case 1:
          navigate('/dashboard-rh');
          break;
        case 2:
          navigate('/formulario');
          break;
        case 3:
          navigate('/dashboard-gestor');
          break;
        default:
          navigate('/formulario');
      }

    } catch (err) {
      console.error("Erro no login ou busca:", err);
      setLoginError('E-mail ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className="min-h-screen flex" style={{ fontFamily: 'var(--fonte-principal)' }}>
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="text-center mb-8">
          <img
            src={Logo}
            alt="Logo do site com um cérebro e escrito neuron"
            className="h-12 md:h-16 lg:h-30 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--cinza-escuro)' }}>Bem-vindo de volta</h1>
          <p className="text-gray-600 text-lg">
            Faça login para acessar sua conta e continuar cuidando do bem-estar emocional
          </p>
        </div>

        {message && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              id="login-email"
              type="email"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              placeholder="seu@email.com"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido'
                }
              })}
            />
            {errors.email && <span className="text-red-600 text-sm font-medium block mt-1">{errors.email.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="login-senha" className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <input
                id="login-senha"
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${errors.senha ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                placeholder="Digite sua senha"
                {...register('senha', { required: 'Senha é obrigatória' })}
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-(--roxo-vibrante) font-medium hover:text-(--roxo-escuro)transition-colors duration-200" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.senha && <span className="text-red-600 text-sm font-medium block mt-1">{errors.senha.message}</span>}
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-red-700 text-sm font-medium">{loginError}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-(--roxo-vibrante) border-gray-300 rounded focus:ring-(--roxo-vibrante)" />
              <span className="text-sm text-gray-700">Lembrar de mim</span>
            </label>
            <p className="text-sm text-(--roxo-vibrante)] hover:text-(--roxo-escuro)] font-medium transition-colors duration-200 cursor-pointer">Esqueceu a senha?</p>
          </div>

          <button
            type="submit"
            className={`w-full bg-(--roxo-vibrante) text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#8B5FFF] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Não tem uma conta?
            <Link to="/cadastro" className="text-(--roxo-vibrante) font-semibold hover:text-(--roxo-escuro) transition-colors duration-200 ml-1">Criar conta</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-linear-to-br from-(--roxo-escuro) to-(--azul-acinzentado) text-white p-12 flex-col justify-center">
        <div className="max-w-lg mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Transforme o bem-estar na sua organização</h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            Acesse insights valiosos sobre a saúde emocional da sua equipe e
            crie um ambiente de trabalho mais saudável e produtivo.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
