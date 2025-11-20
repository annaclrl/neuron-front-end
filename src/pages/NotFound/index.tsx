import { useNavigate } from 'react-router-dom';
import ImagemError from '../../assets/images/imagem-notfound.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-(--cinza-claro) to-white flex flex-col items-center justify-center px-4 sm:px-6 py-8">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <img 
                        src={ImagemError} 
                        alt="Página não encontrada" 
                        className="w-64 h-64 sm:w-80 sm:h-80 mx-auto object-contain"
                    />
                </div>
                <div className="space-y-4 mb-8">
                    <h1 className="text-6xl sm:text-8xl font-bold text-gray-800">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                        Página não encontrada
                    </h2>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Ops! A página que você procura não existe ou foi movida.
                    </p>
                </div>
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-(--roxo-escuro) text-white px-8 py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:ring-offset-2"
                    >
                        Voltar para a Página Inicial
                    </button>
                     
                    <div className="text-sm text-gray-500">
                        <p>Se precisar de ajuda, entre em contato com o suporte</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600 mb-3">Ou tente uma dessas páginas:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button 
                            onClick={() => navigate('/login')}
                            className="text-(--roxo-vibrante) hover:text-(--roxo-escuro) font-medium text-sm transition-colors"
                        >
                            Fazer Login
                        </button>
                        <span className="text-gray-300">•</span>
                        <button 
                            onClick={() => navigate('/cadastro')}
                            className="text-(--roxo-vibrante) hover:text-(--roxo-escuro) font-medium text-sm transition-colors"
                        >
                            Criar Conta
                        </button>
                        <span className="text-gray-300">•</span>
                        <button 
                            onClick={() => navigate('/informacoes')}
                            className="text-(--roxo-vibrante) hover:text-(--roxo-escuro) font-medium text-sm transition-colors"
                        >
                            Sobre Nós
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <p className="text-xs text-gray-400">
                    Neuron © 2024 - Todos os direitos reservados
                </p>
            </div>
        </div>
    );
}

export default NotFound;