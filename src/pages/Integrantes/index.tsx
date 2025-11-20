import CardIntegrantes from '../../components/CardIntegrantes';
import ImgEquipe from '../../assets/images/imagem-equipe.png';
import Seta from '../../assets/icons/icon-seta-voltar.png'
import { integrantes } from '../../data/integrantes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Integrantes = () => {
    const natigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <main
            className={`min-h-screen ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 ease-out`}
            style={{ fontFamily: 'var(--fonte-principal)' }} >
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <button
                                    onClick={() => natigate(-1)}
                                    className="shrink-0 hover:opacity-70 transition-opacity"
                                >
                                    <img
                                        src={Seta}
                                        alt="Ícone de seta para voltar"
                                        className="w-6 h-6 md:w-8 md:h-8"
                                    />
                                </button>
                                <h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                                    style={{ color: 'var(--cinza-escuro)' }}
                                >
                                    Conheça nossa <span style={{ color: 'var(--roxo-vibrante)' }}>equipe</span>
                                </h1>
                            </div>
                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
                                Conheça os desenvolvedores por trás da sua experiência de saúde digital.
                            </p>
                            <div className="flex gap-12 pt-6">
                                <div className="text-left">
                                    <span
                                        className="block text-2xl md:text-3xl font-light"
                                        style={{ color: 'var(--roxo-escuro)' }}
                                    >
                                        {integrantes.length}+
                                    </span>
                                    <span className="block text-sm text-gray-400 mt-1 uppercase tracking-wide">
                                        Desenvolvedores
                                    </span>
                                </div>
                                <div className="text-left">
                                    <span
                                        className="block text-2xl md:text-3xl font-light"
                                        style={{ color: 'var(--roxo-escuro)' }}
                                    >
                                        100%
                                    </span>
                                    <span className="block text-sm text-gray-400 mt-1 uppercase tracking-wide">
                                        Comprometidos
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <img
                                src={ImgEquipe}
                                alt="Ilustração de equipe de desenvolvimento trabalhando juntos"
                                className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-(--cinza-claro)">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16 md:mb-20">
                        <h2
                            className="text-3xl md:text-4xl font-semibold mb-4 tracking-wide"
                            style={{ color: 'var(--cinza-escuro)' }}
                        >
                            Nossos Desenvolvedores
                        </h2>
                        <p className="text-base text-gray-500 max-w-2xl mx-auto">
                            Profissionais dedicados criando soluções inovadoras para seu bem-estar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                        {integrantes.map((pessoa, index) => (
                            <CardIntegrantes key={index} {...pessoa} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Integrantes;