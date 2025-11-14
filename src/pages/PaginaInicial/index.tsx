import EmojiFeliz from '../../assets/images/imagem-emoji-sorrindo.png';
import Agenda from '../../assets/icons/icon-agenda.png';
import Alvo from '../../assets/icons/icon-alvo.png';
import Escudo from '../../assets/icons/icon-escudo.png';
import Lupa from '../../assets/icons/icon-pesquisar.png';
import { useNavigate } from 'react-router-dom';

const PaginaInicial = () => {
  const navigate = useNavigate();

  return (
    <div>

      <header>
        <div>
          <span>Neuron</span>
        </div>
        <nav>
          <button onClick={() => navigate('/login')}>
            Entrar
          </button>

          <button onClick={() => navigate('/cadastro')}>
            Começar Agora
          </button>
        </nav>
      </header>

      <section>
        <div>
          <div>
            <h1>
              Bem-estar emocional no trabalho
            </h1>

            <p>
              Conectando tecnologia e empatia para promover um ambiente corporativo saudável e produtivo
            </p>

            <div>
              <button onClick={() => navigate('/integrantes')}>
                Colaboradores
              </button>

              <button onClick={() => navigate('/sobre')}>
                Saiba Mais
              </button>
            </div>
          </div>

          <div>
            <img 
              src={EmojiFeliz} 
              alt="Duas pessoas abraçando um emoji sorrindo"
            />
          </div>
        </div>
      </section>

      <section>
        <div>
          <div>
            <h2>Sobre o MindTrack</h2>

            <p>
              MindTrack é uma plataforma web voltada para o monitoramento e promoção do bem-estar emocional de colaboradores em ambientes corporativos.
            </p>

            <p>
              Em um cenário de transformações no mercado de trabalho, com modelos híbridos e maior pressão por produtividade, o equilíbrio emocional tornou-se essencial para o desempenho e a saúde das equipes.
            </p>
          </div>

          <div>
            <div>
              <img src={Alvo} alt="Icone de um alvo" />
              <div>
                <h3>Objetivo Claro</h3>
                <p>Unir tecnologia e empatia para compreender o clima emocional das equipes</p>
              </div>
            </div>

            <div>
              <img src={Escudo} alt="Icone de um escudo" />
              <div>
                <h3>Prevenção</h3>
                <p>Ação preventiva contra estresse e burnout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>Impacto e Propósito</h2>

          <p>
            MindTrack representa o futuro do trabalho com foco no ser humano.
          </p>

          <p>
            Mais do que medir produtividade, ele ajuda a cuidar das pessoas, criando ambientes corporativos mais inclusivos, empáticos e sustentáveis.
          </p>

          <p>
            Em um mundo onde as tecnologias estão em todos os lugares, o MindTrack mostra que o lado humano ainda é o que move o futuro.
          </p>
        </div>
      </section>

      <section>
        <div>
          <h2>Funcionalidades Principais</h2>

          <div>
            <div>
              <img src={Escudo} alt="Icone de um escudo" />
              <h3>Prevenção Proativa</h3>
              <p>Identifique e previna situações de estresse e burnout antes que aconteçam</p>
            </div>

            <div>
              <img src={Agenda} alt="Icone de uma agenda" />
              <h3>Histórico Emocional</h3>
              <p>Acompanhe sua evolução emocional com relatórios detalhados e insights</p>
            </div>

            <div>
              <img src={Lupa} alt="Icone de uma lupa" />
              <h3>Visão Geral</h3>
              <p>Monitore o clima da equipe com métricas claras e acionáveis</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PaginaInicial;
