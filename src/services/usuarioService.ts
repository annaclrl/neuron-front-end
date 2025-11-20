import type { AtualizarUsuarioDto, CadastroForm } from "../types/usuario";

const mapTipoUsuario = {
  RH_CLEVEL: 1,
  FUNCIONARIO: 2,
  GESTOR: 3,
} as const;


export async function cadastrarUsuario(data: CadastroForm): Promise<void> {

  const dto = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    codigoAcesso: mapTipoUsuario[data.tipoUsuario],
    codigoDepartamento: Number(data.departamento),
    status: "A",
  };

  let response: Response;

  console.log("DTO enviado:", dto);
  try {
    response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  if (!response.ok) {
    let mensagem = "";

    try {
      const body = await response.json();
      mensagem = (body?.message || "").toLowerCase();
    } catch {
      mensagem = (await response.text()).toLowerCase();
    }

    if (
      mensagem.includes("ora-00001") ||
      mensagem.includes("uk_nron_em_usuario") ||
      mensagem.includes("email")
    ) {
      throw new Error("EMAIL_DUPLICADO");
    }

    throw new Error("ERRO_CADASTRO");
  }
}


export async function buscarUsuarioPorId(id: number) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao obter os dados do usuario.');
  }

  return await response.json();
};

export async function atualizarUsuario(id: number, data: AtualizarUsuarioDto) {
  const token = localStorage.getItem("token");

  const agora = new Date().toISOString().slice(0, -1);

  const body = { 
    ...data,        
    dataAtualizacao: agora,
    dataCadastro: data.dataCadastro 
  };

  const resp = await fetch(`http://localhost:8080/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw new Error("Erro ao atualizar o usuário");
  }

  return;
}

export async function deletarUsuario(id: number) {
  const token = localStorage.getItem("token");

  const resp = await fetch(`http://localhost:8080/usuarios/id/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!resp.ok) {
    throw new Error("Erro ao desativar o usuário");
  }
}


