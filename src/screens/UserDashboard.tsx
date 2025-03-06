import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { Car, Clock, MapPin, CreditCard, ChevronRight, MessageCircle, LogOut } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'request' | 'history'>('request');
  const [requestData, setRequestData] = useState({
    location: '',
    hours: '',
    date: '',
    time: '',
    vehicleType: '',
    notes: ''
  });
  
  // Dummy past requests
  const pastRequests = [
    {
      id: 'req-1',
      date: '15 Jun 2023',
      location: 'Koramangala, Bangalore',
      hours: 5,
      amount: '₹750',
      status: 'Completed',
      driverName: 'Amit K.'
    },
    {
      id: 'req-2',
      date: '10 Jun 2023',
      location: 'Whitefield, Bangalore',
      hours: 3,
      amount: '₹450',
      status: 'Completed',
      driverName: 'Suresh M.'
    },
    {
      id: 'req-3',
      date: '5 Jun 2023',
      location: 'Electronic City, Bangalore',
      hours: 8,
      amount: '₹1200',
      status: 'Cancelled',
      driverName: '-'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the request to the backend
    alert('Driver request submitted successfully!');
    // Reset form
    setRequestData({
      location: '',
      hours: '',
      date: '',
      time: '',
      vehicleType: '',
      notes: ''
    });
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('verifiedPhoneNumber');
    localStorage.removeItem('userType');
    
    // Navigate to landing page
    navigate('/');
  };

  const vehicleTypeOptions = [
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'muv', label: 'MUV' },
    { value: 'luxury', label: 'Luxury' }
  ];

  return (
    <Layout title="User Dashboard" showSteps={false} showBackButton={false}>
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              currentTab === 'request' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentTab('request')}
          >
            Request Driver
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              currentTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentTab('history')}
          >
            Request History
          </button>
        </div>
        
        <div className="p-4">
          {currentTab === 'request' ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Your Location"
                  name="location"
                  value={requestData.location}
                  onChange={handleChange}
                  placeholder="Enter your pickup location"
                  required
                />
                
                <Input
                  label="Hours Required"
                  name="hours"
                  type="number"
                  value={requestData.hours}
                  onChange={handleChange}
                  placeholder="Enter number of hours"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={requestData.date}
                    onChange={handleChange}
                    required
                  />
                  
                  <Input
                    label="Time"
                    name="time"
                    type="time"
                    value={requestData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Select
                  label="Vehicle Type"
                  name="vehicleType"
                  value={requestData.vehicleType}
                  onChange={handleChange}
                  options={vehicleTypeOptions}
                  placeholder="Select your vehicle type"
                  required
                />
                
                <div className="mb-4">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={requestData.notes}
                    onChange={handleChange as any}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Any special instructions for the driver"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Submit Request
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Your Past Requests</h3>
              
              {pastRequests.length > 0 ? (
                <div className="space-y-3">
                  {pastRequests.map(request => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500">{request.date}</p>
                          <p className="text-sm font-medium">{request.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{request.hours} hours</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="font-medium">{request.amount}</span>
                        </div>
                      </div>
                      
                      {request.status === 'Completed' && (
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <Car className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-600">Driver: {request.driverName}</span>
                          </div>
                          <button className="text-green-600 text-xs flex items-center">
                            View Details
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No requests yet</h3>
                  <p className="text-sm text-gray-500">
                    Your past driver requests will appear here
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button 
            className={`flex flex-col items-center p-2 ${currentTab === 'request' ? 'text-green-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('request')}
          >
            <Car className="h-6 w-6" />
            <span className="text-xs mt-1">Request</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-2 ${currentTab === 'history' ? 'text-green-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('history')}
          >
            <Clock className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </button>
          
          <button 
            className="flex flex-col items-center p-2 text-gray-500"
            onClick={() => navigate('/user/messages')}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </button>
          
          <button 
            className="flex flex-col items-center p-2 text-gray-500"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </div>
      
      <div className="h-16"></div> {/* Spacer for the bottom navigation */}
    </Layout>
  );
};

export default UserDashboard;
