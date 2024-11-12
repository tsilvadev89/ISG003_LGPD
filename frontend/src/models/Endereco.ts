export interface Endereco {
  endereco_id: number;
  entidade_id: number;
  tipo_entidade: 'cliente' | 'funcionario';
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  imagem_url?: string;
}
