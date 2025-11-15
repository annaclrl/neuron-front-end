export type TipoUsuario = 'RH' | 'GESTOR' | 'FUNCIONARIO';

export type DadosPessoais = {
  nome: string;
  email: string;
  senha: string;
  departamento: string;
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
