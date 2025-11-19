import type { CadastroForm } from "../types/usuario";

const mapTipoUsuario = {
  RH_CLEVEL: 1,
  GESTOR: 2,
  FUNCIONARIO: 3,
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
