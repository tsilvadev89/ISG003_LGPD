import React, { useState, useEffect } from 'react';
import { servicoService } from '../../../../../services/servicoService';
import { categoriaService } from '../../../../../services/categoriaService';
import { Servico } from '../../../../../models/Servico';
import { Categoria } from '../../../../../models/Categoria';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ServicoTable from './ServicoTable';
import ServicoCardList from './ServicoCardList';
import ServicoForm from './ServicoForm';

const ServicoManagement: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Fetch para carregar serviços e categorias
  const fetchServicos = async () => {
    try {
      const response = await servicoService.getAllServicos();
      setServicos(response);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      setError('Erro ao buscar serviços.');
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getAllCategorias();
      console.log('response');
      console.table(response);

      const filteredCategories = response.filter((categoria: Categoria) => categoria.tipo === 'Serviço');
      setCategorias(filteredCategories);

      console.log('filteredCategories');
      console.table(filteredCategories);

    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao buscar categorias.');
    }
  };

  useEffect(() => {
    fetchServicos();
    fetchCategorias();
  }, []);

  const handleCreate = () => {
    setSelectedServico(null);
    setIsModalOpen(true);
  };

  const handleEdit = (servico: Servico) => {
    setSelectedServico(servico);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async (servicoId: number) => {
    try {
      await servicoService.deleteServico(servicoId);
      setSuccess(true);
      fetchServicos();
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      setError('Erro ao excluir serviço.');
    }
  };

  const handleSave = async (servico: Servico) => {
    try {
      if (servico.servico_id) {
        await servicoService.updateServico(servico.servico_id, servico);
      } else {
        await servicoService.createServico(servico);
      }
      setSuccess(true);
      fetchServicos();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      setError('Erro ao salvar serviço.');
    }
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de Serviços</Typography>

      <Button variant="contained" onClick={handleCreate}>
        Novo Serviço
      </Button>
      
      {isMobile ? (
        <ServicoCardList servicos={servicos} categorias={categorias} onEdit={handleEdit} />
      ) : (
        <ServicoTable servicos={servicos} categorias={categorias} onEdit={handleEdit} />
      )}

      <ServicoForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirmed}
        servico={selectedServico}
        categorias={categorias}
      />

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Operação realizada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ServicoManagement;
