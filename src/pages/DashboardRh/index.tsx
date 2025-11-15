import GraficoEmocoesMaisComuns from '../../components/GraficoEmocaoesMaisComuns';
import GraficoEvolucaoEmocional from '../../components/GraficoEvolucaoEmocional';
import CardIndiceEmpresa from '../../components/CardIndiceEmpresa';

const DashboardRH = () => {
  return (
    <div>
      <h1>Dashboard RH</h1>

      <div>
        <CardIndiceEmpresa
          titulo="Média de bem-estar semanal"
          valor="7.8"
          descricao="Última atualização há 2 dias"
        />
        <CardIndiceEmpresa
          titulo="Colaboradores em risco de burnout"
          valor="5%"
          descricao="Atenção necessária"
        />
        <CardIndiceEmpresa
          titulo="Índice médio da empresa"
          valor="8.2"
          descricao="Tendência positiva"
        />
      </div>

      <div>
        <GraficoEvolucaoEmocional />
        <GraficoEmocoesMaisComuns />
      </div>

      <div>
        <h2>Ranking de Bem-Estar por Setor</h2>
        <div>
          <div>
            <span>Tecnologia</span>
            <strong>8.5</strong>
            <span>Alto</span>
          </div>
          <div>
            <span>Financeiro</span>
            <strong>7.8</strong>
            <span>Médio</span>
          </div>
          <div>
            <span>Atendimento</span>
            <strong>6.9</strong>
            <span>Médio</span>
          </div>
          <div>
            <span>Logística</span>
            <strong>6.5</strong>
            <span>Baixo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRH;
