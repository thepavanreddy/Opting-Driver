import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, User } from 'lucide-react';
import Button from '../components/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="mb-6">
              <img 
                src="https://via.placeholder.com/300x200?text=OptingDriver" 
                alt="OptingDriver" 
                className="mx-auto h-40 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">OptingDriver</h1>
            <p className="text-lg text-gray-600">
              Make your driving experience easier by hiring a driver
            </p>
          </div>

          <div className="space-y-4">
            <div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate('/driver')}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">I'm a Driver</h2>
                  <p className="text-sm text-gray-600">Register or login to find driving opportunities</p>
                </div>
              </div>
            </div>

            <div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate('/user')}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">I need a Driver</h2>
                  <p className="text-sm text-gray-600">Find a driver for your vehicle</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2025 OptingDriver. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
