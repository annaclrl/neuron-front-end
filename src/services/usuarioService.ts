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
    response = await fetch("https://neuronapi-oou1.onrender.com/", {
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

export async function buscarUsuarios() {
  const response = await fetch("https://neuronapi-oou1.onrender.com/usuarios", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error('Erro ao obter os usuários');
  }

  return await response.json();
}

export async function buscarUsuarioPorId(id: number) {
  const response = await fetch(`https://neuronapi-oou1.onrender.com/usuarios/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao obter os dados do usuario.');
  }

  return await response.json();
};

export async function atualizarUsuario(id: number, data: AtualizarUsuarioDto) {

  const agora = new Date().toISOString().slice(0, -1);

  const body = { 
    ...data,        
    dataAtualizacao: agora,
    dataCadastro: data.dataCadastro 
  };

  const resp = await fetch(`https://neuronapi-oou1.onrender.com/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw new Error("Erro ao atualizar o usuário");
  }

  return;
}

export async function deletarUsuario(id: number) {

  const resp = await fetch(`https://neuronapi-oou1.onrender.com/usuarios/id/${id}`, {
    method: "DELETE"
  });

  if (!resp.ok) {
    throw new Error("Erro ao desativar o usuário");
  }
}


