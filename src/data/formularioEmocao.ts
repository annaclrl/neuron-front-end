import type { DicaEmocao, RespostaHumor } from "../types/formularioEmocao";

export const emocaoOptions = [
  { id: 1, nome: "Feliz" },
  { id: 2, nome: "Cansado" },
  { id: 3, nome: "Estressado" },
  { id: 4, nome: "Neutro" },
  { id: 5, nome: "Motivado" },
  { id: 6, nome: "Ansioso" },
];


export const dicasEmocao: DicaEmocao[] = [
  { 
    emocao: "Feliz", 
    dica: "Que ótimo! Aproveite esse momento positivo e compartilhe sua energia com os colegas.", 
    cor: "from-green-400 to-green-600" 
  },
  { 
    emocao: "Cansado", 
    dica: "Lembre-se de fazer pausas regulares e priorizar o descanso. Sua saúde vem em primeiro lugar.", 
    cor: "from-yellow-400 to-yellow-600" 
  },
  { 
    emocao: "Estressado", 
    dica: "Respire fundo. Tente técnicas de respiração ou uma pausa rápida para se recompor.", 
    cor: "from-red-400 to-red-600" 
  },
  { 
    emocao: "Neutro", 
    dica: "Momentos de equilíbrio são importantes. Observe como se sente ao longo do dia.", 
    cor: "from-gray-400 to-gray-600" 
  },
  { 
    emocao: "Motivado", 
    dica: "Excelente! Canalize essa energia para suas tarefas e inspire seus colegas.", 
    cor: "from-blue-400 to-blue-600" 
  },
  { 
    emocao: "Ansioso", 
    dica: "Tente focar no presente. Quebre tarefas grandes em etapas menores e respire.", 
    cor: "from-orange-400 to-orange-600" 
  },
];


export const mockRespostas: RespostaHumor[] = [
  { data: "2025-11-08", emocao: "Feliz", intensidade: 0.9 },
  { data: "2025-11-09", emocao: "Cansado", intensidade: 0.4 },
  { data: "2025-11-10", emocao: "Estressado", intensidade: 0.7 },
  { data: "2025-11-11", emocao: "Neutro", intensidade: 0.5 },
];