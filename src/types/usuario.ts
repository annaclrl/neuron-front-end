export type TipoUsuario = 'RH_CLEVEL' | 'GESTOR' | 'FUNCIONARIO';

export type DadosPessoais = {
  nome: string;
  email: string;
  departamento: string; 
  status: string;
  senha: string;
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


export type Usuario = {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  status: string; 
  dataCadastro: string;
  codigoAcesso: number;
  codigoDepartamento: number;
  tipo?: string;
};

export interface AtualizarUsuarioDto {
  nome: string;
  email: string;
  senha: string;
  codigoAcesso: number;
  codigoDepartamento: number;
  status: string;
  dataCadastro: string;
}


