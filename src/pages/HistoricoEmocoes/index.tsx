import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; 
import type { RespostaHumor } from "../../types/formularioEmocao";

const corPorEmocao = (emocao: string, darkMode: boolean): string => {
  const baseClasses = "font-semibold";
  switch (emocao) {
    case "Feliz": return darkMode ? "text-green-400 " + baseClasses : "text-green-600 " + baseClasses;
    case "Cansado": return darkMode ? "text-yellow-400 " + baseClasses : "text-yellow-600 " + baseClasses;
    case "Estressado": return darkMode ? "text-red-400 " + baseClasses : "text-red-600 " + baseClasses;
    case "Neutro": return darkMode ? "text-gray-400 " + baseClasses : "text-gray-600 " + baseClasses;
    case "Motivado": return darkMode ? "text-blue-400 " + baseClasses : "text-blue-600 " + baseClasses;
    case "Ansioso": return darkMode ? "text-orange-400 " + baseClasses : "text-orange-600 " + baseClasses;
    default: return darkMode ? "text-purple-400 " + baseClasses : "text-purple-600 " + baseClasses;
  }
};

const HistoricoEmocoes = () => {
  const { darkMode } = useTheme();
  const [respostas, setRespostas] = useState<RespostaHumor[]>([]);
  const usuarioId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch(`https://neuronapi-oou1.onrender.com/registro-emocao/usuario/${usuarioId}`);
        if (!response.ok) throw new Error("Erro ao carregar histórico");

        const data: RespostaHumor[] = await response.json();

        const respostasFormatadas: RespostaHumor[] = data.map((item) => ({
          data: item.data,
          emocao: item.emocao,
          intensidade: item.intensidade ?? 0.5 
        }));

        setRespostas(respostasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setRespostas([]);
      }
    };

    fetchHistorico();
  }, [usuarioId]);

  return (
    <div className={`min-h-screen overflow-y-auto bg-linear-to-br py-6 px-4 sm:py-10 sm:px-6 transition-colors duration-300 ${
      darkMode ? "from-gray-900 to-gray-800 text-white" : "from-(--cinza-claro) to-white text-gray-800"
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className={`text-xl sm:text-3xl font-bold mb-2 wrap-break-words leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>
            Histórico de Emoções
          </h1>
          <p className={`text-xs sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Acompanhe seu histórico emocional e identifique padrões
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg border p-4 sm:p-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}>
          <div className={`overflow-x-auto rounded-lg border transition-colors duration-300 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="min-w-full">
              <table className="w-full min-w-[300px] text-sm">
                <thead className={`border-b transition-colors duration-300 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                  <tr>
                    <th className={`py-3 px-3 text-xs font-semibold uppercase tracking-wider text-left ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Data</th>
                    <th className={`py-3 px-3 text-xs font-semibold uppercase tracking-wider text-left ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Emoção</th>
                    <th className={`py-3 px-3 text-xs font-semibold uppercase tracking-wider text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Intensidade</th>
                  </tr>
                </thead>
                <tbody>
                  {respostas.map((resposta, index) => (
                    <tr key={index} className={`border-b last:border-b-0 transition-colors duration-300 ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"}`}>
                      <td className={`py-3 px-3 text-xs sm:text-sm whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {new Date(resposta.data).toLocaleDateString("pt-BR")}
                      </td>
                      <td className={`py-3 px-3 text-xs sm:text-sm whitespace-nowrap ${corPorEmocao(resposta.emocao, darkMode)}`}>
                        {resposta.emocao}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-16 sm:w-20 rounded-full h-2 overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                            <div className="h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600" style={{ width: `${resposta.intensidade * 100}%` }}/>
                          </div>
                          <span className={`text-xs font-medium min-w-[30px] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {(resposta.intensidade * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {respostas.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className={`text-2xl ${darkMode ? "text-gray-500" : "text-gray-400"}`}>📊</div>
                          <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Nenhum registro encontrado</div>
                          <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Complete seu primeiro formulário</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {respostas.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`rounded-lg p-3 text-center border transition-colors duration-300 ${darkMode ? "bg-blue-900/30 border-blue-800" : "bg-blue-50 border-blue-100"}`}>
                <p className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{respostas.length}</p>
                <p className={`text-xs ${darkMode ? "text-blue-300" : "text-blue-700"}`}>Registros</p>
              </div>
              <div className={`rounded-lg p-3 text-center border transition-colors duration-300 ${darkMode ? "bg-green-900/30 border-green-800" : "bg-green-50 border-green-100"}`}>
                <p className={`text-lg font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  {Math.round((respostas.filter(r => r.intensidade > 0.7).length / respostas.length) * 100)}%
                </p>
                <p className={`text-xs ${darkMode ? "text-green-300" : "text-green-700"}`}>Dias positivos</p>
              </div>
              <div className={`rounded-lg p-3 text-center border transition-colors duration-300 ${darkMode ? "bg-purple-900/30 border-purple-800" : "bg-purple-50 border-purple-100"}`}>
                <p className={`text-sm font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  {respostas[0] ? new Date(respostas[0].data).toLocaleDateString('pt-BR') : '-'}
                </p>
                <p className={`text-xs ${darkMode ? "text-purple-300" : "text-purple-700"}`}>Último registro</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} sm:hidden`}>Role para ver toda a tabela</p>
        </div>
      </div>
    </div>
  );
};

export default HistoricoEmocoes;
