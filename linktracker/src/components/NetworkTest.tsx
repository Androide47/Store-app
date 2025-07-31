import React, { useState } from 'react';
import { buildApiUrl, API_CONFIG } from '../config/api';

interface NetworkTestProps {
  onClose: () => void;
}

export const NetworkTest: React.FC<NetworkTestProps> = ({ onClose }) => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      const response = await fetch(buildApiUrl('/docs'), {
        method: 'GET',
        mode: 'cors',
      });
      
      if (response.ok) {
        setTestResult('✅ Backend server is accessible! CORS is working properly.');
      } else {
        setTestResult(`❌ Backend server responded with status: ${response.status}`);
      }
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setTestResult('❌ Network Error: Cannot connect to backend server. Please check if the backend is running on the correct IP address.');
      } else if (error.message?.includes('CORS')) {
        setTestResult('❌ CORS Error: Backend server is blocking requests from this origin.');
      } else {
        setTestResult(`❌ Connection Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-beige p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Network Connection Test</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Frontend URL:</strong> http://192.168.1.69:5173/
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Backend URL:</strong> {API_CONFIG.BASE_URL}
          </p>
        </div>
        
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 mb-4"
        >
          {isLoading ? 'Testing Connection...' : 'Test Backend Connection'}
        </button>
        
        {testResult && (
          <div className="mb-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm whitespace-pre-wrap">{testResult}</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mb-4">
          <p><strong>Troubleshooting:</strong></p>
          <ul className="list-disc list-inside mt-1">
            <li>Make sure backend server is running</li>
            <li>Check if backend is accessible on network (not just localhost)</li>
            <li>Verify CORS configuration in backend</li>
            <li>Ensure firewall allows connections on port 8000</li>
          </ul>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};