import { Produto } from './Produto';

export interface ItemPedido {
  item_id: number;
  pedido_id: number;
  produto_id: number;
  produto?: Produto; 
  quantidade: number;
  preco_unitario: number;
}
