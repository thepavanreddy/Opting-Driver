import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { CheckCircle, Clock, Star, Shield, ThumbsUp } from 'lucide-react';

const DriverEtiquette: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Driver Etiquette" showSteps={false}>
      <div className="text-center mb-8">
        <div className="bg-green-100 p-4 rounded-full inline-flex mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h1>
        
        <p className="text-gray-600">
          Your profile has been verified. Before you start accepting rides, please review our driver etiquette guidelines.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-start mb-4">
            <Star className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Provide 5-Star Service</h3>
              <p className="text-sm text-gray-600 mt-1">
                Greet passengers with a smile, confirm their name and destination, and ask if they have a preferred route.
              </p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Safety First</h3>
              <p className="text-sm text-gray-600 mt-1">
                Always follow traffic rules, maintain a safe speed, and ensure all passengers wear seatbelts.
              </p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <Clock className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Be Punctual</h3>
              <p className="text-sm text-gray-600 mt-1">
                Arrive on time for pickups. If you're running late, notify the passenger through the app.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Maintain Professionalism</h3>
              <p className="text-sm text-gray-600 mt-1">
                Keep your vehicle clean, dress appropriately, and maintain a professional demeanor at all times.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Important Note</h3>
          <p className="text-xs text-yellow-700">
            Maintaining a rating above 4.2 is required to continue using the platform. Consistently low ratings may result in temporary suspension.
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={() => navigate('/driver-dashboard')} 
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </Layout>
  );
};

export default DriverEtiquette;
