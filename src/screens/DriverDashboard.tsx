import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import { Car, Clock, MapPin, CreditCard, ChevronRight, User, Star, MessageCircle, LogOut } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [currentTab, setCurrentTab] = useState<'requests' | 'earnings'>('requests');
  
  // Dummy ride requests
  const rideRequests = [
    {
      id: 'ride-1',
      location: 'Indiranagar, Bangalore',
      hours: 4,
      estimatedFare: '₹600',
      passengerName: 'Rahul S.',
      passengerRating: 4.8,
      requestTime: '10:30 AM'
    },
    {
      id: 'ride-2',
      location: 'HSR Layout, Bangalore',
      hours: 8,
      estimatedFare: '₹1200',
      passengerName: 'Priya M.',
      passengerRating: 4.6,
      requestTime: '11:15 AM'
    }
  ];
  
  // Dummy past rides
  const pastRides = [
    {
      id: 'past-1',
      date: '12 Jun 2023',
      location: 'Whitefield, Bangalore',
      hours: 6,
      amount: '₹850',
      status: 'Completed'
    },
    {
      id: 'past-2',
      date: '10 Jun 2023',
      location: 'MG Road, Bangalore',
      hours: 3,
      amount: '₹450',
      status: 'Completed'
    },
    {
      id: 'past-3',
      date: '8 Jun 2023',
      location: 'JP Nagar, Bangalore',
      hours: 2,
      amount: '₹380',
      status: 'Completed'
    }
  ];
  
  // Calculate total earnings
  const totalEarnings = pastRides.reduce((total, ride) => {
    const amount = parseInt(ride.amount.replace('₹', ''));
    return total + amount;
  }, 0);

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('verifiedPhoneNumber');
    localStorage.removeItem('userType');
    localStorage.removeItem('driverBasicInfo');
    localStorage.removeItem('driverVehiclePreferences');
    
    // Navigate to landing page
    navigate('/');
  };

  const handleAcceptRide = (rideId: string) => {
    // In a real app, this would send an API request to accept the ride
    console.log(`Accepting ride ${rideId}`);
    
    // Navigate to messages screen to chat with the user
    navigate('/driver/messages');
  };

  return (
    <Layout title="Driver Dashboard" showSteps={false} showBackButton={false}>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800">Driver Status</h2>
            <p className="text-sm text-gray-500">
              {isActive ? 'You are currently accepting ride requests' : 'You are currently offline'}
            </p>
          </div>
          
          <Toggle
            label=""
            checked={isActive}
            onChange={setIsActive}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              currentTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentTab('requests')}
          >
            Ride Requests
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium ${
              currentTab === 'earnings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setCurrentTab('earnings')}
          >
            Earnings
          </button>
        </div>
        
        <div className="p-4">
          {currentTab === 'requests' ? (
            <>
              {isActive ? (
                rideRequests.length > 0 ? (
                  <div className="space-y-4">
                    {rideRequests.map(ride => (
                      <div key={ride.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm font-medium">{ride.passengerName}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm">{ride.passengerRating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex">
                            <div className="mt-1 mr-3">
                              <MapPin className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">LOCATION</p>
                              <p className="text-sm font-medium">{ride.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{ride.hours} hours</span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="font-medium">{ride.estimatedFare}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{ride.requestTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 text-sm py-2"
                          >
                            Decline
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 text-sm py-2 flex items-center justify-center"
                            onClick={() => handleAcceptRide(ride.id)}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-800 mb-1">No ride requests yet</h3>
                    <p className="text-sm text-gray-500">
                      New ride requests will appear here. Stay online to receive them.
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">You're offline</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Go online to start receiving ride requests
                  </p>
                  <Button
                    type="button"
                    onClick={() => setIsActive(true)}
                    className="text-sm py-2 px-4"
                  >
                    Go Online
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-1">Total Earnings</h3>
                <p className="text-2xl font-bold text-blue-600">₹{totalEarnings}</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              
              <h3 className="text-md font-medium text-gray-800 mb-3">Recent Trips</h3>
              
              <div className="space-y-3">
                {pastRides.map(ride => (
                  <div key={ride.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <p className="text-xs text-gray-500">{ride.date}</p>
                      <p className="text-sm font-medium">{ride.location} • {ride.hours} hours</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{ride.amount}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="text-blue-600 text-sm font-medium mt-4 flex items-center">
                View All Trips
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button 
            className={`flex flex-col items-center p-2 ${currentTab === 'requests' ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('requests')}
          >
            <Car className="h-6 w-6" />
            <span className="text-xs mt-1">Requests</span>
          </button>
          
          <button 
            className={`flex flex-col items-center p-2 ${currentTab === 'earnings' ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('earnings')}
          >
            <CreditCard className="h-6 w-6" />
            <span className="text-xs mt-1">Earnings</span>
          </button>
          
          <button 
            className="flex flex-col items-center p-2 text-gray-500"
            onClick={() => navigate('/driver/messages')}
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

export default DriverDashboard;
