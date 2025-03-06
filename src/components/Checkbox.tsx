import React from 'react';

interface CheckboxProps {
  label: React.ReactNode;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  value?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  required = false,
  error,
  value
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={`${name}${value ? `-${value}` : ''}`}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            value={value}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={`${name}${value ? `-${value}` : ''}`} className="font-medium text-gray-700">
            {label}
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Checkbox;
