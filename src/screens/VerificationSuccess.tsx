import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const VerificationSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Verification Successful" showSteps={false}>
      <div className="text-center mb-8">
        <div className="bg-green-100 p-4 rounded-full inline-flex mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h1>
        
        <p className="text-gray-600">
          Your profile has been verified successfully. You're now ready to start accepting ride requests.
        </p>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">What's next?</h2>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-medium">1</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Go to your dashboard to view available ride requests
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-medium">2</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Accept requests that match your preferences and availability
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-medium">3</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Communicate with users through the in-app messaging system
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <span className="text-green-600 font-medium">4</span>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Track your earnings and manage your profile from the dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        type="button" 
        className="w-full flex items-center justify-center"
        onClick={() => navigate('/driver/dashboard')}
      >
        Go to Dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => navigate('/driver/driver-etiquette')}
      >
        View Driver Guidelines
      </Button>
    </Layout>
  );
};

export default VerificationSuccess;
