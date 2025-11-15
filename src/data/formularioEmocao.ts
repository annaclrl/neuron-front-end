import type { DicaEmocao } from "../types/formularioEmocao";

export const emocaoOptions = [
  { id: 1, nome: "Feliz" },
  { id: 2, nome: "Cansado" },
  { id: 3, nome: "Estressado" },
  { id: 4, nome: "Neutro" },
  { id: 5, nome: "Motivado" },
  { id: 6, nome: "Ansioso" },
];


export const dicasEmocao: DicaEmocao[] = [
    { emocao: "Feliz", dica: "Que ótimo! Aproveite esse momento positivo e compartilhe sua energia com os colegas.", cor: "" },
    { emocao: "Cansado", dica: "Lembre-se de fazer pausas regulares e priorizar o descanso. Sua saúde vem em primeiro lugar.", cor: "" },
    { emocao: "Estressado", dica: "Respire fundo. Tente técnicas de respiração ou uma pausa rápida para se recompor.", cor: "" },
    { emocao: "Neutro", dica: "Momentos de equilíbrio são importantes. Observe como se sente ao longo do dia.", cor: "" },
    { emocao: "Motivado", dica: "Excelente! Canalize essa energia para suas tarefas e inspire seus colegas.", cor: "" },
    { emocao: "Ansioso", dica: "Tente focar no presente. Quebre tarefas grandes em etapas menores e respire.", cor: "" },
  ];