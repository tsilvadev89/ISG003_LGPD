export interface Agendamento {
  agendamento_id: number;
  cliente_id: number;
  servico_id: number | null;
  funcionario_id: number | null;
  data_hora: string;
  status: 'pendente' | 'confirmado' | 'cancelado' | 'concluido';
}
