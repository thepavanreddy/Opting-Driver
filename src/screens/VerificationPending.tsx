import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { Clock, Mail, Phone } from 'lucide-react';

const VerificationPending: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Verification Pending" showSteps={false}>
      <div className="text-center mb-8">
        <div className="bg-yellow-100 p-4 rounded-full inline-flex mb-4">
          <Clock className="h-12 w-12 text-yellow-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Profile is Under Review
        </h1>
        
        <p className="text-gray-600">
          We're currently reviewing your documents and information. This usually takes 24-48 hours.
        </p>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">What happens next?</h2>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">1</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Our team will verify all your submitted documents and information
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">2</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                You'll receive an SMS notification once your profile is approved
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <span className="text-blue-600 font-medium">3</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                After approval, you can start accepting ride requests
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Need help?</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Email us</p>
              <p className="text-sm text-blue-600">support@optingdriver.com</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-700">Call us</p>
              <p className="text-sm text-blue-600">+91 1800-123-4567</p>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Layout>
  );
};

export default VerificationPending;
