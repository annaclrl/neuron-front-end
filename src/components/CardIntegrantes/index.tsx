import IconLinkedln from '../../assets/icons/icon-linkedln.png'
import IconGithub from '../../assets/icons/icon-github.png'
import { Link } from 'react-router-dom';

interface CardIntegrantesProps {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  alt: string;
  linkedin: string;
  github: string;
}

const CardIntegrantes = ({ nome, rm, foto, github, linkedin }: CardIntegrantesProps) => {
    return (
        <div className="w-full max-w-[700px] p-6 md:p-[25px] gap-8 md:gap-10 flex flex-col md:flex-row items-center text-center md:text-left rounded bg-(--cinza-claro) shadow-md mx-auto box-border">
            <img 
                src={foto} 
                alt={nome} 
                className="w-20 h-20 md:w-[120px] md:h-[150px] object-cover rounded-sm shrink-0"
            />
            <div className="flex flex-col gap-3 md:gap-3 text-base md:text-[18px] flex-1 items-center md:items-start">
                <p className="m-0 leading-[1.4] font-semibold" style={{ color: 'var(--cinza-escuro)' }}>
                    {nome}
                </p>
                <p className="m-0 leading-[1.4] text-gray-600">
                    RM: {rm}
                </p>
                <div className="flex gap-4 md:gap-[15px] mt-2 md:mt-2.5 justify-center md:justify-start">
                    <Link 
                        to={github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="no-underline inline-block transition-transform duration-300 ease-in-out hover:scale-110"
                    >
                        <img 
                            src={IconGithub}
                            alt="Ícone do GitHub" 
                            className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        />
                    </Link>
                    <Link
                        to={linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="no-underline inline-block transition-transform duration-300 ease-in-out hover:scale-110"
                    >
                        <img 
                            src={IconLinkedln} 
                            alt="Ícone do LinkedIn" 
                            className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardIntegrantes;