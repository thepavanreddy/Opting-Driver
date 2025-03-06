import React from 'react';

interface ToggleProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  name,
  checked,
  onChange,
  onLabel = 'On',
  offLabel = 'Off'
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <button
          type="button"
          className={`relative inline-flex h-10 w-full max-w-[200px] items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          onClick={() => onChange(!checked)}
          aria-pressed={checked}
          aria-labelledby={`${name}-label`}
        >
          <span
            className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
              checked ? 'translate-x-[calc(200px-34px)]' : 'translate-x-0'
            }`}
          />
          <span
            className={`flex-1 text-center text-sm font-medium ${
              checked ? 'text-white pl-3 pr-9' : 'text-gray-900 pl-9 pr-3'
            }`}
          >
            {checked ? onLabel : offLabel}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Toggle;
