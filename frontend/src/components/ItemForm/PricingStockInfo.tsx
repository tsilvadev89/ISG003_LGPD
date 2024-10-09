import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface PricingStockInfoProps {
  control: any;
  errors: any;
  initialPurchasePrice: number;
  initialSalePrice: number;
  onPurchasePriceChange: (value: number) => void;
  onSalePriceChange: (value: number) => void;
}

const PricingStockInfo: React.FC<PricingStockInfoProps> = ({
  control,
  errors,
  initialPurchasePrice,
  initialSalePrice,
  onPurchasePriceChange,
  onSalePriceChange
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [salePrice, setSalePrice] = useState<number | null>(null);

  useEffect(() => {
    if (initialPurchasePrice !== undefined && initialSalePrice !== undefined) {
      setPurchasePrice(initialPurchasePrice);
      setSalePrice(initialSalePrice);
      setLoading(false);
    }
  }, [initialPurchasePrice, initialSalePrice]);

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(e.target.value);
    setPurchasePrice(value);
    onPurchasePriceChange(value);
  };

  const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(e.target.value);
    setSalePrice(value);
    onSalePriceChange(value);
  };

  if (loading || purchasePrice === null || salePrice === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="purchasePrice"
          control={control}
          defaultValue={initialPurchasePrice}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valor de compra (R$)"
              variant="outlined"
              fullWidth
              error={!!errors.purchasePrice}
              helperText={errors.purchasePrice ? errors.purchasePrice.message : ''}
              value={purchasePrice}
              onChange={(e) => {
                field.onChange(e);
                handlePurchasePriceChange(e);
              }}
              type="number"
              InputProps={{
                inputProps: {
                  style: { textAlign: 'right' },
                },
                startAdornment: <span style={{ marginRight: 8 }}>R$</span>,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="salePrice"
          control={control}
          defaultValue={initialSalePrice}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valor de venda (R$)"
              variant="outlined"
              fullWidth
              error={!!errors.salePrice}
              helperText={errors.salePrice ? errors.salePrice.message : ''}
              value={salePrice}
              onChange={(e) => {
                field.onChange(e);
                handleSalePriceChange(e);
              }}
              type="number"
              InputProps={{
                inputProps: {
                  style: { textAlign: 'right' },
                },
                startAdornment: <span style={{ marginRight: 8 }}>R$</span>,
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="stock"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="Quantidade em Estoque"
              variant="outlined"
              fullWidth
              type="number"
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ''}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="minStock"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="Estoque Mínimo"
              variant="outlined"
              fullWidth
              type="number"
              error={!!errors.minStock}
              helperText={errors.minStock ? errors.minStock.message : ''}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default PricingStockInfo;
