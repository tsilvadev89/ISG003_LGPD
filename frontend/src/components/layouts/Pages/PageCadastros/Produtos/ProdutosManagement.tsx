import React, { useState, useEffect } from 'react';
import { produtoService } from '../../../../../services/produtoService';
import { categoriaService } from '../../../../../services/categoriaService';
import { Produto } from '../../../../../models/Produto';
import { Categoria } from '../../../../../models/Categoria';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ProdutoTable from './ProdutoTable';
import ProdutoCardList from './ProdutosCardList';
import ProdutoForm from './ProdutosForm';

const ProdutosManagement: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Fetch para carregar produtos e categorias
  const fetchProdutos = async () => {
    try {
      const response = await produtoService.getAllProdutos();
      setProdutos(response);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Erro ao buscar produtos.');
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getAllCategorias();
      const filteredCategories = response.filter((categoria: Categoria) => categoria.tipo === 'Produto');
      setCategorias(filteredCategories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setError('Erro ao buscar categorias.');
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const handleCreate = () => {
    setSelectedProduto(null);
    setIsModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setSelectedProduto(produto);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async (produtoId: number) => {
    try {
      await produtoService.deleteProduto(produtoId);
      setSuccess(true);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setError('Erro ao excluir produto.');
    }
  };

  const handleSave = async (produto: Produto) => {
    try {
      if (produto.produto_id) {
        await produtoService.updateProduto(produto.produto_id, produto);
      } else {
        await produtoService.createProduto(produto);
      }
      setSuccess(true);
      fetchProdutos();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setError('Erro ao salvar produto.');
    }
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de Produtos</Typography>

      <Button variant="contained" onClick={handleCreate}>
        Novo Produto
      </Button>
      
      {isMobile ? (
        <ProdutoCardList produtos={produtos} categorias={categorias} onEdit={handleEdit} />
      ) : (
        <ProdutoTable produtos={produtos} categorias={categorias} onEdit={handleEdit} />
      )}

      <ProdutoForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirmed}
        produto={selectedProduto}
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

export default ProdutosManagement;
