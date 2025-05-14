import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [generalSettings, setGeneralSettings] = useState({
    notifications: true,
    emailAlerts: true,
    soundAlerts: false
  });
  
  const [aiSettings, setAiSettings] = useState({
    detectionSensitivity: 75,
    minimumCleaningTime: 30,
    coverageThreshold: 95
  });
  
  const [alertSettings, setAlertSettings] = useState({
    missedCleaningAlert: true,
    delayedCleaningAlert: true,
    alertTimeout: 15
  });
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: checked
    });
  };
  
  const handleAISettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAiSettings({
      ...aiSettings,
      [name]: parseInt(value, 10)
    });
  };
  
  const handleAlertSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setAlertSettings({
      ...alertSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : parseInt(value, 10)
    });
  };
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate saving settings
    setTimeout(() => {
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <Layout title="Settings">
      <div className="max-w-4xl mx-auto">
        {currentUser?.role !== 'ADMIN' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Some settings may be restricted based on your role. Contact an administrator for changes.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {saveSuccess && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Settings saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSaveSettings}>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                General Settings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure notification preferences and general system behavior.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      checked={generalSettings.notifications}
                      onChange={handleGeneralSettingsChange}
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications" className="font-medium text-gray-700">
                      Enable Notifications
                    </label>
                    <p className="text-gray-500">
                      Receive in-app notifications about sanitization status changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailAlerts"
                      name="emailAlerts"
                      type="checkbox"
                      checked={generalSettings.emailAlerts}
                      onChange={handleGeneralSettingsChange}
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailAlerts" className="font-medium text-gray-700">
                      Email Alerts
                    </label>
                    <p className="text-gray-500">
                      Receive email notifications for critical alerts and daily summaries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="soundAlerts"
                      name="soundAlerts"
                      type="checkbox"
                      checked={generalSettings.soundAlerts}
                      onChange={handleGeneralSettingsChange}
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="soundAlerts" className="font-medium text-gray-700">
                      Sound Alerts
                    </label>
                    <p className="text-gray-500">
                      Play sound notifications for important alerts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                AI Detection Settings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure the sensitivity and thresholds for AI-based sanitization detection.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="detectionSensitivity" className="block text-sm font-medium text-gray-700">
                    Detection Sensitivity ({aiSettings.detectionSensitivity}%)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Higher sensitivity may detect more subtle cleaning actions but can increase false positives.
                  </p>
                  <input
                    type="range"
                    name="detectionSensitivity"
                    id="detectionSensitivity"
                    min="50"
                    max="100"
                    value={aiSettings.detectionSensitivity}
                    onChange={handleAISettingsChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="minimumCleaningTime" className="block text-sm font-medium text-gray-700">
                    Minimum Cleaning Duration ({aiSettings.minimumCleaningTime} seconds)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    The minimum time required for a sanitization process to be considered complete.
                  </p>
                  <input
                    type="range"
                    name="minimumCleaningTime"
                    id="minimumCleaningTime"
                    min="15"
                    max="120"
                    step="5"
                    value={aiSettings.minimumCleaningTime}
                    onChange={handleAISettingsChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>15s</span>
                    <span>120s</span>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="coverageThreshold" className="block text-sm font-medium text-gray-700">
                    Surface Coverage Threshold ({aiSettings.coverageThreshold}%)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    The minimum percentage of the seat area that must be sanitized.
                  </p>
                  <input
                    type="range"
                    name="coverageThreshold"
                    id="coverageThreshold"
                    min="80"
                    max="100"
                    value={aiSettings.coverageThreshold}
                    onChange={handleAISettingsChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Alert Configuration
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure when and how alerts are triggered for sanitization issues.
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="missedCleaningAlert"
                      name="missedCleaningAlert"
                      type="checkbox"
                      checked={alertSettings.missedCleaningAlert}
                      onChange={handleAlertSettingsChange}
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="missedCleaningAlert" className="font-medium text-gray-700">
                      Missed Cleaning Alerts
                    </label>
                    <p className="text-gray-500">
                      Send alerts when scheduled cleanings are missed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="delayedCleaningAlert"
                      name="delayedCleaningAlert"
                      type="checkbox"
                      checked={alertSettings.delayedCleaningAlert}
                      onChange={handleAlertSettingsChange}
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="delayedCleaningAlert" className="font-medium text-gray-700">
                      Delayed Cleaning Alerts
                    </label>
                    <p className="text-gray-500">
                      Send alerts when cleanings are delayed beyond the scheduled time.
                    </p>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="alertTimeout" className="block text-sm font-medium text-gray-700">
                    Alert Timeout
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    How long (in minutes) before a delayed cleaning triggers an alert.
                  </p>
                  <select
                    id="alertTimeout"
                    name="alertTimeout"
                    value={alertSettings.alertTimeout}
                    onChange={handleAlertSettingsChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SettingsPage;