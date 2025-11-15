import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
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

    const tooltipBg = darkMode ? '#1f2937' : '#ffffff';
    const tooltipText = darkMode ? '#f9fafb' : '#1f2937';

    return (
        <div className={`min-h-screen p-6 space-y-6 transition-colors duration-300 ${darkMode
            ? "bg-linear-to-br from-gray-900 to-gray-800"
            : "bg-linear-to-br from-gray-50 to-gray-100"
            }`}>
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                            }`}>
                            Dashboard da equipe
                        </h1>
                        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-(--cinza-escuro) opacity-70"
                            }`}>
                            Acompanhe o bem-estar emocional da sua equipe em tempo real
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            className={`px-4 py-2 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-colors duration-300 ${darkMode
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-white border-gray-300 text-gray-700"
                                }`}
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                        >
                            <option value="7dias">Últimos 7 dias</option>
                            <option value="30dias">Últimos 30 dias</option>
                            <option value="90dias">Últimos 90 dias</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl text-center flex items-center justify-center min-h-[140px] ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                    }`}>
                    <div className="w-full">
                        <h3 className={`text-sm font-medium uppercase tracking-wide mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            Colaboradores
                        </h3>
                        <p className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                            }`}>
                            24
                        </p>
                        <span className="text-xs font-medium text-green-500">+12% vs último mês</span>
                    </div>
                </div>

                <div className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl text-center flex items-center justify-center min-h-[140px] ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                    }`}>
                    <div className="w-full">
                        <h3 className={`text-sm font-medium uppercase tracking-wide mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            Registros
                        </h3>
                        <p className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                            }`}>
                            {totalRegistros}
                        </p>
                        <span className="text-xs font-medium text-green-500">+8% engajamento</span>
                    </div>
                </div>

                <div className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl text-center flex items-center justify-center min-h-[140px] ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                    }`}>
                    <div className="w-full">
                        <h3 className={`text-sm font-medium uppercase tracking-wide mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            Alertas
                        </h3>
                        <p className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                            }`}>
                            {alertas.length}
                        </p>
                        <span className="text-xs font-medium text-red-500">Precisa de atenção</span>
                    </div>
                </div>

                <div className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl text-center flex items-center justify-center min-h-[140px] ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-100"
                    }`}>
                    <div className="w-full">
                        <h3 className={`text-sm font-medium uppercase tracking-wide mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            Humor Predominante
                        </h3>
                        <p className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                            }`}>
                            {emocaoMaisComum.nome}
                        </p>
                        <span className={`text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-500"
                            }`}>
                            {Math.round((emocaoMaisComum.quantidade / totalRegistros) * 100)}% dos registros
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <GraficoEvolucaoEmocional darkMode={darkMode} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8 min-h-[400px]">

                <div className="space-y-6 xl:col-span-3 flex flex-col">
                    <div className={`rounded-2xl p-6 shadow-lg border flex flex-col transition-colors duration-300 ${darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                        }`}>
                        <div className="mb-4 text-center">
                            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                                }`}>
                                Distribuição de Emoções
                            </h3>
                        </div>
                        <div className="flex-1 min-h-[200px]">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={entry.cor} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: tooltipBg,
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: tooltipText,
                                            fontSize: '11px',
                                            padding: '8px 12px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={`rounded-2xl p-6 shadow-lg border flex flex-col flex-1 transition-colors duration-300 ${darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-100"
                        }`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                                }`}>
                                Colaboradores que Precisam de Atenção
                            </h3>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${darkMode
                                ? "bg-red-900/50 text-red-300"
                                : "bg-red-100 text-red-600"
                                }`}>
                                {alertas.length}
                            </span>
                        </div>
                        <div className="space-y-3 flex-1">
                            {alertas.map((alerta, index) => (
                                <div key={index} className={`flex justify-between items-center p-3 rounded-lg border transition-colors duration-200 ${darkMode
                                    ? "border-gray-600 hover:border-red-800 hover:bg-red-900/30"
                                    : "border-gray-200 hover:border-red-200 hover:bg-red-50"
                                    }`}>
                                    <div className="space-y-1">
                                        <span className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"
                                            }`}>
                                            {alerta.nome}
                                        </span>
                                        <span className={`block text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                                            }`}>
                                            {alerta.emocao}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end space-y-1">
                                        <span
                                            className="text-xs font-semibold"
                                            style={{ color: getIntensidadeCor(alerta.intensidade) }}
                                        >
                                            {alerta.intensidade}
                                        </span>
                                        <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"
                                            }`}>
                                            {alerta.tempo}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-lg border transition-colors duration-300 ${darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
                }`}>
                <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-(--cinza-escuro)"
                        }`}>
                        Detalhamento por Emoção
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {emocoes.map((emocao, index) => (
                        <div key={index} className={`p-4 rounded-lg border text-center space-y-3 transition-colors duration-300 ${darkMode
                            ? "border-gray-600 bg-gray-700/50"
                            : "border-gray-200 bg-white"
                            }`}>
                            <div className="flex flex-col items-center space-y-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: emocao.cor }}
                                ></div>
                                <span className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                    }`}>
                                    {emocao.nome}
                                </span>
                            </div>
                            <div className={`w-full rounded-full h-2 ${darkMode ? "bg-gray-600" : "bg-gray-200"
                                }`}>
                                <div
                                    className="h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${(emocao.quantidade / totalRegistros) * 100}%`,
                                        backgroundColor: emocao.cor,
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"
                                    }`}>
                                    {emocao.quantidade}
                                </span>
                                <span className={`${darkMode ? "text-gray-500" : "text-gray-500"
                                    }`}>
                                    {Math.round((emocao.quantidade / totalRegistros) * 100)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardGestor;