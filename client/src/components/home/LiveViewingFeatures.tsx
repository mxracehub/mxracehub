import { Button } from "@/components/ui/button";
import { 
  Tv, 
  Check,
  Play
} from "lucide-react";

const LiveViewingFeatures = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-heading font-bold text-secondary mb-4">Watch Live Races</h2>
            <p className="text-gray-600 mb-6">
              Never miss a race with our integrated live viewing options. Watch directly through our platform or connect to official streaming partners like Peacock.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <Tv className="text-primary mr-2 h-5 w-5" /> Live Streaming Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="text-green-600 mr-2 h-4 w-4" /> HD quality streaming
                </li>
                <li className="flex items-center">
                  <Check className="text-green-600 mr-2 h-4 w-4" /> Multiple camera angles
                </li>
                <li className="flex items-center">
                  <Check className="text-green-600 mr-2 h-4 w-4" /> Real-time stats overlay
                </li>
                <li className="flex items-center">
                  <Check className="text-green-600 mr-2 h-4 w-4" /> Live betting integration
                </li>
              </ul>
            </div>
            <Button 
              className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
            >
              <Play className="h-4 w-4" /> Watch on Peacock
            </Button>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1586405338868-930a7a6df8c5" 
                alt="Live Supercross Race" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-secondary bg-opacity-80 text-white p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Anaheim Supercross - LIVE</span>
                  <span className="text-sm bg-red-600 px-2 py-1 rounded">8:43 remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveViewingFeatures;
