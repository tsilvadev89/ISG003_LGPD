import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTheme, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';

interface ItemCardProps {
  id: number;
  name: string;
  image: string;
  description?: string;
  salePrice: number;
  category: string;
  stock: number;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Porção':
      return <LocalDiningIcon sx={{ color: 'primary.main', mr: 1 }} />;
    case 'Bebida':
      return <LocalBarIcon sx={{ color: 'secondary.main', mr: 1 }} />;
    case 'Combo':
      return <FastfoodIcon sx={{ color: 'success.main', mr: 1 }} />;
    case 'Diversos':
      return <CategoryIcon sx={{ color: 'error.main', mr: 1 }} />;
    default:
      return <CategoryIcon sx={{ color: 'grey.500', mr: 1 }} />;
  }
};

const getCategoryBorderColor = (category: string) => {
  switch (category) {
    case 'Porção':
      return 'primary.main';
    case 'Bebida':
      return 'secondary.main';
    case 'Combo':
      return 'success.main';
    case 'Diversos':
      return 'error.main';
    default:
      return 'grey.500';
  }
};

const ItemCard: React.FC<ItemCardProps> = ({ id, name, image, description, salePrice, category, stock }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`);
  };
/* 
  const formattedSalePrice = salePrice.toFixed(2); */

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxShadow: 3,
        border: 1,
        borderColor: getCategoryBorderColor(category),
        '&:hover .zoom': {
          transform: 'scale(1.2)',
        },
        cursor: 'pointer'
      }}
      onClick={handleEditClick}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={name}
            className="zoom"
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
              maxHeight: '150px',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {name}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <DescriptionIcon sx={{ mr: 1 }} />
              <Tooltip title={description} placement="top">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    cursor: 'pointer'
                  }}
                >
                  {description}
                </Typography>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <MonetizationOnIcon sx={{ mr: 1 }} />
              <Typography variant="caption" component="div" color="text.primary">
                R${salePrice}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              {getCategoryIcon(category)}
              <Typography variant="caption" color="text.secondary">
                Categoria: {category}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                Estoque: {stock}
              </Typography>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ItemCard;
