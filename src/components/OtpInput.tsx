import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (index: number, value: string) => void;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, error }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first empty input or the first input if all are empty
    const firstEmptyIndex = value.findIndex(v => !v);
    const indexToFocus = firstEmptyIndex !== -1 ? firstEmptyIndex : 0;
    inputRefs.current[indexToFocus]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    
    // Only accept digits
    if (newValue && !/^\d+$/.test(newValue)) {
      return;
    }
    
    // Take only the last character if multiple are pasted
    const digit = newValue.slice(-1);
    
    // Update the value
    onChange(index, digit);
    
    // Move to next input if a digit was entered
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      onChange(index - 1, '');
      inputRefs.current[index - 1]?.focus();
    }
    
    // Move to next input on right arrow
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Move to previous input on left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      // Fill all inputs with the pasted digits
      pastedData.split('').forEach((digit, i) => {
        onChange(i, digit);
      });
      
      // Focus the last input
      inputRefs.current[3]?.focus();
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-2">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={value[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-full h-14 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default OtpInput;
