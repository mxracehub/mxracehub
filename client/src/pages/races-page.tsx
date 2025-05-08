import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Race } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const RacesPage = () => {
  const { data: races, isLoading } = useQuery<Race[]>({
    queryKey: ['/api/races'],
  });

  return (
    <>
      <Helmet>
        <title>Race Calendar - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">Race Calendar</h1>
            <p className="text-gray-600">Complete schedule of all upcoming Supercross and Motocross events</p>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Supercross</Button>
              <Button variant="outline" size="sm">Motocross</Button>
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-7 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {races?.map((race) => (
                <Card key={race.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={race.imageUrl || "https://images.unsplash.com/photo-1543104464-8900992f5efa"} 
                      alt={race.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 rounded-bl-lg font-medium">
                      {format(new Date(race.date), "MMM d, yyyy")}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="secondary">{race.type}</Badge>
                      <span className="text-gray-600 text-sm">
                        {format(new Date(race.date), "h:mm a")}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2">{race.name}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {race.trackId ? `Track ID: ${race.trackId}` : 'Location TBA'}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link href={`/races/${race.id}`}>
                        <Button variant="secondary" className="text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Race Details
                        </Button>
                      </Link>
                      <Link href={`/betting?race=${race.id}`}>
                        <Button 
                          variant="outline" 
                          className="text-sm bg-[#FFC107] text-secondary border-[#FFC107] hover:bg-[#FFC107]/90"
                        >
                          <Trophy className="h-4 w-4 mr-1" />
                          Bet Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RacesPage;
