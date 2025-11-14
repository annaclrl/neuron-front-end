import IconSeta from '../../assets/icons/icon-seta.png';
import { useState } from 'react';

interface FAQItemProps {
  pergunta: string;
  resposta: string;
}

const FAQItem = ({ pergunta, resposta }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleOpen} aria-expanded={isOpen}>
        <span>{pergunta}</span>

        <img
          src={IconSeta}
          alt={isOpen ? "Fechar resposta" : "Abrir resposta"}
        />
      </button>

      {isOpen && (
        <div>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
