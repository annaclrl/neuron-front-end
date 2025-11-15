import { useNavigate } from 'react-router-dom';
import ImagemError from '../../assets/images/imagem-notfound.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <div>
                    <img 
                        src={ImagemError} 
                        alt="Página não encontrada"
                    />
                </div>

                <div>
                    <h1>404</h1>
                    <h2>Página não encontrada</h2>
                    <p>Ops! A página que você procura não existe ou foi movida.</p>
                </div>

                <div>
                    <button onClick={() => navigate('/')}>
                        Voltar para a Página Inicial
                    </button>

                    <div>
                        <p>Se precisar de ajuda, entre em contato com o suporte</p>
                    </div>
                </div>

                <div>
                    <p>Ou tente uma dessas páginas:</p>

                    <div>
                        <button onClick={() => navigate('/login')}>
                            Fazer Login
                        </button>

                        <button onClick={() => navigate('/cadastro')}>
                            Criar Conta
                        </button>

                        <button onClick={() => navigate('/sobre')}>
                            Sobre Nós
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <p>
                    Neuron © 2024 - Todos os direitos reservados
                </p>
            </div>
        </div>
    );
}

export default NotFound;
