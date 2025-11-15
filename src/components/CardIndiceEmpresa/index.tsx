interface CardIndiceEmpresaProps {
  titulo: string;
  valor: string;
  descricao: string;
  darkMode?: boolean;
}

const CardIndiceEmpresa = ({ titulo, valor, descricao, darkMode = false }: CardIndiceEmpresaProps) => {
  return (
    <div>
      <h3>{titulo}</h3>
      <p>{valor}</p>
      <p>{descricao}</p>
    </div>
  );
};

export default CardIndiceEmpresa;
