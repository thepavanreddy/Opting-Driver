import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { User, Info, Camera } from 'lucide-react';

const ProfileCompletion: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    profilePicture: null as File | null,
    referralCode: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (file: File | null) => {
    setProfileData(prev => ({ ...prev, profilePicture: file }));
    
    // Clear error when user uploads a file
    if (errors.profilePicture) {
      setErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types or checks
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }
    
    if (!profileData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would upload the profile picture to a server
      // For now, we'll just simulate success and move to the next step
      navigate('/verification-pending');
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check permissions or try uploading a photo instead.');
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'profile-picture.jpg', { type: 'image/jpeg' });
            handleFileChange(file);
            
            // Stop camera stream
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
            
            setShowCamera(false);
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const closeCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    setShowCamera(false);
  };

  return (
    <Layout title="Complete Your Profile" currentStep={4}>
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Profile Picture</h2>
          </div>
          
          {showCamera ? (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-auto"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  onClick={capturePhoto} 
                  className="flex-1"
                >
                  Capture
                </Button>
                <Button 
                  type="button" 
                  onClick={closeCamera} 
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <FileUpload
                label="Upload a clear photo of yourself"
                name="profilePicture"
                onChange={handleFileChange}
                required
                error={errors.profilePicture}
                accept="image/*"
              />
              
              <div className="mt-4">
                <Button 
                  type="button" 
                  onClick={startCamera} 
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo with Camera
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                This will be displayed to users. Please use a professional photo with good lighting.
              </p>
            </>
          )}
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h2>
          
          <Input
            label="Referral Code (Optional)"
            name="referralCode"
            value={profileData.referralCode}
            onChange={handleInputChange}
            placeholder="Enter referral code if you have one"
          />
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Referral Benefits</h3>
                <p className="text-xs text-blue-600 mt-1">
                  Get ₹500 bonus when you sign up with a referral code and complete your first 10 rides!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Terms & Conditions</h2>
          
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
              </span>
            }
            name="agreeToTerms"
            checked={profileData.agreeToTerms}
            onChange={handleInputChange}
            required
            error={errors.agreeToTerms}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <Button type="button" onClick={handleSubmit} className="w-full">
          Submit for Verification
        </Button>
      </div>
    </Layout>
  );
};

export default ProfileCompletion;
