export type TipoUsuario = 'RH_CLEVEL' | 'GESTOR' | 'FUNCIONARIO';

export type DadosPessoais = {
  nome: string;
  email: string;
  departamento : string; 
  status: string;
};

export type DadosLogin = {
  email: string;
  senha: string;
};

export type DadosAdministrativos = {
  tipoUsuario: TipoUsuario;
};

export type CadastroForm =
  DadosPessoais &
  DadosLogin &
  DadosAdministrativos;


export type UsuarioComLogin =
  Pick<CadastroForm, "email" | "senha">;


export type Usuario =
  Pick<DadosPessoais, "nome" | "email"> & {
    tipo: TipoUsuario;
  };

