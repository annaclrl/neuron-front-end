import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import type { UsuarioComLogin } from '../../types/usuario';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UsuarioComLogin>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const message = location.state?.message;

  const onSubmit = async (data: UsuarioComLogin) => {
    setIsLoading(true);
    setLoginError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === data.email && u.senha === data.senha);

    if (usuario) {
      localStorage.setItem('usuario_logado', JSON.stringify({
        ...usuario,
        tipo: usuario.tipoUsuario
      }));

      switch (usuario.tipoUsuario) {
        case 'RH':
          navigate('/dashboard-rh');
          break;
        case 'GESTOR':
          navigate('/dashboard-gestor');
          break;
        case 'FUNCIONARIO':
          navigate('/formulario');
          break;
        default:
          navigate('/login');
          break;
      }

    } else {
      setLoginError('E-mail ou senha incorretos');
    }

    setIsLoading(false);
  };

  return (
    <main>
      <div>
        <div>
          <div>
            <span>Neuron</span>
          </div>

          <h1>Bem-vindo de volta</h1>
          <p>Faça login para acessar sua conta e continuar cuidando do bem-estar emocional</p>
        </div>

        {message && (
          <div>
            <div>{message}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="seu@email.com"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido'
                }
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="login-senha">Senha</label>

            <div>
              <input
                id="login-senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                {...register('senha', { required: 'Senha é obrigatória' })}
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {errors.senha && <span>{errors.senha.message}</span>}
          </div>

          {loginError && (
            <div>
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label>
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>

            <p>Esqueceu a senha?</p>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>Entrando...</>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div>
          <p>
            Não tem uma conta?
            <Link to="/cadastro">Criar conta</Link>
          </p>
        </div>
      </div>

      <div>
        <div>
          <h2>Transforme o bem-estar na sua organização</h2>
          <p>
            Acesse insights valiosos sobre a saúde emocional da sua equipe e
            crie um ambiente de trabalho mais saudável e produtivo.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
