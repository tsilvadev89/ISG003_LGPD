import { Categoria } from './Categoria';

export interface Produto {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria_id: number;
  categoria?: Categoria;
  ativo: boolean;
  imagem_url?: string; 
}
