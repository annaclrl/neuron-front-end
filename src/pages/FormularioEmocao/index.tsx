import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import type { FormInputs, DicaEmocao } from "../../types/formularioEmocao"
import { dicasEmocao } from "../../data/formularioEmocao"


const FormularioHumor = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const { darkMode } = useTheme();

  const [feedback, setFeedback] = useState<string>("");
  const [dicaAtual, setDicaAtual] = useState<DicaEmocao | null>(null);
  const [contadorRegistros, setContadorRegistros] = useState(0);
  const [emocaoOptions, setEmocaoOptions] = useState<{ id: number, nome: string }[]>([]);

  const idEmocao = watch("idEmocao");
  const intensidade = watch("intensidade");
  const idUsuario = localStorage.getItem("userId");


  useEffect(() => {
    const fetchEmocoes = async () => {
      try {
        const res = await fetch("http://localhost:8080/emocoes");
        if (!res.ok) throw new Error("Erro ao buscar emoções");
        const data = await res.json();
        setEmocaoOptions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmocoes();
  }, []);

  useEffect(() => {
    const registros = localStorage.getItem('registros_total');
    setContadorRegistros(registros ? parseInt(registros) : 0);
  }, []);

  useEffect(() => {
    if (idEmocao) {
      const emocaoSelecionada = emocaoOptions.find(e => e.id === parseInt(idEmocao.toString()));
      setDicaAtual(dicasEmocao.find(d => d.emocao === emocaoSelecionada?.nome) || null);
    } else {
      setDicaAtual(null);
    }
  }, [idEmocao, emocaoOptions]);

  const onSubmit = async (data: FormInputs) => {

    const agora = data.dataRegistro
      ? new Date(data.dataRegistro).toISOString().slice(0, -1)
      : new Date().toISOString().slice(0, -1);


    try {
      const emocao = {
          intRegistEmocao: data.intensidade,
          dsRegistEmocao: data.descricao,
          dtRegistEmocao: agora,
          idEmocao: parseInt(data.idEmocao.toString()),
          idUsuario: Number(idUsuario)
      }
      console.log(emocao);
      const registroEmocaoRes = await fetch("http://localhost:8080/registro-emocao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intRegistEmocao: data.intensidade,
          dsRegistEmocao: data.descricao,
          dtRegistEmocao: agora,
          idEmocao: parseInt(data.idEmocao.toString()),
          idUsuario: Number(idUsuario)
        })
      });

      if (!registroEmocaoRes.ok) throw new Error("Erro ao criar registro de emoção");

      const registroEmocao = await registroEmocaoRes.json();

      const respostaFormularioRes = await fetch("http://localhost:8080/resposta-formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dtResposta: agora,
          motivacao: data.motivacao,
          felicidade: data.felicidade,
          estresse: data.estresse,
          observacao: data.observacaoGeral,
          saudeMental: data.saudeMental,
          problemas: data.problemas,
          modoVer: data.modoVer,
          dtAnalise: agora,
          idUsuario: Number(idUsuario),
          idRegistEmocao: registroEmocao.idRegistEmocao
        })
      });

      if (!respostaFormularioRes.ok) throw new Error("Erro ao criar resposta do formulário");

      await respostaFormularioRes.json();

      setContadorRegistros(prev => {
        const novo = prev + 1;
        localStorage.setItem('mindtrack_registros_total', novo.toString());
        return novo;
      });

      setFeedback("Seu humor foi registrado com sucesso!");
      setTimeout(() => setFeedback(""), 3000);

    } catch (error) {
      console.error("Erro ao registrar emoção:", error);
      setFeedback("Ocorreu um erro ao registrar seu humor. Tente novamente.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };


  const getIntensidadeLabel = (intensidade: number) => {
    if (intensidade <= 3) return "Baixa";
    if (intensidade <= 6) return "Moderada";
    return "Alta";
  };

  const getEmocaoNome = () => {
    if (!idEmocao) return "";
    const emocao = emocaoOptions.find(e => e.id === parseInt(idEmocao.toString()));
    return emocao ? emocao.nome : "";
  };

  return (
    <div className={`min-h-screen overflow-y-auto bg-linear-to-br py-6 px-4 sm:py-10 sm:px-6 transition-colors duration-300 ${darkMode
      ? "from-gray-900 to-gray-800 text-white"
      : "from-(--cinza-claro) to-white text-gray-800"
      }`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"
            }`}>
            Check-in Emocional
          </h1>
          <p className={`text-lg mb-4 font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
            Como você está se sentindo agora?
          </p>

          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                {contadorRegistros} registros este mês
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Seu bem-estar é importante
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 rounded-2xl shadow-lg border p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-100"
            }`}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="idEmocao" className={`block text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                  Emoção
                </label>
                <select
                  id="idEmocao"
                  {...register("idEmocao", { required: "Selecione uma emoção" })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 ${darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-700"
                    } ${errors.idEmocao ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="" disabled>Selecione como você está se sentindo</option>
                  {emocaoOptions.map((emocao) => (
                    <option key={emocao.id} value={emocao.id} className={
                      emocao.nome === 'Feliz' ? 'text-green-600 dark:text-green-400 font-semibold' :
                        emocao.nome === 'Cansado' ? 'text-yellow-600 dark:text-yellow-400 font-semibold' :
                          emocao.nome === 'Estressado' ? 'text-red-600 dark:text-red-400 font-semibold' :
                            emocao.nome === 'Neutro' ? 'text-gray-600 dark:text-gray-400 font-semibold' :
                              emocao.nome === 'Motivado' ? 'text-blue-600 dark:text-blue-400 font-semibold' :
                                'text-orange-600 dark:text-orange-400 font-semibold'
                    }>
                      {emocao.nome}
                    </option>
                  ))}
                </select>
                {errors.idEmocao && (
                  <span className="text-red-500 text-sm font-medium block mt-1">{errors.idEmocao.message}</span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="intensidade" className={`block text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                    Intensidade
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                      {getIntensidadeLabel(intensidade || 5)}
                    </span>
                    <span className="text-lg font-bold text-(--roxo-vibrante)">
                      {intensidade || 5}/10
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    id="intensidade"
                    min="0"
                    max="10"
                    step="1"
                    defaultValue="5"
                    {...register("intensidade")}
                    className={`w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-(--roxo-vibrante) [&::-webkit-slider-thumb]:to-(--roxo-escuro) [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg ${darkMode ? "bg-gray-600" : "bg-linear-to-r from-gray-200 to-gray-300"
                      }`}
                  />

                  <div className={`flex justify-between text-xs px-1 ${darkMode ? "text-gray-500" : "text-gray-500"
                    }`}>
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="descricao" className={`block text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  {...register("descricao", { required: "A descrição é obrigatória" })}
                  placeholder="Descreva melhor como está se sentindo..."
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 resize-none ${darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-700"
                    }`}
                  rows={3}
                />
                {errors.descricao && (
                  <span className="text-red-500 text-sm block mt-1">{errors.descricao.message}</span>
                )}

                <input
                  type="datetime-local"
                  id="dataRegistro"
                  {...register("dataRegistro")}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-700"}`}
                />
              </div>

              <div className={`border-t pt-6 ${darkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"
                  }`}>
                  <div className="w-3 h-3 bg-(--roxo-vibrante) rounded-full"></div>
                  Avaliação Emocional Detalhada
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "motivacao", label: "Motivação" },
                    { name: "felicidade", label: "Felicidade" },
                    { name: "estresse", label: "Estresse" },
                    { name: "saudeMental", label: "Saúde Mental" },
                    { name: "problemas", label: "Percepção de Problemas" },
                    { name: "modoVer", label: "Modo de Ver as Coisas" }
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {field.label}: {watch(field.name as keyof FormInputs) || 5}/10
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        defaultValue="5"
                        {...register(field.name as keyof FormInputs)}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-(--roxo-vibrante) ${darkMode ? "bg-gray-600" : "bg-gray-200"
                          }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mt-4">
                  <label htmlFor="observacaoGeral" className={`block text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                    Observações Gerais
                  </label>
                  <textarea
                    id="observacaoGeral"
                    {...register("observacaoGeral", { required: "As observações gerais são obrigatórias" })}
                    placeholder="Alguma observação adicional sobre seu estado emocional?"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:border-transparent transition-all duration-200 resize-none ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-700"
                      }`}
                    rows={3}
                  />
                  {errors.observacaoGeral && (
                    <span className="text-red-500 text-sm block mt-1">{errors.observacaoGeral.message}</span>
                  )}

                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-(--roxo-vibrante) to-(--roxo-escuro) text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-(--roxo-vibrante) focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!idEmocao}
              >
                {idEmocao ? `Registrar Humor - ${getIntensidadeLabel(intensidade || 5)}` : "Selecione uma emoção"}
              </button>

              {feedback && (
                <div className={`border rounded-xl p-4 text-center ${darkMode
                  ? "bg-green-900/30 border-green-800"
                  : "bg-green-50 border-green-200"
                  }`}>
                  <p className={`font-medium text-sm ${darkMode ? "text-green-400" : "text-green-700"
                    }`}>
                    {feedback}
                  </p>
                </div>
              )}
            </form>

            <div className={`mt-6 pt-6 border-t ${darkMode ? "border-gray-700" : "border-gray-100"
              }`}>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className={darkMode ? "text-gray-500" : "text-gray-500"}>
                  Seus dados são totalmente confidenciais e seguros
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {dicaAtual && (
              <div className={`rounded-2xl shadow-lg border p-6 transition-colors duration-300 ${darkMode
                ? `bg-linear-to-br ${dicaAtual.cor} border-gray-700 text-white`
                : `bg-linear-to-br ${dicaAtual.cor} border-gray-200 text-gray-900`
                }`}>
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Dica para {getEmocaoNome()}</h3>
                    <p className={`text-sm ${darkMode ? "opacity-90" : "text-gray-800"}`}>{dicaAtual.dica}</p>
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded-2xl shadow-lg border p-6 transition-colors duration-300 ${darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-gray-800"
              }`}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-(--roxo-vibrante) rounded-full"></div>
                Por que registrar?
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Acompanhe sua evolução emocional
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Identifique padrões e gatilhos
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Melhore seu autoconhecimento
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Promova hábitos mais saudáveis
                  </span>
                </li>
              </ul>
            </div>

            <div className={`rounded-2xl p-6 border transition-colors duration-300 ${darkMode
              ? "bg-blue-900/30 border-blue-800"
              : "bg-blue-50 border-blue-100"
              }`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-blue-300" : "text-blue-800"
                    }`}>
                    Lembrete Diário
                  </h3>
                  <p className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                    Registrar seu humor diariamente ajuda a criar uma visão mais clara do seu bem-estar.
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border transition-colors duration-300 ${darkMode
              ? "bg-green-900/30 border-green-800"
              : "bg-green-50 border-green-100"
              }`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div>
                  <h3 className={`text-sm font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"
                    }`}>
                    Precisa de Ajuda?
                  </h3>
                  <p className={`text-xs mb-2 ${darkMode ? "text-green-400" : "text-green-600"
                    }`}>
                    Se estiver se sentindo sobrecarregado, não hesite em buscar apoio.
                  </p>
                  <button className={`text-xs font-semibold underline ${darkMode ? "text-green-400" : "text-green-700"
                    }`}>
                    Falar com um especialista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioHumor;