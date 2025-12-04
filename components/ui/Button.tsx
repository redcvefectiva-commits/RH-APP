
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', leftIcon, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-green-600 focus:ring-secondary",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${props.className || ''}`}
      {...props}
    >
      {leftIcon && <span className="mr-2 -ml-1 h-5 w-5">{leftIcon}</span>}
      {children}
    </button>
  );
};

export default Button;
