import React from 'react';
import { Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface BasicInfoProps {
  control: any;
  errors: any;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ control, errors }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="id"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="ID do item"
              variant="outlined"
              type="number"
              fullWidth
              disabled
              error={!!errors.id}
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              helperText={errors.id ? errors.id.message : ''}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome do item"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Foto Ilustrativa do item (URL)"
              variant="outlined"
              fullWidth
              error={!!errors.image}
              helperText={errors.image ? errors.image.message : ''}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Descrição do Item"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfo;
