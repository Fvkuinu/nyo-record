// src/app/ui/CustomButton.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button as NextUIButton } from '@nextui-org/react';

// framer-motionでNextUIのButtonをラップ
const MotionButton = motion(NextUIButton);

const CustomButton = ({
  children,
  onClick,
  isDisabled = false, // NextUI v2では 'isDisabled'
  variant = 'solid', // 'solid', 'flat', 'bordered', 'ghost', 'light'
  color = 'primary', // 'primary', 'secondary', 'error'
  radius = 'md', // 'none', 'sm', 'md', 'lg', 'xl', 'full'
  size = 'md', // 'xs', 'sm', 'md', 'lg', 'xl'
  css = {},
}) => {
  // NextUI v2のボタンのborder-radiusに対応するマッピング
  const radiusMap = {
    none: '0px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  };

  // アニメーションの設定
  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 },
  };

  return (
    <MotionButton
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      isDisabled={isDisabled}
      whileTap="tap"
      whileHover={!isDisabled && 'hover'}
      variants={buttonVariants}
      css={{
        borderRadius: radiusMap[radius],
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...css, // カスタムスタイルの適用
      }}
      auto
    >
      {children}
    </MotionButton>
  );
};

export default CustomButton;
