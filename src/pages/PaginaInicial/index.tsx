import EmojiFeliz from '../../assets/images/imagem-emoji-sorrindo.png';
import Agenda from '../../assets/icons/icon-agenda.png';
import Alvo from '../../assets/icons/icon-alvo.png';
import Escudo from '../../assets/icons/icon-escudo.png';
import Lupa from '../../assets/icons/icon-pesquisar.png';
import { useNavigate } from 'react-router-dom';

const PaginaInicial = () => {
  const navigate = useNavigate();
   
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'var(--fonte-principal)' }}>

      <header className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 bg-white border-b border-gray-100 shadow-sm">
        <div className="logo">
          <span className="text-xl md:text-2xl font-bold" style={{ color: 'var(--roxo-escuro)' }}>Neuron</span>
        </div>
        <nav className="flex gap-3 md:gap-4">
          <button 
            onClick={() => navigate('/login')} 
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            style={{ fontFamily: 'var(--fonte-principal)' }}
          >
            Entrar
          </button>
          <button 
            onClick={() => navigate('/cadastro')} 
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm transition-all duration-200 bg-(--roxo-vibrante) text-white hover:bg-[#8B5FFF] shadow-sm hover:shadow-md"
            style={{ fontFamily: 'var(--fonte-principal)' }}
          >
            Começar Agora
          </button>
        </nav>
      </header>

      <section className="bg-linear-to-br from-(--cinza-claro) to-white py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: 'var(--cinza-escuro)' }}>
              Bem-estar emocional <span style={{ color: 'var(--roxo-escuro)' }}>no trabalho</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Conectando tecnologia e empatia para promover um ambiente corporativo saudável e produtivo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <button 
                onClick={() => navigate('/integrantes')} 
                className="px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold transition-all duration-200 text-base lg:text-lg bg-(--roxo-vibrante) text-white hover:bg-[#8B5FFF] shadow-lg hover:shadow-xl"
              >
                Colaboradores
              </button>
              <button 
                onClick={() => navigate('/sobre')} 
                className="px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold transition-all duration-200 text-base lg:text-lg bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              >
                Saiba Mais
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <img 
              src={EmojiFeliz} 
              alt="Duas pessoas abraçando um emoji sorrindo" 
              className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--cinza-escuro)' }}>
                Sobre o <span style={{ color: 'var(--roxo-vibrante)' }}>MindTrack</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MindTrack é uma plataforma web voltada para o monitoramento e promoção do bem-estar emocional de colaboradores em ambientes corporativos.
                </p>
                <p>
                  Em um cenário de transformações no mercado de trabalho, com modelos híbridos e maior pressão por produtividade, o <strong>equilíbrio emocional</strong> tornou-se essencial para o desempenho e a saúde das equipes.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-(--cinza-claro) rounded-xl border border-gray-200">
                <img className="w-12 h-12 shrink-0 object-contain" src={Alvo} alt="Icone de um alvo" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Objetivo Claro</h3>
                  <p className="text-gray-600 text-sm">Unir tecnologia e empatia para compreender o clima emocional das equipes</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-(--cinza-claro) rounded-xl border border-gray-200">
                <img className="w-12 h-12 shrink-0 object-contain" src={Escudo} alt="Icone de um escudo" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prevenção</h3>
                  <p className="text-gray-600 text-sm">Ação preventiva contra estresse e burnout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-(--roxo-escuro) text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Impacto e Propósito</h2>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed">
              MindTrack representa o futuro do trabalho com foco no ser humano.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed">
              <p>
                Mais do que medir produtividade, ele ajuda a cuidar das pessoas, criando ambientes corporativos mais inclusivos, empáticos e sustentáveis.
              </p>
              <p>
                Em um mundo onde as tecnologias estão em todos os lugares, o MindTrack mostra que o lado humano ainda é o que move o futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-(--cinza-claro)">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--cinza-escuro)' }}>Funcionalidades Principais</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ferramentas inteligentes para um ambiente de trabalho mais saudável</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <img className="w-16 h-16 mx-auto mb-4 object-contain" src={Escudo} alt="Icone de um escudo" />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--roxo-escuro)' }}>Prevenção Proativa</h3>
              <p className="text-gray-600 leading-relaxed">Identifique e previna situações de estresse e burnout antes que aconteçam</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <img className="w-16 h-16 mx-auto mb-4 object-contain" src={Agenda} alt="Icone de uma agenda" />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--roxo-escuro)' }}>Histórico Emocional</h3>
              <p className="text-gray-600 leading-relaxed">Acompanhe sua evolução emocional com relatórios detalhados e insights</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <img className="w-16 h-16 mx-auto mb-4 object-contain" src={Lupa} alt="Icone de uma lupa" />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--roxo-escuro)' }}>Visão Geral</h3>
              <p className="text-gray-600 leading-relaxed">Monitore o clima da equipe com métricas claras e acionáveis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaginaInicial;