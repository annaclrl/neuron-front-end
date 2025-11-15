import { useTheme } from "../../context/ThemeContext";
import GraficoEmocoesMaisComuns from '../../components/GraficoEmocoesMaisComuns';
import GraficoEvolucaoEmocional from '../../components/GraficoEvolucaoEmocional';
import CardIndiceEmpresa from '../../components/CardIndiceEmpresa';

const DashboardRH = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen p-4 sm:p-6 space-y-6 sm:space-y-8 transition-colors duration-300 ${
      darkMode 
        ? "bg-linear-to-br from-gray-900 to-gray-800" 
        : "bg-linear-to-br from-gray-50 to-gray-100"
    }`}>
      <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        Dashboard RH
      </h1>

      <div className="flex flex-wrap gap-4 sm:gap-6">
        <CardIndiceEmpresa
          titulo="Média de bem-estar semanal"
          valor="7.8"
          descricao="Última atualização há 2 dias"
          darkMode={darkMode}
        />
        <CardIndiceEmpresa
          titulo="Colaboradores em risco de burnout"
          valor="5%"
          descricao="Atenção necessária"
          darkMode={darkMode}
        />
        <CardIndiceEmpresa
          titulo="Índice médio da empresa"
          valor="8.2"
          descricao="Tendência positiva"
          darkMode={darkMode}
        />
      </div>

      <div className="space-y-6 sm:space-y-8">
        <GraficoEvolucaoEmocional darkMode={darkMode} />
        <GraficoEmocoesMaisComuns darkMode={darkMode} />
      </div>

      <div className="w-full">
        <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5 ${
          darkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-100"
        }`}>
          <h2 className={`text-base sm:text-lg font-semibold mb-4 text-center ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Ranking de Bem-Estar por Setor
          </h2>
          <div className="space-y-3">
            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:translate-x-1 ${
              darkMode 
                ? "border-green-800 bg-green-900/30 hover:border-green-700 hover:bg-green-900/50" 
                : "border-green-200 bg-green-50 hover:border-green-300 hover:bg-green-100"
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Tecnologia
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <strong className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  8.5
                </strong>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  darkMode 
                    ? "bg-green-900/50 text-green-300" 
                    : "bg-green-100 text-green-800"
                }`}>
                  Alto
                </span>
              </div>
            </div>
            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:translate-x-1 ${
              darkMode 
                ? "border-blue-800 bg-blue-900/30 hover:border-blue-700 hover:bg-blue-900/50" 
                : "border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100"
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Financeiro
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <strong className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  7.8
                </strong>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  darkMode 
                    ? "bg-yellow-900/50 text-yellow-300" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  Médio
                </span>
              </div>
            </div>

            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:translate-x-1 ${
              darkMode 
                ? "border-yellow-800 bg-yellow-900/30 hover:border-yellow-700 hover:bg-yellow-900/50" 
                : "border-yellow-200 bg-yellow-50 hover:border-yellow-300 hover:bg-yellow-100"
            }`} >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Atendimento
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <strong className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  6.9
                </strong>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  darkMode 
                    ? "bg-yellow-900/50 text-yellow-300" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  Médio
                </span>
              </div>
            </div>

            <div className={`flex justify-between items-center p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:translate-x-1 ${
              darkMode 
                ? "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-700" 
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}>
                  Logística
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <strong className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                  6.5
                </strong>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  darkMode 
                    ? "bg-red-900/50 text-red-300" 
                    : "bg-red-100 text-red-800"
                }`}>
                  Baixo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRH;