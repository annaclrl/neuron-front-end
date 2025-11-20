import type { FormInputs } from "../types/formularioEmocao";

const API_REGISTRO = "http://localhost:8080/registro-emocao";
const API_RESPOSTA = "http://localhost:8080/resposta-formulario";

export function formatarDataISO(data?: string): string {
  return data
    ? new Date(data).toISOString().slice(0, -1)
    : new Date().toISOString().slice(0, -1);
}

export async function criarRegistroEmocao(data: FormInputs, idUsuario: number) {
  const agora = formatarDataISO(data.dataRegistro);

  const payload = {
    intRegistEmocao: data.intensidade,
    dsRegistEmocao: data.descricao,
    dtRegistEmocao: agora,
    idEmocao: parseInt(data.idEmocao.toString()),
    idUsuario: Number(idUsuario),
  };

  console.log("Payload enviado para registro-emocao → ", payload);

  const resposta = await fetch(API_REGISTRO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resposta.ok) {
    const msg = await resposta.text();
    console.error("Erro backend registro-emocao →", msg);
    throw new Error("Erro ao criar registro de emoção");
  }

  return await resposta.json();
}

export async function criarRespostaFormulario(
  data: FormInputs,
  idUsuario: number,
  idRegistEmocao: number
) {
  const agora = formatarDataISO(data.dataRegistro);

  const payload = {
    dtResposta: agora,
    motivacao: data.motivacao,
    felicidade: data.felicidade,
    estresse: data.estresse,
    observacao: data.observacaoGeral,
    saudeMental: data.saudeMental,
    problemas: data.problemas,
    modoVer: data.modoVer,
    dtAnalise: agora,
    idUsuario: Number(idUsuario),
    idRegistEmocao,
  };

  console.log("Payload enviado para resposta-formulario →", payload);

  const resposta = await fetch(API_RESPOSTA, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!resposta.ok) {
    const msg = await resposta.text();
    console.error("Erro backend resposta-formulario →", msg);
    throw new Error("Erro ao criar resposta do formulário");
  }

  return await resposta.json();
}

export async function salvarFormulario(data: FormInputs, idUsuario: number) {

  const registro = await criarRegistroEmocao(data, idUsuario);
  const idRegistEmocao = registro?.idRegistEmocao || registro?.id || registro;

  if (!idRegistEmocao) {
    throw new Error("ID do registro de emoção não retornado pelo backend");
  }

  return await criarRespostaFormulario(data, idUsuario, idRegistEmocao);
}

