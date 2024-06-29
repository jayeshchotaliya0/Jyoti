import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface Option {
  [key: string]: any;
}

interface SelectBoxProps {
  list: Option[];
  keyField: string;
  valueField: string;
  name: string;
  className?: string;
  control?: Control<any>;
  errors?: any; // You can be more specific with the type if you know the structure of your errors object
  onChange?: any;
  disabled?:boolean;

}

const SelectBox: React.FC<SelectBoxProps> = ({
  list,
  keyField,
  valueField,
  name,
  className,
  control,
  errors,
  onChange,
  disabled
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: 'This field is required' }}
        render={({ field }) => (
          <select
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              if (onChange) {
                onChange(e.target.value);
              }
            }}
            disabled={disabled}
            className={className || 'form-control'}
            value={field.value || ""}
          >
            <option value="" disabled>
              Select Example
            </option>
            {list?.map((item: Option) => (
              <option key={item[keyField]} value={item[keyField]}>
                {item[valueField]}
              </option>
            ))}
          </select>
        )}
      />
      {errors?.[name] && errors[name].type === 'required' && (
        <span className="text-red-600" role="alert">
          {errors[name].message}
        </span>
      )}
    </>
  );
};

export default SelectBox;
