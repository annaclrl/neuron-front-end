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
    <main>
      <section>
        <div>
          <button onClick={() => natigate(-1)}>
            <img src={Seta} alt="Ícone de seta para voltar" />
          </button>

          <h1>Central de Ajuda</h1>
          <p>Encontre respostas rápidas ou entre em contato conosco</p>

          <div>
            <button onClick={() => setActiveSection('faq')}>
              Perguntas Frequentes
            </button>

            <button onClick={() => setActiveSection('contato')}>
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      <div>
        {activeSection === 'faq' && (
          <section>
            <h2>Perguntas Frequentes</h2>

            <div>
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
          <section>
            <div>
              <h2>Fale Conosco</h2>
              <p>
                Quer saber mais sobre o MindTrack ou propor uma parceria?
                Entre em contato com a nossa equipe.
              </p>
            </div>

            <div>
              <div>
                <div>
                  <img src={IconEmail} alt="Ícone de email" />
                </div>

                <h3>E-mail</h3>
                <p>contato@mindtrack.com</p>
                <span>Respondemos em até 24h</span>
              </div>

              <div>
                <div>
                  <img src={IconTelefone} alt="Ícone de telefone" />
                </div>

                <h3>Telefone</h3>
                <p>(11) 99999-9999</p>
                <span>Ligue para nosso atendimento</span>
              </div>
            </div>

            <div>
              <div>
                <h3>Nosso Compromisso</h3>
                <p>
                  Cuidar da saúde emocional das pessoas é o que nos move.
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
