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
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm mb-4 transition-all duration-300 hover:shadow-md ${
      isOpen ? 'shadow-lg border-(--roxo-vibrante)/20' : ''
    }`}>
      <button 
        className="w-full flex justify-between items-center p-4 md:p-5 lg:p-6 text-left cursor-pointer transition-colors duration-200 hover:bg-(--cinza-claro)/50"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base lg:text-lg font-medium pr-3 md:pr-4" style={{ color: 'var(--cinza-escuro)' }}>
          {pergunta}
        </span>
        <img 
          src={IconSeta} 
          alt={isOpen ? "Fechar resposta" : "Abrir resposta"} 
          className={`w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6 pt-2">
          <p className="text-gray-600 leading-relaxed text-sm md:text-base" style={{ lineHeight: '1.6' }}>
            {resposta}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;