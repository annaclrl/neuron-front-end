import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import type {Usuario} from '../../types/usuario'

const DadosConta = () => {
  const { darkMode } = useTheme();
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [showFormEdicao, setShowFormEdicao] = useState(false);
  const [showDesativarModal, setShowDesativarModal] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Usuario>();

  useEffect(() => {
    try {
      const userJSON = localStorage.getItem("mindtrack_usuario_logado");

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
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setUsuarioLogado(null);
    }
  }, [reset]);

  const onSubmit: SubmitHandler<Usuario> = (data) => {
    if (!usuarioLogado) return;

    const atualizado: Usuario = {
      ...usuarioLogado,
      nome: data.nome,
      email: data.email
    };

    localStorage.setItem("mindtrack_usuario_logado", JSON.stringify(atualizado));
    setUsuarioLogado(atualizado);
    setShowFormEdicao(false);
    alert("Dados atualizados");
  };

  const handleCancelarEdicao = () => {
    if (usuarioLogado) reset(usuarioLogado);
    setShowFormEdicao(false);
  };

  const handleDesativarConta = () => {
    alert("Conta desativada");
    setShowDesativarModal(false);
  };

  const getTipoUsuarioLabel = (tipo: string) => {
    switch (tipo) {
      case "RH": return "Recursos Humanos";
      case "GESTOR": return "Gestor";
      case "FUNCIONARIO": return "Funcionário";
      default: return tipo;
    }
  };

  if (!usuarioLogado) {
    return (
      <div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Dados da Conta</h1>
        <p>Gerencie suas informações pessoais</p>
      </div>

      <div>
        <h2>{usuarioLogado.nome}</h2>
        <p>{usuarioLogado.email}</p>
        <span>{getTipoUsuarioLabel(usuarioLogado.tipo)}</span>
      </div>

      <div>
        <p>Nome completo</p>
        <p>{usuarioLogado.nome}</p>

        <p>Email</p>
        <p>{usuarioLogado.email}</p>

        <p>Tipo de usuário</p>
        <p>{getTipoUsuarioLabel(usuarioLogado.tipo)}</p>
      </div>

      <div>
        <button onClick={() => setShowFormEdicao(!showFormEdicao)}>
          {showFormEdicao ? "Cancelar" : "Atualizar Dados"}
        </button>

        <button onClick={() => setShowDesativarModal(true)}>
          Desativar Conta
        </button>
      </div>

      {showFormEdicao && (
        <div>
          <h3>Atualizar Dados</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Nome completo</p>
              <input
                type="text"
                {...register("nome", { required: true, minLength: 2 })}
              />
              {errors.nome && <p>Nome inválido</p>}
            </div>

            <div>
              <p>Email</p>
              <input type="email" value={usuarioLogado.email} disabled />
            </div>

            <div>
              <p>Tipo de usuário</p>
              <input
                type="text"
                value={getTipoUsuarioLabel(usuarioLogado.tipo)}
                disabled
              />
            </div>

            <div>
              <button type="submit">Salvar</button>
              <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {showDesativarModal && (
        <div>
          <div>
            <h3>Desativar Conta</h3>
            <p>Tem certeza que deseja desativar sua conta?</p>

            <button onClick={handleDesativarConta}>Sim</button>
            <button onClick={() => setShowDesativarModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DadosConta;
