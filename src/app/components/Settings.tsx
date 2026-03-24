import { useState, useEffect } from 'react';
import { X, MapPin, Thermometer, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
  onSettingsChange: () => void;
}

export interface AppSettings {
  weatherLocation: string;
  temperatureUnit: 'F' | 'C';
  customBackgrounds: string[];
}

export function Settings({ onClose, onSettingsChange }: SettingsProps) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('newtab-settings');
    return saved ? JSON.parse(saved) : {
      weatherLocation: 'San Francisco',
      temperatureUnit: 'F',
      customBackgrounds: []
    };
  });

  const handleSave = () => {
    localStorage.setItem('newtab-settings', JSON.stringify(settings));
    onSettingsChange();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSettings(prev => ({
        ...prev,
        customBackgrounds: [...prev.customBackgrounds, base64String]
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeCustomBackground = (index: number) => {
    setSettings(prev => ({
      ...prev,
      customBackgrounds: prev.customBackgrounds.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/50 transition-all duration-300"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        {/* Weather Settings */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            <h3 className="text-lg sm:text-xl text-gray-800">Weather</h3>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={settings.weatherLocation}
                onChange={(e) => setSettings({ ...settings, weatherLocation: e.target.value })}
                placeholder="Enter city name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/60 border border-white/50 
                         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white/80
                         transition-all duration-300 text-gray-800 text-sm sm:text-base"
              />
              <p className="text-xs text-gray-600 mt-1">
                Choose from: San Francisco, New York, London, Paris, Tokyo, Sydney, Los Angeles, Chicago, Miami, Seattle, Boston, Austin, Denver, Portland, Toronto, Vancouver, Berlin, Madrid, Rome, Amsterdam, Dubai, Singapore, Hong Kong, Bangkok, Mumbai
              </p>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-700 mb-2">Temperature Unit</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSettings({ ...settings, temperatureUnit: 'F' })}
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 
                    ${settings.temperatureUnit === 'F' 
                      ? 'bg-white/80 border-gray-400 shadow-md' 
                      : 'bg-white/40 border-white/50 hover:bg-white/60'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                    <span className="text-gray-800 text-xs sm:text-sm">Fahrenheit</span>
                  </div>
                </button>
                <button
                  onClick={() => setSettings({ ...settings, temperatureUnit: 'C' })}
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 
                    ${settings.temperatureUnit === 'C' 
                      ? 'bg-white/80 border-gray-400 shadow-md' 
                      : 'bg-white/40 border-white/50 hover:bg-white/60'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                    <span className="text-gray-800 text-xs sm:text-sm">Celsius</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Backgrounds */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            <h3 className="text-lg sm:text-xl text-gray-800">Custom Backgrounds</h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <label className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-6 sm:py-8 rounded-xl 
                           bg-white/40 border-2 border-dashed border-white/50 
                           hover:bg-white/60 hover:border-gray-400 
                           transition-all duration-300 cursor-pointer group">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800" />
              <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">Upload Custom Background</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {settings.customBackgrounds.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {settings.customBackgrounds.map((bg, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={bg}
                      alt={`Custom background ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-white/50"
                    />
                    <button
                      onClick={() => removeCustomBackground(index)}
                      className="absolute top-1 right-1 p-1 sm:p-1.5 rounded-full bg-red-500/80 
                               opacity-0 group-hover:opacity-100 transition-all duration-300
                               hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-600">
              Images are stored locally in your browser. Maximum size: 5MB per image.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/40 border border-white/50 
                     hover:bg-white/60 transition-all duration-300 text-gray-700 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-gray-400 
                     hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 text-sm sm:text-base"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get settings from localStorage
export function getSettings(): AppSettings {
  const saved = localStorage.getItem('newtab-settings');
  return saved ? JSON.parse(saved) : {
    weatherLocation: 'San Francisco',
    temperatureUnit: 'F',
    customBackgrounds: []
  };
}