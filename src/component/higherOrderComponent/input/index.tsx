import React, { Ref, forwardRef } from 'react';

interface InputProps {
  type: string;
  name: string;
  maxLength?: number; // Make maxLength optional
  id?: string;
  autoComplete?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref: Ref<HTMLInputElement>) => {
    const {
      type,
      name,
      id,
      maxLength,
      autoComplete,
      className,
      placeholder,
      disabled,
      value,
      checked,
      onChange,
    } = props;
    return (
      <input
        type={type}
        name={name}
        id={id}
        ref={ref}
        maxLength={maxLength}
        autoComplete={autoComplete}
        className={className || 'form-control'}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-invalid="false"
      />
    );
  }
);
// Define defaultProps for maxLength
Input.defaultProps = {
  maxLength: undefined,
  id: undefined,
  autoComplete: undefined,
  className: '',
  placeholder: '',
  disabled: false,
  value: undefined,
  checked: false,
};

export default Input;
