// Button.tsx
import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  label: string;
  color?: 'primary' | 'secondary';
  onClick: () => void;
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
}

const Button: React.FC<ButtonProps> = ({ label, color = 'primary', onClick, fullWidth = true, variant = 'contained' }) => {
  return (
    <MuiButton color={color} onClick={onClick} fullWidth={fullWidth} variant={variant} sx={{ marginTop: 2 }}>
      {label}
    </MuiButton>
  );
};

export default Button;