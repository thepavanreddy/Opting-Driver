import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Shield, FileText, ExternalLink } from 'lucide-react';

const DocumentVerification: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleConnectDigiLocker = () => {
    setIsConnecting(true);
    
    // Simulate DigiLocker connection and verification
    setTimeout(() => {
      setIsConnecting(false);
      setIsVerified(true);
    }, 2000);
  };

  const handleContinue = () => {
    // In a real app, you would store the verification status
    localStorage.setItem('documentsVerified', 'true');
    navigate('/vehicle-preferences');
  };

  return (
    <Layout title="Document Verification" currentStep={2}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
        <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-blue-800">DigiLocker Integration</h3>
          <p className="text-xs text-blue-600 mt-1">
            Connect your DigiLocker account to securely verify your Aadhaar and Driving License without uploading documents.
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center mb-4">
          <FileText className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Government ID Verification</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          DigiLocker is a secure digital document wallet by the Government of India. Connecting to DigiLocker allows us to verify your:
        </p>
        
        <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
          <li>Aadhaar Card</li>
          <li>Driving License</li>
        </ul>
        
        {isVerified ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-green-800">Verification Successful</h3>
                <p className="text-xs text-green-600 mt-1">
                  Your Aadhaar and Driving License have been successfully verified through DigiLocker.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            onClick={handleConnectDigiLocker}
            className="w-full flex items-center justify-center"
            isLoading={isConnecting}
          >
            {!isConnecting && <ExternalLink className="h-4 w-4 mr-2" />}
            Connect DigiLocker
          </Button>
        )}
        
        <p className="text-xs text-gray-500 mt-4">
          Your data is securely processed and we only receive verification status, not the actual documents.
        </p>
      </div>
      
      <div className="mt-8">
        <Button 
          type="button" 
          onClick={handleContinue} 
          className="w-full"
          disabled={!isVerified}
        >
          Continue
        </Button>
      </div>
    </Layout>
  );
};

export default DocumentVerification;
