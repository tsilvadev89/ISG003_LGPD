import React from 'react';
import { Categoria } from '../../../../../models/Categoria';
import { Card, CardContent, Stack, Typography, Avatar, Box } from '@mui/material';

interface CategoriaCardListProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
}

const CategoriaCardList: React.FC<CategoriaCardListProps> = ({ categorias, onEdit }) => {
  return (
    <Stack spacing={2}>
      {categorias.map((categoria) => (
        <Card key={categoria.categoria_id} variant="outlined">
          <Box onClick={() => onEdit(categoria)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={categoria.imagem_url} alt={categoria.nome} />
                <div>
                  <Typography variant="h6">{categoria.nome}</Typography>
                  <Typography color="textSecondary">
                    Tipo: {categoria.tipo}
                  </Typography>
                  <Typography color="textSecondary">
                    Descrição: {categoria.descricao}
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

export default CategoriaCardList;
