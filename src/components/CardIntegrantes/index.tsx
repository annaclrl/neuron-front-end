import IconLinkedln from '../../assets/icons/icon-linkedln.png';
import IconGithub from '../../assets/icons/icon-github.png';
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
        <div>

            <img 
                src={foto}
                alt={nome}
            />

            <div>
                <p>{nome}</p>

                <p>RM: {rm}</p>

                <div>
                    <Link 
                        to={github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src={IconGithub}
                            alt="Ícone do GitHub"
                        />
                    </Link>

                    <Link
                        to={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src={IconLinkedln}
                            alt="Ícone do LinkedIn"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardIntegrantes;
