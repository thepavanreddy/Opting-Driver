import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import OtpInput from '../components/OtpInput';
import { Phone, Shield, LogOut, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp' | 'new-user'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'driver' | 'user' | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  // Get the user type from URL path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/driver')) {
      setUserType('driver');
    } else if (path.includes('/user')) {
      setUserType('user');
    }
  }, []);

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
      
      // Check if user exists and their type
      // This is a simulation - in a real app, this would be a server check
      const userExists = Math.random() > 0.7; // 30% chance user exists
      
      if (userExists) {
        // Simulate retrieving user type
        if (userType) {
          // Navigate to the appropriate dashboard
          navigate(`/${userType}/dashboard`);
        } else {
          // User exists but type is unknown, go to landing page
          navigate('/');
        }
      } else {
        // User doesn't exist, show new user message
        setIsNewUser(true);
        setStep('new-user');
      }
    }, 1500);
  };

  const handleContinueRegistration = () => {
    if (userType === 'driver') {
      navigate('/driver/basic-information');
    } else if (userType === 'user') {
      navigate('/user/basic-information');
    } else {
      navigate('/');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('verifiedPhoneNumber');
    localStorage.removeItem('userType');
    
    // Navigate to landing page
    navigate('/');
  };

  return (
    <Layout title="Login" showBackButton={true} showSteps={false}>
      <div className="text-center mb-8">
        {step === 'new-user' ? (
          <div className="bg-yellow-100 p-4 rounded-full inline-flex mb-4">
            <AlertCircle className="h-12 w-12 text-yellow-600" />
          </div>
        ) : (
          <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
            <Phone className="h-12 w-12 text-blue-600" />
          </div>
        )}
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'phone' ? 'Welcome Back!' : 
           step === 'otp' ? 'Verify Your Number' : 
           'New User'}
        </h1>
        
        <p className="text-gray-600">
          {step === 'phone' 
            ? 'Enter your phone number to login to your account'
            : step === 'otp'
            ? 'We\'ve sent a 4-digit OTP to your phone number'
            : 'Looks like you haven\'t registered with us, please proceed ahead'}
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
          
          <button 
            type="button" 
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center w-full text-gray-600 text-sm"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Back to Home
          </button>
        </form>
      ) : step === 'otp' ? (
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
      ) : (
        <div>
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <div className="text-center py-4">
              <p className="text-gray-700 mb-4">
                We need to collect some basic information to complete your registration.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                This will help us provide you with a better experience.
              </p>
            </div>
          </div>
          
          <Button 
            type="button" 
            className="w-full" 
            onClick={handleContinueRegistration}
          >
            Continue to Registration
          </Button>
          
          <button 
            type="button" 
            onClick={handleLogout}
            className="mt-4 flex items-center justify-center w-full text-gray-600 text-sm"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Back to Home
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Login;
