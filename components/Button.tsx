import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  id,
  style,
  onMouseEnter
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-romantic-500 to-romantic-600 text-white hover:shadow-romantic-300/50 hover:from-romantic-600 hover:to-romantic-700",
    secondary: "bg-white text-romantic-600 border-2 border-romantic-200 hover:bg-romantic-50",
    danger: "bg-gray-200 text-gray-700 hover:bg-gray-300" // Used for base "No" styling before it runs
  };

  return (
    <motion.button
      id={id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </motion.button>
  );
};

export default Button;