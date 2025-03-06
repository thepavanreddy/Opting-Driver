import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../components/Input';
import CheckboxGroup from '../components/CheckboxGroup';
import Button from '../components/Button';
import Select from '../components/Select';
import Toggle from '../components/Toggle';

interface BasicInformationProps {
  userType?: 'driver' | 'user';
}

const BasicInformation: React.FC<BasicInformationProps> = ({ userType = 'driver' }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    languages: [] as string[],
    drivingPreferences: [] as string[],
    addressLine1: '',
    addressLine2: '',
    locality: '',
    district: '',
    state: '',
    isInsideCity: true,
    vehicleModel: '',
    isVehicleInsured: true,
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactNumber: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load verified phone number from localStorage
  useEffect(() => {
    const verifiedPhoneNumber = localStorage.getItem('verifiedPhoneNumber');
    if (verifiedPhoneNumber) {
      setFormData(prev => ({ ...prev, contactNumber: verifiedPhoneNumber }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxGroupChange = (name: string, values: string[]) => {
    setFormData(prev => ({ ...prev, [name]: values }));
    
    // Clear error when user selects options
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid 10-digit number';
    }
    
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (userType === 'driver') {
      if (formData.languages.length === 0) {
        newErrors.languages = 'Please select at least one language';
      }
      
      if (formData.drivingPreferences.length === 0) {
        newErrors.drivingPreferences = 'Please select at least one driving preference';
      }
    }
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    
    if (!formData.locality.trim()) {
      newErrors.locality = 'Locality is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (userType === 'user') {
      if (!formData.vehicleModel.trim()) {
        newErrors.vehicleModel = 'Vehicle model is required';
      }
    }
    
    if (userType === 'driver') {
      if (!formData.emergencyContactName.trim()) {
        newErrors.emergencyContactName = 'Emergency contact name is required';
      }
      
      if (!formData.emergencyContactRelation.trim()) {
        newErrors.emergencyContactRelation = 'Emergency contact relation is required';
      }
      
      if (!formData.emergencyContactNumber.trim()) {
        newErrors.emergencyContactNumber = 'Emergency contact number is required';
      } else if (!/^\d{10}$/.test(formData.emergencyContactNumber)) {
        newErrors.emergencyContactNumber = 'Please enter a valid 10-digit number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save data to localStorage or state management
      localStorage.setItem(`${userType}BasicInfo`, JSON.stringify(formData));
      
      if (userType === 'driver') {
        navigate('/driver/document-verification');
      } else {
        navigate('/user/dashboard');
      }
    }
  };

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'malayalam', label: 'Malayalam' }
  ];

  const drivingPreferenceOptions = [
    { value: 'local', label: 'Local' },
    { value: 'outstation', label: 'Outstation' },
    { value: 'airport', label: 'Airport' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const stateOptions = [
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'maharashtra', label: 'Maharashtra' }
  ];

  return (
    <Layout title="Basic Information" currentStep={1} showSteps={true}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            error={errors.name}
          />
          
          <Input
            label="Contact Number (Verified)"
            name="contactNumber"
            type="tel"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your 10-digit number"
            required
            error={errors.contactNumber}
            disabled
          />
          
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            error={errors.email}
          />
          
          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            error={errors.dateOfBirth}
          />
          
          {userType === 'driver' && (
            <>
              <CheckboxGroup
                label="Languages Known"
                name="languages"
                options={languageOptions}
                selectedValues={formData.languages}
                onChange={(values) => handleCheckboxGroupChange('languages', values)}
                required
                error={errors.languages}
                columns={2}
              />
              
              <CheckboxGroup
                label="Driving Preferences"
                name="drivingPreferences"
                options={drivingPreferenceOptions}
                selectedValues={formData.drivingPreferences}
                onChange={(values) => handleCheckboxGroupChange('drivingPreferences', values)}
                required
                error={errors.drivingPreferences}
                columns={2}
              />
            </>
          )}
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Home Address</h2>
            
            <Input
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="House/Flat No., Building Name"
              required
              error={errors.addressLine1}
            />
            
            <Input
              label="Address Line 2 (Optional)"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Street, Area, Locality"
              error={errors.addressLine2}
            />
            
            <Input
              label="Locality"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              placeholder="Enter locality"
              required
              error={errors.locality}
            />
            
            <Input
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter district"
              required
              error={errors.district}
            />
            
            <Select
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              options={stateOptions}
              placeholder="Select your state"
              required
              error={errors.state}
            />
            
            <div className="mt-4">
              <Toggle
                label="Location Type"
                name="isInsideCity"
                checked={formData.isInsideCity}
                onChange={(value) => handleToggleChange('isInsideCity', value)}
                onLabel="Inside City"
                offLabel="Outstation"
              />
            </div>
          </div>
          
          {userType === 'user' && (
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Vehicle Details</h2>
              
              <Input
                label="Vehicle Model"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                placeholder="E.g., Honda City, Maruti Swift"
                required
                error={errors.vehicleModel}
              />
              
              <div className="mt-4">
                <Toggle
                  label="Is your vehicle insured?"
                  name="isVehicleInsured"
                  checked={formData.isVehicleInsured}
                  onChange={(value) => handleToggleChange('isVehicleInsured', value)}
                  onLabel="Yes"
                  offLabel="No"
                />
              </div>
            </div>
          )}
          
          {userType === 'driver' && (
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Emergency Contact</h2>
              
              <Input
                label="Contact Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                placeholder="Enter emergency contact name"
                required
                error={errors.emergencyContactName}
              />
              
              <Input
                label="Relation"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                placeholder="E.g., Spouse, Parent, Sibling"
                required
                error={errors.emergencyContactRelation}
              />
              
              <Input
                label="Contact Number"
                name="emergencyContactNumber"
                type="tel"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                placeholder="Enter emergency contact number"
                required
                error={errors.emergencyContactNumber}
              />
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default BasicInformation;
