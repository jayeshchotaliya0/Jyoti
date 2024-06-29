import React from 'react';
import { Controller, Control } from 'react-hook-form';
import Select, { components, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated'

interface Option {
  label: string;
  value: any;
}

interface SelectBoxProps {
  options?: any;
  isMulti?: boolean;
  customStyles?: any;
  name: string;
  className?: string;
  control: Control<any>;
  errors?: any; // You can be more specific with the type if you know the structure of your errors object
  onChange?: any;
  required?:boolean;
  data?:any;
  keys?:string;
  value?:string;
}

const MultiSelect: React.FC<SelectBoxProps> = ({
  isMulti = false,
  customStyles,
  name,
  className,
  control,
  errors,
  onChange,
  required,
  data,
  keys,
  value
}) => {
  
  const options = data?.length > 0 ? data.map((cell: any) => ({
    value: cell[keys?keys:''],
    label: cell[value?value:'']
  })) : [];

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: required ? false :'This field is required' }}
        render={({ field }) => (
          <Select
          {...field}
          options={options}
          isMulti={isMulti}
          isClearable
          components={makeAnimated()}
          styles={customStyles}
          className="basic-multi-select"
          value={
            isMulti
              ? options.filter((opt: any) => field.value.includes(opt.value))
              : options.find((opt: any) => opt.value === field.value)
          }
          onChange={(value, action) => {
            let newValue;
            if (isMulti) {
              newValue = value ? value.map((v: Option) => v.value) : [];
            } else {
              newValue = value ? value.value : '';
            }
            field.onChange(newValue);
            if (onChange) {
              onChange(newValue, action);
            }
          }}
        />



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

export default MultiSelect;
