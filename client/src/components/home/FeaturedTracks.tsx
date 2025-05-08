import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Track } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const FeaturedTracks = () => {
  const { data: tracks, isLoading } = useQuery<Track[]>({
    queryKey: ['/api/tracks/featured'],
  });

  if (isLoading) {
    return (
      <section id="tracks" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary">Featured Tracks</h2>
            <p className="mt-2 text-gray-600">Loading track information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tracks" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Featured Tracks</h2>
          <p className="mt-2 text-gray-600">Explore the iconic venues hosting this season's races</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks?.map((track) => (
            <div key={track.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
              <div className="md:w-2/5 h-56 md:h-auto">
                <img
                  src={track.imageUrl || "https://images.unsplash.com/photo-1574519840333-9b945d58ed0c"}
                  alt={track.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="font-heading font-bold text-xl mb-2">{track.name}</h3>
                <p className="text-gray-600 mb-4">{track.location}</p>
                <div className="flex items-center mb-3">
                  <Badge variant="secondary" className="mr-2">{track.type}</Badge>
                  {track.capacity && (
                    <span className="text-sm text-gray-600">Capacity: {track.capacity.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {track.description}
                </p>
                <Link href={`/tracks/${track.id}`}>
                  <Button variant="link" className="text-primary p-0 h-auto font-medium text-sm hover:underline flex items-center">
                    Track Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/tracks">
            <Button variant="link" className="text-primary">
              View All Tracks <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTracks;
