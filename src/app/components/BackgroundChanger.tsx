import { useState } from 'react';
import { RefreshCw, Image } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
];

interface BackgroundChangerProps {
  onBackgroundChange: (url: string) => void;
}

export function BackgroundChanger({ onBackgroundChange }: BackgroundChangerProps) {
  const [showGallery, setShowGallery] = useState(false);

  const changeBackground = (url: string) => {
    onBackgroundChange(url);
    setShowGallery(false);
  };

  const randomBackground = () => {
    const randomUrl = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    onBackgroundChange(randomUrl);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="flex flex-col gap-2 items-end">
        {showGallery && (
          <div className="bg-white/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/50 mb-2">
            <div className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 font-medium">Choose Background</div>
            <div className="grid grid-cols-3 gap-2">
              {backgroundImages.map((url, index) => (
                <button
                  key={index}
                  onClick={() => changeBackground(url)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-white/50 
                           hover:border-white hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <img src={url} alt={`Background ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={randomBackground}
            className="p-2.5 sm:p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 
                     hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl 
                     hover:scale-105 group"
            title="Random background"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:rotate-180 transition-transform duration-500" />
          </button>
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="p-2.5 sm:p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 
                     hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl 
                     hover:scale-105"
            title="Choose background"
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}