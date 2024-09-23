// src/components/ui/Input.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Input = ({ label, type = 'text', value, onChange, name, placeholder }) => {
  const { theme } = useTheme();

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
    <div className="mb-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ThemeProvider theme={muiTheme}>
          <TextField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            fullWidth
            variant="outlined"
          />
        </ThemeProvider>
      </motion.div>
    </div>
  );
};

export default Input;
