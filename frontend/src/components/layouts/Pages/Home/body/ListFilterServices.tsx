import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Card, CardContent, CardMedia, SelectChangeEvent } from '@mui/material';
import { categoriaService } from '../../../../../services/categoriaService';
import { servicoService } from '../../../../../services/servicoService';
import { Categoria } from '../../../../../models/Categoria';
import { Servico } from '../../../../../models/Servico';

const ListFilterServices = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [allServicos, setAllServicos] = useState<Servico[]>([]);
  const [filteredServicos, setFilteredServicos] = useState<Servico[]>([]);

  // Fetch de categorias e serviços, executado uma vez no carregamento do componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Carregar categorias
        const fetchedCategories = await categoriaService.getAllCategorias();
        const serviceCategories = Array.isArray(fetchedCategories)
          ? fetchedCategories.filter((category) => category.tipo === 'Serviço')
          : [];
        setCategories(serviceCategories);

        // Carregar todos os serviços
        const fetchedServicos = await servicoService.getAllServicos();
        setAllServicos(fetchedServicos);
      } catch (error) {
        console.error('Erro ao buscar dados iniciais:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Filtrar serviços de acordo com a categoria selecionada
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = allServicos.filter((servico) => servico.categoria_id === selectedCategoryId);
      setFilteredServicos(filtered);
    } else {
      setFilteredServicos([]);
    }
  }, [selectedCategoryId, allServicos]);

  // Função para atualizar o ID da categoria selecionada
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoriaId = event.target.value ? Number(event.target.value) : null;
    setSelectedCategoryId(categoriaId);
  };

  const handleServiceClick = (servico: Servico) => {
    console.log('Serviço selecionado:', servico);
    // Aqui você pode adicionar a lógica que deseja ao clicar no serviço
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

      {selectedCategoryId && filteredServicos.length > 0 && (
        <Box mt={2}>
          {filteredServicos.map((servico) => (
            <Card
              key={servico.servico_id}
              sx={{ display: 'flex', marginBottom: 2, cursor: 'pointer' }}
              onClick={() => handleServiceClick(servico)}
            >
              {servico.imagem_url && (
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100 }}
                  image={servico.imagem_url}
                  alt={servico.nome}
                />
              )}
              <CardContent>
                <Typography variant="h6">{servico.nome}</Typography>
                <Typography variant="body2">{servico.descricao}</Typography>
                <Typography variant="body2">
                  Preço: R$ {typeof servico.preco === 'number' ? servico.preco.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="body2">Duração: {servico.duracao}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ListFilterServices;
