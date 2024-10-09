import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TabPanel, TabContext } from '@mui/lab';
import BasicInfo from './BasicInfo';
import PricingStockInfo from './PricingStockInfo';
import CategoryLocationInfo from './CategoryLocationInfo';
import { createProduct, getProductById, updateProduct, deleteProduct } from '../../api/crudProducts';
import { Product } from '../../types/types';
import { useNotification } from '../../context/NotificationContext';


const ItemForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm<Product>({
    mode: 'onChange',
  });
  const { setNotification } = useNotification();
  const [currentTab, setCurrentTab] = useState('1');
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const product = await getProductById(Number(id));
        if (product) {
          for (const key in product) {
            setValue(key as keyof Product, product[key as keyof Product]);
          }
          setPurchasePrice(product.purchasePrice);
          setSalePrice(product.salePrice);
        }
      };
      fetchProduct();
    }
  }, [id, setValue]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const onSubmit = async (data: Product) => {
    if (!isValid) {
      setNotification({ type: 'error', message: 'Validação falhou. Por favor, verifique os campos.' });
      return;
    }

    try {
      if (id) {
        await updateProduct(Number(id), { ...data, purchasePrice, salePrice });
        setNotification({ type: 'success', message: `Produto ${data.name} atualizado com sucesso` });
        navigate('/home');
      } else {
        await createProduct({ ...data, purchasePrice, salePrice });
        setNotification({ type: 'success', message: `Produto ${data.name} cadastrado com sucesso` });
        navigate('/home');
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Falha ao salvar o produto' });
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteProduct(Number(id));
        setNotification({ type: 'success', message: `Produto deletado com sucesso` });
        navigate('/home');
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Falha ao deletar o produto' });
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTabLabel = (label: string, errorKey: string) => {
    const hasError = errors[errorKey as keyof typeof errors];
    return (
      <Badge color="error" variant="dot" invisible={!hasError}>
        {label}
      </Badge>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #000000, #002424)',
      }}
    >
      <Container maxWidth="md">
        <Stack
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            padding: 4,
            width: { xs: '100%', sm: '80%', md: '70%' },
            margin: 'auto',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
            {id ? 'Editar Produto' : 'Cadastro de Itens para Venda'}
          </Typography>
          <TabContext value={currentTab}>
            <Tabs value={currentTab} onChange={handleChange} centered>
              <Tab label={getTabLabel("Dados Básicos", "name")} value="1" />
              <Tab label={getTabLabel("Valores e Estoque", "purchasePrice")} value="2" />
              <Tab label={getTabLabel("Categoria e Localização", "category")} value="3" />
            </Tabs>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel value="1">
                <BasicInfo control={control} errors={errors} />
              </TabPanel>
              <TabPanel value="2">
                <PricingStockInfo
                  control={control}
                  errors={errors}
                  initialPurchasePrice={purchasePrice}
                  initialSalePrice={salePrice}
                  onPurchasePriceChange={setPurchasePrice}
                  onSalePriceChange={setSalePrice}
                />
              </TabPanel>
              <TabPanel value="3">
                <CategoryLocationInfo control={control} errors={errors} />
              </TabPanel>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {id ? 'Atualizar Produto' : 'Salvar Produto'}
                </Button>
                {id && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={handleClickOpen}
                  >
                    Deletar Produto
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ ml: 2 }}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Box>
            </form>
          </TabContext>
        </Stack>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmar Deleção"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza de que deseja deletar este produto? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleClose();
                handleDelete();
              }}
              color="secondary"
              autoFocus
            >
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ItemForm;
