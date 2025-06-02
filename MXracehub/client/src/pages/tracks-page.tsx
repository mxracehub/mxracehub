import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "wouter";
import { Track } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapPin, Info, ArrowRight } from "lucide-react";

const TracksPage = () => {
  const { data: tracks, isLoading } = useQuery<Track[]>({
    queryKey: ['/api/tracks'],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTracks = tracks?.filter((track) => {
    const trackInfo = `${track.name} ${track.location}`.toLowerCase();
    const searchMatch = trackInfo.includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter === "all" || track.type === typeFilter;
    
    return searchMatch && typeMatch;
  });

  return (
    <>
      <Helmet>
        <title>Tracks - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">Tracks</h1>
            <p className="text-gray-600">Explore Supercross and Motocross venues around the country</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tracks by name or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Tabs value={typeFilter} onValueChange={setTypeFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Supercross">Supercross</TabsTrigger>
                <TabsTrigger value="Motocross">Motocross</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              {filteredTracks?.length || 0} tracks found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                  <Skeleton className="w-full md:w-2/5 h-56 md:h-auto" />
                  <div className="md:w-3/5 p-6">
                    <Skeleton className="h-7 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-1/2 mb-4" />
                    <div className="flex items-center mb-3">
                      <Skeleton className="h-5 w-20 mr-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredTracks?.length === 0 ? (
                <Card className="p-8 text-center">
                  <h3 className="font-heading font-bold text-xl mb-2">No tracks found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setTypeFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredTracks?.map((track) => (
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
                        <p className="text-gray-600 mb-4 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {track.location}
                        </p>
                        <div className="flex items-center mb-3">
                          <Badge variant="secondary" className="mr-2">{track.type}</Badge>
                          {track.capacity && (
                            <span className="text-sm text-gray-600">Capacity: {track.capacity.toLocaleString()}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {track.description || "No description available for this track."}
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
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TracksPage;
