import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CheckboxGroup from '../components/CheckboxGroup';
import Button from '../components/Button';
import Toggle from '../components/Toggle';

const VehiclePreferences: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleTypes: [] as string[],
    transmissionTypes: [] as string[],
    canDriveManual: true,
    canDriveAutomatic: true,
    basicRepairKnowledge: {
      changeTire: false,
      fillCoolant: false,
      fillWasherFluid: false
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCheckboxGroupChange = (name: string, values: string[]) => {
    setFormData(prev => ({ ...prev, [name]: values }));
    
    // Clear error when user selects options
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRepairKnowledgeChange = (key: keyof typeof formData.basicRepairKnowledge, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      basicRepairKnowledge: {
        ...prev.basicRepairKnowledge,
        [key]: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.vehicleTypes.length === 0) {
      newErrors.vehicleTypes = 'Please select at least one vehicle type';
    }
    
    if (formData.transmissionTypes.length === 0) {
      newErrors.transmissionTypes = 'Please select at least one transmission type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save data to localStorage or state management
      localStorage.setItem('driverVehiclePreferences', JSON.stringify(formData));
      navigate('/driver/profile-completion');
    }
  };

  const vehicleTypeOptions = [
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'muv', label: 'MUV' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'electric', label: 'Electric' }
  ];

  const transmissionTypeOptions = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'cvt', label: 'CVT' },
    { value: 'dct', label: 'DCT' }
  ];

  return (
    <Layout title="Vehicle Preferences" currentStep={3}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Vehicle Types</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the types of vehicles you are comfortable driving
            </p>
            
            <CheckboxGroup
              label="Vehicle Types"
              name="vehicleTypes"
              options={vehicleTypeOptions}
              selectedValues={formData.vehicleTypes}
              onChange={handleCheckboxGroupChange}
              required
              error={errors.vehicleTypes}
              columns={2}
            />
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Transmission Types</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the transmission types you are comfortable with
            </p>
            
            <CheckboxGroup
              label="Transmission Types"
              name="transmissionTypes"
              options={transmissionTypeOptions}
              selectedValues={formData.transmissionTypes}
              onChange={handleCheckboxGroupChange}
              required
              error={errors.transmissionTypes}
              columns={2}
            />
            
            <div className="mt-4 space-y-3">
              <Toggle
                label="I can drive manual transmission vehicles"
                checked={formData.canDriveManual}
                onChange={(checked) => handleToggleChange('canDriveManual', checked)}
              />
              
              <Toggle
                label="I can drive automatic transmission vehicles"
                checked={formData.canDriveAutomatic}
                onChange={(checked) => handleToggleChange('canDriveAutomatic', checked)}
              />
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Basic Repair Knowledge</h2>
            <p className="text-sm text-gray-600 mb-4">
              Do you know how to perform these basic vehicle maintenance tasks?
            </p>
            
            <div className="space-y-3">
              <Toggle
                label="I can change a flat tire"
                checked={formData.basicRepairKnowledge.changeTire}
                onChange={(checked) => handleRepairKnowledgeChange('changeTire', checked)}
              />
              
              <Toggle
                label="I can fill engine coolant"
                checked={formData.basicRepairKnowledge.fillCoolant}
                onChange={(checked) => handleRepairKnowledgeChange('fillCoolant', checked)}
              />
              
              <Toggle
                label="I can refill windshield washer fluid"
                checked={formData.basicRepairKnowledge.fillWasherFluid}
                onChange={(checked) => handleRepairKnowledgeChange('fillWasherFluid', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex space-x-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/driver/document-verification')}
          >
            Back
          </Button>
          
          <Button type="submit" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default VehiclePreferences;
