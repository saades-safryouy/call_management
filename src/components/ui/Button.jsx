import React from 'react';
import Spinner from './Spinner';

const VARIANTS = {
  primary: 'bg-primary text-white shadow-md hover:bg-primary-600 focus:ring-primary disabled:hover:bg-primary',
  secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
  danger: 'bg-primary text-white shadow-md hover:bg-primary-600 focus:ring-primary',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
};

/**
 * Button — standardized, enterprise-styled button.
 * Props: variant, size, loading, icon (lucide component), iconRight, type, ...rest
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  type = 'button',
  disabled,
  className = '',
  children,
  ...rest
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    {...rest}
  >
    {loading ? (
      <Spinner size="xs" className="border-current border-t-transparent" />
    ) : (
      Icon && <Icon className="h-4 w-4" />
    )}
    {children}
    {!loading && IconRight && <IconRight className="h-4 w-4" />}
  </button>
);

export default Button;
