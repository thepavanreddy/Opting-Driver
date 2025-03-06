import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import OtpInput from '../components/OtpInput';
import { Phone, Shield } from 'lucide-react';

interface WelcomeScreenProps {
  userType: 'driver' | 'user';
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userType }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    
    // Simulate OTP sending
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setError('');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.some(digit => !digit)) {
      setError('Please enter the complete OTP');
      return;
    }
    
    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Store the verified phone number in localStorage
      localStorage.setItem('verifiedPhoneNumber', phoneNumber);
      localStorage.setItem('userType', userType);
      
      // Navigate to the next screen based on user type
      if (userType === 'driver') {
        navigate('/driver/basic-information');
      } else {
        navigate('/user/dashboard');
      }
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
  };

  return (
    <Layout 
      title={userType === 'driver' ? "Driver Onboarding" : "User Registration"} 
      showBackButton={true} 
      showSteps={userType === 'driver'}
    >
      <div className="text-center mb-8">
        <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
          <Phone className="h-12 w-12 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'phone' 
            ? (userType === 'driver' ? 'Welcome, Driver!' : 'Welcome to OptingDriver') 
            : 'Verify Your Number'}
        </h1>
        
        <p className="text-gray-600">
          {step === 'phone' 
            ? (userType === 'driver' 
                ? 'Enter your phone number to get started with the onboarding process' 
                : 'Enter your phone number to find drivers for your vehicle')
            : 'We\'ve sent a 4-digit OTP to your phone number'}
        </p>
      </div>
      
      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit}>
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError('');
              }}
              placeholder="Enter your 10-digit number"
              required
              error={error}
            />
            
            <div className="flex items-start mt-4">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                Your number will be used to verify your identity and for important communications
              </p>
            </div>
          </div>
          
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Get OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">OTP sent to</p>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">+91 {phoneNumber}</span>
                <button 
                  type="button" 
                  className="text-sm text-blue-600"
                  onClick={() => setStep('phone')}
                >
                  Change
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <OtpInput 
                value={otp} 
                onChange={handleOtpChange} 
                error={error}
              />
            </div>
            
            <div className="text-center mt-4">
              <button type="button" className="text-sm text-blue-600">
                Resend OTP
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Verify & Continue
          </Button>
        </form>
      )}
    </Layout>
  );
};

export default WelcomeScreen;
