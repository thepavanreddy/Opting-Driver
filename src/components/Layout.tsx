import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep?: number;
  totalSteps?: number;
  showBackButton?: boolean;
  showSteps?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  currentStep = 1,
  totalSteps = 5,
  showBackButton = true,
  showSteps = true
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          {showBackButton && (
            <button
              type="button"
              onClick={handleBack}
              className="mr-4 p-1 rounded-full hover:bg-gray-100"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
      </header>

      {showSteps && (
        <div className="bg-white border-t border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 === currentStep
                        ? 'bg-blue-600 text-white'
                        : index + 1 < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1 < currentStep ? '✓' : index + 1}
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    Step {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-gray-200 rounded-full">
              <div
                className="h-1 bg-blue-600 rounded-full"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
