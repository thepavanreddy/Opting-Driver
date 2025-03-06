import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
  name: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  required = false,
  error,
  name,
  accept = 'image/*',
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFileName('');
      setPreview(null);
      onChange(null);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          required={required}
          accept={accept}
          className="hidden"
        />
        
        {preview ? (
          <div className="mb-2">
            <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded" />
          </div>
        ) : null}
        
        <label htmlFor={name} className="cursor-pointer">
          <div className="flex flex-col items-center justify-center py-3">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {fileName || 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {accept === 'image/*' ? 'PNG, JPG, GIF up to 10MB' : 'PDF, DOC up to 10MB'}
            </p>
          </div>
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
