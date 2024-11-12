// Checkbox.tsx
import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox checked={checked} onChange={onChange} color="primary" />}
      label={label}
    />
  );
};

export default Checkbox;
