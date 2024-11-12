import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Card, CardContent, CardMedia, SelectChangeEvent } from '@mui/material';
import { categoriaService } from '../../../../../services/categoriaService';
import { produtoService } from '../../../../../services/produtoService';
import { Categoria } from '../../../../../models/Categoria';
import { Produto } from '../../../../../models/Produto';

const ListFilterProdutos = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [allProdutos, setAllProdutos] = useState<Produto[]>([]);
  const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);

  // Fetch de categorias e produtos, executado uma vez no carregamento do componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Carregar categorias do tipo 'Produto'
        const fetchedCategories = await categoriaService.getAllCategorias();
        const productCategories = Array.isArray(fetchedCategories)
          ? fetchedCategories.filter((category) => category.tipo === 'Produto')
          : [];
        setCategories(productCategories);

        // Carregar todos os produtos
        const fetchedProdutos = await produtoService.getAllProdutos();
        setAllProdutos(fetchedProdutos);
      } catch (error) {
        console.error('Erro ao buscar dados iniciais:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Filtrar produtos de acordo com a categoria selecionada
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = allProdutos.filter((produto) => produto.categoria_id === selectedCategoryId);
      setFilteredProdutos(filtered);
    } else {
      setFilteredProdutos([]);
    }
  }, [selectedCategoryId, allProdutos]);

  // Função para atualizar o ID da categoria selecionada
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoriaId = event.target.value ? Number(event.target.value) : null;
    setSelectedCategoryId(categoriaId);
  };

  const handleProductClick = (produto: Produto) => {
    console.log('Produto selecionado:', produto);
    // Adicione aqui a lógica que deseja ao clicar no produto
  };

  return (
    <Box sx={{ minWidth: 300, margin: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="category-label">Categorias</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedCategoryId !== null ? selectedCategoryId.toString() : ''}
          label="Categoria"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>Nenhuma</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.categoria_id} value={category.categoria_id.toString()}>
              {category.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCategoryId && filteredProdutos.length > 0 && (
        <Box mt={2}>
          {filteredProdutos.map((produto) => (
            <Card
              key={produto.produto_id}
              sx={{ display: 'flex', marginBottom: 2, cursor: 'pointer' }}
              onClick={() => handleProductClick(produto)}
            >
              {produto.imagem_url && (
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={produto.imagem_url}
                  alt={produto.nome}
                />
              )}
              <CardContent>
                <Typography variant="h6">{produto.nome}</Typography>
                <Typography variant="body2">{produto.descricao}</Typography>
                <Typography variant="body2">
                  Preço: R$ {typeof produto.preco === 'number' ? produto.preco.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="body2">Estoque: {produto.estoque}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ListFilterProdutos;
