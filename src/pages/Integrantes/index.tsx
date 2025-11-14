import CardIntegrantes from '../../components/CardIntegrantes';
import ImgEquipe from '../../assets/images/imagem-equipe.png';
import Seta from '../../assets/icons/icon-seta-voltar.png';
import { integrantes } from '../../data/integrantes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Integrantes = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <main>

            <section>
                <div>
                    <div>

                        <div>
                            <button onClick={() => navigate(-1)}>
                                <img src={Seta} alt="Ícone de seta para voltar" />
                            </button>

                            <h1>
                                Conheça nossa <span>equipe</span>
                            </h1>

                            <p>
                                Conheça os desenvolvedores por trás da sua experiência de saúde digital.
                            </p>

                            <div>
                                <div>
                                    <span>
                                        {integrantes.length}+
                                    </span>
                                    <span>
                                        Desenvolvedores
                                    </span>
                                </div>

                                <div>
                                    <span>
                                        100%
                                    </span>
                                    <span>
                                        Comprometidos
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img
                                src={ImgEquipe}
                                alt="Ilustração de equipe de desenvolvimento trabalhando juntos"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div>

                    <div>
                        <h2>Nossos Desenvolvedores</h2>

                        <p>
                            Profissionais dedicados criando soluções inovadoras para seu bem-estar
                        </p>
                    </div>

                    <div>
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
