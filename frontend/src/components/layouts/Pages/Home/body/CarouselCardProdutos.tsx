import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Categoria } from '../../../../../models/Categoria';
import { categoriaService } from '../../../../../services/categoriaService';

interface PropsCarousel {
  template: string;
}

const CarouselCardProdutos: React.FC<PropsCarousel> = ({ template }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategorias = await categoriaService.getAllCategorias();
        const serviceCategories = Array.isArray(fetchedCategorias)
          ? fetchedCategorias.filter((category) => category.tipo === 'Produto')
          : [];
        setCategorias(serviceCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === categorias.length - 1 ? 0 : prevActiveStep + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [categorias.length]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === categorias.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? categorias.length - 1 : prevActiveStep - 1
    );
  };

  const handleImageClick = () => {
    handleNext();
  };

  if (categorias.length === 0) return null;

  const currentCategoria = categorias[activeStep];

  return (
    <Card
      sx={
        template === 'mobile'
          ? { margin: '0 auto', maxWidth: 300 }
          : template === 'tablet'
          ? { margin: '0 auto', maxWidth: 350 }
          : { margin: '0 auto', maxWidth: 800 }
      }
    >
      <CardMedia
        component="img"
        sx={{
          height: 300, // Define uma altura fixa
          width: '100%', // Preenche a largura do card para manter a imagem responsiva
          objectFit: 'cover', // Corta a imagem para manter as proporções
        }}
        image={currentCategoria.imagem_url || 'default_image_path.jpg'} 
        alt={currentCategoria.nome}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {currentCategoria.nome}
        </Typography>
        <Typography variant="subtitle2">
          {currentCategoria.descricao}
        </Typography>
      </CardContent>
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton onClick={handleNext}>
        <ArrowForwardIcon />
      </IconButton>
    </Card>
  );
};

export default CarouselCardProdutos;
