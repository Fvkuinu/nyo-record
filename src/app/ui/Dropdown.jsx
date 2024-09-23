// src/app/ui/Dropdown.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes'; // ダークモード用フック
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Dropdown = ({ options, selected, onChange, label, placeholder }) => {
  const { theme } = useTheme(); // 現在のテーマを取得

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : 'light',
        },
      }),
    [theme]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ThemeProvider theme={muiTheme}>
        <FormControl fullWidth variant="outlined" margin="normal">
          {label && <InputLabel>{label}</InputLabel>}
          <Select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            label={label}
          >
            {placeholder && (
              <MenuItem value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option.value || option} value={option.value || option}>
                {option.label || option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </motion.div>
  );
};

export default Dropdown;
