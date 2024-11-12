export interface Cliente {
  cliente_id: number;
  primeiro_nome: string;
  sobrenome: string;
  email: string;
  data_nascimento: string; 
  data_cadastro?: string; 
  imagem_url?: string;
  senha?: string;
}
