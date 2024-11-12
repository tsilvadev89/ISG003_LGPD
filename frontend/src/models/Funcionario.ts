import { Cargo } from './Cargo';

export interface Funcionario {
  funcionario_id: number;
  primeiro_nome: string;
  sobrenome: string;
  email: string;
  cargo_id: number;
  cargo?: Cargo; 
  data_contratacao: string; 
  imagem_url?: string; 
  senha?: string;
}
