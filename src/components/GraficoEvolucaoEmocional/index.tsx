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
    <div>
      <h2>Evolução Emocional Geral</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradienteBemEstar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="semana" tick={{ fill: textColor, fontSize: 10 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
          <YAxis tick={{ fill: textColor, fontSize: 10 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} domain={[0, 10]} />
          <Tooltip
            cursor={{ stroke: '#7C3AED', strokeWidth: 1 }}
            contentStyle={{ backgroundColor: tooltipBg, border: 'none', color: tooltipText, fontSize: '11px', padding: '8px 12px' }}
            formatter={(value) => [`${value}`, 'Bem-estar']}
          />
          <Area type="monotone" dataKey="bemEstar" stroke="#7C3AED" strokeWidth={2} fill="url(#gradienteBemEstar)" activeDot={{ r: 4, fill: '#7C3AED' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoEvolucaoEmocional;
