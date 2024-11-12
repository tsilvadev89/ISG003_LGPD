import React, { useState } from 'react';
import { TextField, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantityCounter = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity < 10000) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 10000) {
      setQuantity(Number(value));
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            label="Quantidade"
            type="number"
            value={quantity}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 10000,
            }}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item>
          <IconButton onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuantityCounter;
