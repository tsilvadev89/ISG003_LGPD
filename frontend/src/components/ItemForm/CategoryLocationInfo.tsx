import React from 'react';
import { Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface CategoryLocationInfoProps {
  control: any;
  errors: any;
}

const CategoryLocationInfo: React.FC<CategoryLocationInfoProps> = ({ control, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="category"
          control={control}
          defaultValue="Porção"
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Categoria"
              variant="outlined"
              fullWidth
              error={!!errors.category}
              helperText={errors.category ? errors.category.message : ''}
            >
              {["Porção", "Bebida", "Combo", "Diversos"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="stockLocation"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Local do Estoque"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="generalInfo"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Informações em geral"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="status"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} color="primary" />}
              label="Ativo"
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CategoryLocationInfo;
