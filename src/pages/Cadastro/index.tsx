import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { CadastroForm } from '../../types/usuario';


const Cadastro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CadastroForm>();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: CadastroForm) => {
    setIsLoading(true);

    const mapAcesso: Record<string, number> = {
      FUNCIONARIO: 1,
      GESTOR: 2,
      RH: 3,
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const novoUsuario = {
      id: Date.now(),
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipo: data.tipoUsuario,
      idAcesso: mapAcesso[data.tipoUsuario],
      idDepartamento: Number(data.departamento),
      status: data.status,
      dataCadastro: new Date().toISOString(),
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    setIsLoading(false);

    navigate('/login', {
      state: {
        message: 'Cadastro realizado com sucesso! Faça login para continuar.'
      }
    });
  };

  const password = watch('senha');


  return (
    <main className="min-h-screen flex" style={{ fontFamily: 'var(--fonte-principal)' }}>
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="text-center mb-8">
          <div className="mb-6">
            <span className="text-2xl font-bold" style={{ color: 'var(--roxo-escuro)' }}>Neuron</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--cinza-escuro)' }}>Criar sua conta</h1>
          <p className="text-gray-600 text-lg">
            Junte-se à nossa plataforma e comece a transformar o bem-estar no ambiente corporativo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${
                errors.nome ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder="Digite seu nome completo"
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 2,
                  message: 'Nome deve ter pelo menos 2 caracteres'
                }
              })}
            />
            {errors.nome && (
              <span className="text-red-600 text-sm font-medium block mt-1">{errors.nome.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${
                errors.email ? 'border-red-500 focus:ring-red-500' : ''
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
            {errors.email && (
              <span className="text-red-600 text-sm font-medium block mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${
                  errors.senha ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Crie uma senha segura"
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Senha deve conter letras maiúsculas, minúsculas e números'
                  }
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-(--roxo-vibrante) font-medium hover:text-(--roxo-escuro) transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.senha && (
              <span className="text-red-600 text-sm font-medium block mt-1">{errors.senha.message}</span>
            )}
            {password && !errors.senha && (
              <div className="flex items-center gap-3 mt-2">
                <div className={`h-1 flex-1 rounded-full bg-gray-200 transition-all duration-300 ${
                  password.length >= 6 ? 'bg-green-500 w-full' : 'bg-red-500 w-1/4'
                }`}></div>
                <span className="text-xs text-gray-500 font-medium">
                  {password.length >= 6 ? 'Senha forte' : 'Senha fraca'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de usuário
            </label>
            <select
              id="tipoUsuario"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${
                errors.tipoUsuario ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              {...register('tipoUsuario', {
                required: 'Selecione um tipo de usuário'
              })}
            >
              <option value="">Selecione o tipo de usuário</option>
              <option value="RH">RH </option>
              <option value="GESTOR">Gestor</option>
              <option value="FUNCIONARIO">Funcionário</option>
            </select>
            {errors.tipoUsuario && (
              <span className="text-red-600 text-sm font-medium block mt-1">{errors.tipoUsuario.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-2">
              Departamento
            </label>
            <select
              id="departamento"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 bg-white ${
                errors.departamento ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              {...register('departamento', {
                required: 'Selecione um departamento'
              })}
            >
              <option value="">Selecione o departamento</option>
              <option value="1">Recursos Humanos</option>
              <option value="2">Tecnologia</option>
              <option value="3">Financeiro</option>
              <option value="4">Marketing</option>
              <option value="5">Operações</option>
            </select>
            {errors.departamento && (
              <span className="text-red-600 text-sm font-medium block mt-1">{errors.departamento.message}</span>
            )}
          </div>

          <input type="hidden" value="A" {...register('status')} />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Ao criar uma conta, você concorda com nossos{' '}
              <span className="text-(--roxo-vibrante) hover:text-(--roxo-escuro) font-medium transition-colors duration-200 cursor-pointer">
                Termos de Serviço e Política de Privacidade
              </span>
            </p>
          </div>

          <button
            type="submit"
            className={`w-full bg-(--roxo-vibrante) text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#8B5FFF] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
              isLoading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Cadastrando...
              </>
            ) : (
              'Criar conta'
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link to={'/login'} className="text-(--roxo-vibrante) font-semibold hover:text-(--roxo-escuro) transition-colors duration-200 ml-1">
              Fazer login
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-linear-to-br from-(--roxo-escuro) to-(--azul-acinzentado) text-white p-12 flex-col justify-center">
        <div className="max-w-lg mx-auto space-y-7">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Bem-vindo ao <span style={{ color: 'var(--roxo-vibrante)' }}>Neuron</span>
          </h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            Faça parte da revolução no cuidado com a saúde emocional no ambiente corporativo.
            Junte-se a milhares de profissionais que já transformaram suas organizações.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-(--roxo-vibrante) rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">✓</div>
              <span>Monitoramento emocional proativo</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-(--roxo-vibrante) rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">✓</div>
              <span>Ambientes de trabalho mais saudáveis</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-(--roxo-vibrante) rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">✓</div>
              <span>Relatórios e insights detalhados</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro;