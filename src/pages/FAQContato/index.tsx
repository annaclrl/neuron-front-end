import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FAQItem from '../../components/FAQItem';
import { perguntasFAQ } from '../../data/perguntasFAQ';
import Seta from '../../assets/icons/icon-seta-voltar.png';
import IconTelefone from '../../assets/icons/icon-telefone.png';
import IconEmail from '../../assets/icons/icon-email.png';

const FAQContato = () => {
  const location = useLocation();
  const natigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'faq' | 'contato'>('faq');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const secao = params.get('secao');

    if (secao === 'contato') {
      setActiveSection('contato');
    } else {
      setActiveSection('faq');
    }
  }, [location.search]);

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: 'var(--fonte-principal)' }}>
      <section className="bg-linear-to-br from-(--cinza-claro) to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-4 relative w-full max-w-2xl">
              <button
                onClick={() => natigate(-1)}
                className="shrink-0 hover:opacity-70 transition-opacity absolute left-0"
              >
                <img
                  src={Seta}
                  alt="Ícone de seta para voltar"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </button>
              <h1
                className="text-4xl md:text-5xl font-bold flex-1 text-center"
                style={{ color: 'var(--cinza-escuro)' }}
              >
                Central de Ajuda
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              Encontre respostas rápidas ou entre em contato conosco
            </p>
            <div className="flex justify-center gap-4 md:gap-6">
              <button
                onClick={() => setActiveSection('faq')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-base border-2 ${activeSection === 'faq'
                    ? 'bg-(--roxo-vibrante) text-white border-(--roxo-vibrante) shadow-lg'
                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-(--roxo-vibrante) hover:text-(--roxo-vibrante)'
                  }`}
              >
                Perguntas Frequentes
              </button>
              <button
                onClick={() => setActiveSection('contato')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-base border-2 ${activeSection === 'contato'
                    ? 'bg-(--roxo-vibrante) text-white border-(--roxo-vibrante) shadow-lg'
                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-(--roxo-vibrante) hover:text-(--roxo-vibrante)'
                  }`}
              >
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-12 md:py-16 px-4">
        {activeSection === 'faq' && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: 'var(--cinza-escuro)' }}>
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {perguntasFAQ.map((item, index) => (
                <FAQItem
                  key={index}
                  pergunta={item.pergunta}
                  resposta={item.resposta}
                />
              ))}
            </div>
          </section>
        )}

        {activeSection === 'contato' && (
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--cinza-escuro)' }}>
                Fale Conosco
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Quer saber mais sobre o Neuron ou propor uma parceria?
                Entre em contato com a nossa equipe — adoramos conversar sobre bem-estar,
                inovação e o futuro do trabalho.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 justify-center max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-(--cinza-claro) rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={IconEmail}
                    alt="Ícone de email"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--roxo-escuro)' }}>
                  E-mail
                </h3>
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--cinza-escuro)' }}>
                  contato@neuron.com
                </p>
                <span className="text-sm text-gray-500">Respondemos em até 24h</span>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-(--cinza-claro) rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
                    src={IconTelefone}
                    alt="Ícone de telefone"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--roxo-escuro)' }}>
                  Telefone
                </h3>
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--cinza-escuro)' }}>
                  (11) 99999-9999
                </p>
                <span className="text-sm text-gray-500">Ligue para nosso atendimento</span>
              </div>
            </div>

            <div className="bg-(--cinza-claro) rounded-2xl p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--roxo-escuro)' }}>
                  Nosso Compromisso
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Cuidar da saúde emocional das pessoas é o que nos move.
                  Por isso, cada feedback é uma oportunidade de melhorar e criar
                  uma experiência mais humana e empática para todos.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default FAQContato;