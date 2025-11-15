import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { emocao: 'Feliz', quantidade: 120 },
  { emocao: 'Estressado', quantidade: 80 },
  { emocao: 'Cansado', quantidade: 95 },
  { emocao: 'Neutro', quantidade: 60 },
  { emocao: 'Motivado', quantidade: 110 },
];

interface GraficoEmocoesMaisComunsProps {
  darkMode?: boolean;
}

const GraficoEmocoesMaisComuns = ({ darkMode = false }: GraficoEmocoesMaisComunsProps) => {
  const textColor = darkMode ? '#d1d5db' : '#6b7280';
  const gridColor = darkMode ? '#374151' : '#e5e7eb';
  const tooltipBg = darkMode ? '#1f2937' : '#ffffff';
  const tooltipText = darkMode ? '#f9fafb' : '#1f2937';

  return (
    <div>
      <h2>Emoções Mais Comuns</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="emocao" tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg, border: 'none', color: tooltipText }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: darkMode ? '#9ca3af' : '#6b7280', fontWeight: '600' }}
          />
          <Legend wrapperStyle={{ color: textColor, fontSize: '12px' }} />
          <Bar dataKey="quantidade" fill="#7C3AED" barSize={30} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoEmocoesMaisComuns;
