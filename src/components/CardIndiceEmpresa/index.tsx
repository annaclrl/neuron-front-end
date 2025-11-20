interface CardIndiceEmpresaProps {
  titulo: string;
  valor: string;
  descricao: string;
  darkMode?: boolean;
}

const CardIndiceEmpresa = ({ titulo, valor, descricao, darkMode = false }: CardIndiceEmpresaProps) => {
  return (
    <div className={`flex-1 min-w-[200px] rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5 ${
      darkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-100"
    }`}>
      <h3 className={`text-sm font-semibold mb-2 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        {titulo}
      </h3>
      <p className={`text-2xl sm:text-3xl font-bold mb-1 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        {valor}
      </p>
      <p className={`text-xs ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}>
        {descricao}
      </p>
    </div>
  );
};

export default CardIndiceEmpresa;