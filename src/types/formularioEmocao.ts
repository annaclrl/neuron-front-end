export type FormInputs = {
  idEmocao: number;
  intensidade: number;
  descricao: string;
  motivacao: number;
  felicidade: number;
  estresse: number;
  saudeMental: number;
  problemas: number;
  modoVer: number;
  observacaoGeral: string;
  dataRegistro?: string;
};

export type DicaEmocao = {
  emocao: string;
  dica: string;
  cor: string;
};

export type RespostaHumor = {
  data: string;
  emocao: string;
  intensidade: number;
};