import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormInputs } from '../../types/usuario';

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormInputs) => {
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
    <main>
      <div>
        <div>
          <div>
            <span>Neuron</span>
          </div>

          <h1>Criar sua conta</h1>

          <p>
            Junte-se à nossa plataforma e comece a transformar o bem-estar no ambiente corporativo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              {...register('nome', {
                required: 'Nome é obrigatório',
                minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' },
              })}
            />
            {errors.nome && <span>{errors.nome.message}</span>}
          </div>

          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email', {
                required: 'E-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido',
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="senha">Senha</label>
            <div>
              <input
                id="senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crie uma senha segura"
                {...register('senha', {
                  required: 'Senha é obrigatória',
                  minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Senha deve conter letras maiúsculas, minúsculas e números',
                  },
                })}
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {errors.senha && <span>{errors.senha.message}</span>}

            {password && !errors.senha && (
              <div>
                <div></div>
                <span>{password.length >= 6 ? 'Senha forte' : 'Senha fraca'}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="tipoUsuario">Tipo de usuário</label>
            <select
              id="tipoUsuario"
              {...register('tipoUsuario', { required: 'Selecione um tipo de usuário' })}
            >
              <option value="">Selecione o tipo de usuário</option>
              <option value="RH">RH</option>
              <option value="GESTOR">Gestor</option>
              <option value="FUNCIONARIO">Funcionário</option>
            </select>

            {errors.tipoUsuario && <span>{errors.tipoUsuario.message}</span>}
          </div>

          <div>
            <label htmlFor="departamento">Departamento</label>
            <select
              id="departamento"
              {...register('departamento', { required: 'Selecione um departamento' })}
            >
              <option value="">Selecione o departamento</option>
              <option value="1">Recursos Humanos</option>
              <option value="2">Tecnologia</option>
              <option value="3">Financeiro</option>
              <option value="4">Marketing</option>
              <option value="5">Operações</option>
            </select>

            {errors.departamento && <span>{errors.departamento.message}</span>}
          </div>

          <input type="hidden" value="A" {...register('status')} />

          <div>
            <p>
              Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade
            </p>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <div>
          <p>
            Já tem uma conta? <Link to={'/login'}>Fazer login</Link>
          </p>
        </div>
      </div>

      <div>
        <div>
          <h2>
            Bem-vindo ao Neuron
          </h2>

          <p>
            Faça parte da revolução no cuidado com a saúde emocional no ambiente corporativo.
          </p>

          <div>
            <div>
              <span>✓</span>
              <span>Monitoramento emocional proativo</span>
            </div>

            <div>
              <span>✓</span>
              <span>Ambientes de trabalho mais saudáveis</span>
            </div>

            <div>
              <span>✓</span>
              <span>Relatórios e insights detalhados</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cadastro;
