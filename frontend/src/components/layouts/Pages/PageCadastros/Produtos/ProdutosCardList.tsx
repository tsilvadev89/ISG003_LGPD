import React from 'react';
import { Produto } from '../../../../../models/Produto';
import { Categoria } from '../../../../../models/Categoria';
import { Card, CardContent, Stack, Typography, Avatar, Box } from '@mui/material';

interface ProdutoCardListProps {
  produtos: Produto[];
  categorias: Categoria[];
  onEdit: (produto: Produto) => void;
}

const ProdutoCardList: React.FC<ProdutoCardListProps> = ({ produtos, categorias, onEdit }) => {
  
  // Função para obter o nome da categoria pelo ID
  const getCategoriaNome = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.categoria_id === categoriaId);
    return categoria ? categoria.nome : 'N/A';
  };

  return (
    <Stack spacing={2}>
      {produtos.map((produto) => (
        <Card key={produto.produto_id} variant="outlined">
          <Box onClick={() => onEdit(produto)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={produto.imagem_url} alt={produto.nome} />
                <div>
                  <Typography variant="h6">{produto.nome}</Typography>
                  <Typography color="textSecondary">
                    Preço: R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Typography color="textSecondary">
                    Estoque: {produto.estoque}
                  </Typography>
                  <Typography color="textSecondary">
                    Categoria: {getCategoriaNome(produto.categoria_id)}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export default ProdutoCardList;
