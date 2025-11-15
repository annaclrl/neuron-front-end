import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../context/ThemeContext";
import type { FormInputs, DicaEmocao } from "../../types/formularioEmocao";
import {emocaoOptions, dicasEmocao} from "../../data/formularioEmocao"

const FormularioHumor = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const { darkMode } = useTheme();

  const [feedback, setFeedback] = useState<string>("");
  const [dicaAtual, setDicaAtual] = useState<DicaEmocao | null>(null);
  const [contadorRegistros, setContadorRegistros] = useState(0);


  const idEmocao = watch("idEmocao");
  const intensidade = watch("intensidade");

  useEffect(() => {
    const registros = localStorage.getItem('mindtrack_registros_total');
    setContadorRegistros(registros ? parseInt(registros) : 0);
  }, []);

  useEffect(() => {
    if (idEmocao) {
      const emocaoSelecionada = emocaoOptions.find(e => e.id === Number(idEmocao));
      const dica = dicasEmocao.find(d => d.emocao === emocaoSelecionada?.nome);
      setDicaAtual(dica || null);
    } else {
      setDicaAtual(null);
    }
  }, [idEmocao]);

  const onSubmit = (data: FormInputs) => {
    const novoTotal = contadorRegistros + 1;
    setContadorRegistros(novoTotal);
    localStorage.setItem('mindtrack_registros_total', novoTotal.toString());

    const agora = new Date().toISOString();

    const registroEmocao = {
      INT_REGIST_EMOCAO: data.intensidade,
      DS_REGIST_EMOCAO: data.descricao,
      DT_REGIST_EMOCAO: agora,
      ID_EMOCAO: data.idEmocao,
      ID_RESPOSTA: null,
    };

    const respostaFormulario = {
      DT_RESPOSTA: agora,
      MOT_RESPOSTA: data.motivacao,
      FEL_RESPOSTA: data.felicidade,
      EST_RESPOSTA: data.estresse,
      OBS_RESPOSTA: data.observacaoGeral,
      SAU_MEN_RESPOSTA: data.saudeMental,
      PROB_RESPOSTA: data.problemas,
      MOD_VER_RESPOSTA: data.modoVer,
      DT_ANL_RESPOSTA: agora,
      ID_USUARIO: 1,
      ID_REGIST_EMOCAO: null,
    };

    const historico = JSON.parse(localStorage.getItem('mindtrack_historico') || '[]');
    const novoRegistro = {
      ...data,
      registroEmocao,
      respostaFormulario,
      data: agora,
      id: Date.now()
    };
    historico.push(novoRegistro);
    localStorage.setItem('mindtrack_historico', JSON.stringify(historico));

    setFeedback("Seu humor foi registrado com sucesso!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const getIntensidadeLabel = (intensidade: number) => {
    if (intensidade <= 3) return "Baixa";
    if (intensidade <= 6) return "Moderada";
    return "Alta";
  };

  const getEmocaoNome = () => {
    if (!idEmocao) return "";
    const emocao = emocaoOptions.find(e => e.id === Number(idEmocao));
    return emocao ? emocao.nome : "";
  };

  return (
    <div>
      <div>
        <h1>Check-in Emocional</h1>
        <p>Como você está se sentindo agora?</p>
        <div>
          <span>{contadorRegistros} registros este mês</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <select id="idEmocao" {...register("idEmocao", { required: true })}>
          <option value="" disabled>Selecione como você está se sentindo</option>
          {emocaoOptions.map((emocao) => (
            <option key={emocao.id} value={emocao.id}>
              {emocao.nome}
            </option>
          ))}
        </select>

        <input type="range" min="0" max="10" step="1" defaultValue="5" {...register("intensidade")} />

        <textarea id="descricao" {...register("descricao")} />

        {[
          { name: "motivacao", label: "Motivação" },
          { name: "felicidade", label: "Felicidade" },
          { name: "estresse", label: "Estresse" },
          { name: "saudeMental", label: "Saúde Mental" },
          { name: "problemas", label: "Problemas" },
          { name: "modoVer", label: "Modo de Ver as Coisas" },
        ].map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input type="range" min="0" max="10" step="1" defaultValue="5" {...register(field.name as keyof FormInputs)} />
          </div>
        ))}

        <textarea id="observacaoGeral" {...register("observacaoGeral")} />

        <button type="submit">Registrar Humor</button>

        {feedback && <div>{feedback}</div>}
      </form>

      {dicaAtual && (
        <div>
          <h3>Dica para {getEmocaoNome()}</h3>
          <p>{dicaAtual.dica}</p>
        </div>
      )}
    </div>
  );
};

export default FormularioHumor;
