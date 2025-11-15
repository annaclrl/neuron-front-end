import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; 




const corPorEmocao = (emocao: string): string => {
  return "";
};

const HistoricoEmocoes = () => {
  const { darkMode } = useTheme();
  const [respostas, setRespostas] = useState<RespostaHumor[]>([]);

  useEffect(() => {
    const historicoSalvo = localStorage.getItem('mindtrack_historico');
    if (historicoSalvo) {
      try {
        const historico = JSON.parse(historicoSalvo);
        const respostasFormatadas = historico.map((item: any) => ({
          data: item.data,
          emocao: item.emocao || item.registroEmocao?.DS_REGIST_EMOCAO || "Desconhecida",
          intensidade: item.intensidade || item.registroEmocao?.INT_REGIST_EMOCAO / 10 || 0.5
        }));
        setRespostas(respostasFormatadas);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        setRespostas(mockRespostas);
      }
    } else {
      setRespostas(mockRespostas);
    }
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>Histórico de Emoções</h1>
          <p>Acompanhe seu histórico emocional e identifique padrões</p>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Emoção</th>
                <th>Intensidade</th>
              </tr>
            </thead>

            <tbody>
              {respostas.map((resposta, index) => (
                <tr key={index}>
                  <td>{new Date(resposta.data).toLocaleDateString("pt-BR")}</td>

                  <td>{resposta.emocao}</td>

                  <td>
                    <div>
                      <div>
                        <div style={{ width: `${resposta.intensidade * 100}%` }} />
                      </div>
                      <span>{(resposta.intensidade * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}

              {respostas.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <div>
                      <div>📊</div>
                      <div>Nenhum registro encontrado</div>
                      <div>Complete seu primeiro formulário</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {respostas.length > 0 && (
          <div>
            <div>
              <p>{respostas.length}</p>
              <p>Registros</p>
            </div>

            <div>
              <p>
                {Math.round((respostas.filter(r => r.intensidade > 0.7).length / respostas.length) * 100)}%
              </p>
              <p>Dias positivos</p>
            </div>

            <div>
              <p>{respostas[0] ? new Date(respostas[0].data).toLocaleDateString('pt-BR') : '-'}</p>
              <p>Último registro</p>
            </div>
          </div>
        )}

        <div>
          <p>Role para ver toda a tabela</p>
        </div>
      </div>
    </div>
  );
};

export default HistoricoEmocoes;
