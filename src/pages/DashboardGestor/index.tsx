import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import GraficoEvolucaoEmocional from "../../components/GraficoEvolucaoEmocional";


interface Emocao {
  nome: string;
  quantidade: number;
  cor: string;
}

interface Alerta {
  nome: string;
  emocao: string;
  intensidade: "Alta" | "Média" | "Baixa";
  tempo: string;
}

// Dados de exemplo
const mockEmocoes: Emocao[] = [
  { nome: "Feliz", quantidade: 42, cor: "#10B981" },
  { nome: "Cansado", quantidade: 28, cor: "#F59E0B" },
  { nome: "Estressado", quantidade: 18, cor: "#EF4444" },
  { nome: "Motivado", quantidade: 35, cor: "#3B82F6" },
  { nome: "Neutro", quantidade: 22, cor: "#6B7280" },
];

const mockAlertas: Alerta[] = [
  { nome: "João Silva", emocao: "Estressado", intensidade: "Alta", tempo: "2 dias" },
  { nome: "Maria Santos", emocao: "Cansado", intensidade: "Média", tempo: "3 dias" },
  { nome: "Pedro Costa", emocao: "Estressado", intensidade: "Alta", tempo: "1 dia" },
];

const DashboardGestor = () => {
  const { darkMode } = useTheme();
  const [emocoes] = useState<Emocao[]>(mockEmocoes);
  const [alertas] = useState<Alerta[]>(mockAlertas);
  const [periodo, setPeriodo] = useState("30dias");

  const totalRegistros = emocoes.reduce((acc, e) => acc + e.quantidade, 0);
  const emocaoMaisComum = emocoes.reduce((prev, curr) =>
    prev.quantidade > curr.quantidade ? prev : curr
  );

  const pieData = emocoes.map(e => ({
    name: e.nome,
    value: e.quantidade,
    cor: e.cor
  }));

  const getIntensidadeCor = (intensidade: string) => {
    switch (intensidade) {
      case "Alta": return "#EF4444";
      case "Média": return "#F59E0B";
      case "Baixa": return "#10B981";
      default: return "#6B7280";
    }
  };

  return (
    <div>
      <div>
        <h1>Dashboard da equipe</h1>
        <p>Acompanhe o bem-estar emocional da sua equipe em tempo real</p>

        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="7dias">Últimos 7 dias</option>
          <option value="30dias">Últimos 30 dias</option>
          <option value="90dias">Últimos 90 dias</option>
        </select>
      </div>

      <div>
        <div>
          <h3>Colaboradores</h3>
          <p>24</p>
          <span>+12% vs último mês</span>
        </div>

        <div>
          <h3>Registros</h3>
          <p>{totalRegistros}</p>
          <span>+8% engajamento</span>
        </div>

        <div>
          <h3>Alertas</h3>
          <p>{alertas.length}</p>
          <span>Precisa de atenção</span>
        </div>

        <div>
          <h3>Humor Predominante</h3>
          <p>{emocaoMaisComum.nome}</p>
          <span>{Math.round((emocaoMaisComum.quantidade / totalRegistros) * 100)}% dos registros</span>
        </div>
      </div>

      <div>
        <GraficoEvolucaoEmocional data={emocoes} darkMode={darkMode} />

        <div>
          <h3>Distribuição de Emoções</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.cor} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3>Colaboradores que Precisam de Atenção</h3>
          <span>{alertas.length}</span>
          {alertas.map((alerta, index) => (
            <div key={index}>
              <div>
                <span>{alerta.nome}</span>
                <span>{alerta.emocao}</span>
              </div>
              <div>
                <span style={{ color: getIntensidadeCor(alerta.intensidade) }}>{alerta.intensidade}</span>
                <span>{alerta.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div>
        <h3>Detalhamento por Emoção</h3>
        {emocoes.map((emocao, index) => (
          <div key={index}>
            <span>{emocao.nome}</span>
            <div style={{ width: `${(emocao.quantidade / totalRegistros) * 100}%`, backgroundColor: emocao.cor, height: 10 }} />
            <span>{emocao.quantidade}</span>
            <span>{Math.round((emocao.quantidade / totalRegistros) * 100)}%</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardGestor;
