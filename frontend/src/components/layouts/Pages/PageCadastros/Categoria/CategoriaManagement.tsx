import React, { useState, useEffect } from 'react';
import { categoriaService } from '../../../../../services/categoriaService';
import { Categoria } from '../../../../../models/Categoria';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import CategoriaTable from './CategoriaTable';
import CategoriaCardList from './CategoriaCardList';
import CategoriaForm from './CategoriaForm';

const CategoriaManagement: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'servico' | 'produto'>('servico');
  const isMobile = useMediaQuery('(max-width:600px)');

  // Fetch para carregar categorias
  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getAllCategorias();
      const filteredCategorias = response.filter((categoria: Categoria) =>
        view === 'servico' ? categoria.tipo === 'Serviço' : categoria.tipo === 'Produto'
      );
      setCategorias(filteredCategorias);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao buscar categorias.');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [view]);

  const handleCreate = () => {
    setSelectedCategoria(null);
    setIsModalOpen(true);
  };

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async (categoriaId: number) => {
    try {
      await categoriaService.deleteCategoria(categoriaId);
      setSuccess(true);
      fetchCategorias();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      setError('Erro ao excluir categoria.');
    }
  };

  const handleSave = async (categoria: Categoria) => {
    try {
      if (categoria.categoria_id) {
        await categoriaService.updateCategoria(categoria.categoria_id, categoria);
      } else {
        await categoriaService.createCategoria(categoria);
      }
      setSuccess(true);
      fetchCategorias();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setError('Erro ao salvar categoria.');
    }
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de Categorias</Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => setView(newView)}
        aria-label="View selection"
      >
        <ToggleButton value="servico" aria-label="Serviço">
          Serviço
        </ToggleButton>
        <ToggleButton value="produto" aria-label="Produto">
          Produto
        </ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" onClick={handleCreate}>
        Nova Categoria
      </Button>
      
      {isMobile ? (
        <CategoriaCardList categorias={categorias} onEdit={handleEdit} />
      ) : (
        <CategoriaTable categorias={categorias} onEdit={handleEdit} />
      )}

      <CategoriaForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirmed}
        categoria={selectedCategoria}
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

export default CategoriaManagement;
