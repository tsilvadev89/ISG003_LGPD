export interface Servico {
  servico_id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: string;
  ativo: boolean;
  imagem_url?: string; 
  categoria_id: number;
}
