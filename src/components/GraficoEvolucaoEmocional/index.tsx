import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { semana: 'Semana 1', bemEstar: 7.5 },
  { semana: 'Semana 2', bemEstar: 6.8 },
  { semana: 'Semana 3', bemEstar: 8.1 },
  { semana: 'Semana 4', bemEstar: 7.9 },
];

interface GraficoEvolucaoEmocionalProps {
  darkMode?: boolean;
}

const GraficoEvolucaoEmocional = ({ darkMode = false }: GraficoEvolucaoEmocionalProps) => {
  const textColor = darkMode ? '#d1d5db' : '#6b7280';
  const gridColor = darkMode ? '#374151' : '#e5e7eb';
  const tooltipBg = darkMode ? '#1f2937' : '#ffffff';
  const tooltipText = darkMode ? '#f9fafb' : '#1f2937';

  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5 ${
      darkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-100"
    }`}>
      <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        Evolução Emocional Geral
      </h2>
      <div className="w-full">
        <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] md:h-[300px]">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradienteBemEstar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor}
              vertical={false}
            />
            <XAxis 
              dataKey="semana" 
              tick={{ fill: textColor, fontSize: 10 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
              className="text-xs sm:text-sm"
            />
            <YAxis 
              tick={{ fill: textColor, fontSize: 10 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
              domain={[0, 10]}
              className="text-xs sm:text-sm"
            />
            <Tooltip 
              cursor={{ stroke: '#7C3AED', strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: 'none',
                borderRadius: '6px',
                color: tooltipText,
                fontSize: '11px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              formatter={(value) => [`${value}`, 'Bem-estar']}
            />
            <Area 
              type="monotone" 
              dataKey="bemEstar" 
              stroke="#7C3AED" 
              strokeWidth={2}
              fill="url(#gradienteBemEstar)" 
              activeDot={{ r: 4, fill: '#7C3AED' }}
              className="sm:[&_.recharts-area-area]:hover:opacity-90"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoEvolucaoEmocional;