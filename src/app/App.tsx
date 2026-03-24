import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Clock } from '@/app/components/Clock';
import { SearchBar } from '@/app/components/SearchBar';
import { WeatherWidget } from '@/app/components/WeatherWidget';
import { QuickLinks } from '@/app/components/QuickLinks';
import { BackgroundChanger } from '@/app/components/BackgroundChanger';
import { Settings } from '@/app/components/Settings';

export default function App() {
  const [background, setBackground] = useState(
    'https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920'
  );
  const [showSettings, setShowSettings] = useState(false);
  const [weatherKey, setWeatherKey] = useState(0);

  const handleSettingsChange = () => {
    // Trigger weather widget to refresh by changing its key
    setWeatherKey(prev => prev + 1);
  };

  return (
    <div className="size-full min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 size-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* Settings Button - Top Left */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2.5 sm:p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 
                     hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl 
                     hover:scale-105 group"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Weather Widget - Top Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <WeatherWidget key={weatherKey} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-2 sm:px-0">
          <Clock />
          <SearchBar />
          <QuickLinks />
        </div>
      </div>

      {/* Background Changer */}
      <BackgroundChanger onBackgroundChange={setBackground} />

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          onSettingsChange={handleSettingsChange}
        />
      )}
    </div>
  );
}