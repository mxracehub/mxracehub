import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Race } from "@shared/schema";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const UpcomingRaces = () => {
  const { data: races, isLoading } = useQuery<Race[]>({
    queryKey: ['/api/races/upcoming'],
  });

  if (isLoading) {
    return (
      <section id="races" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary">Upcoming Races</h2>
            <p className="mt-2 text-gray-600">Loading upcoming races...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="races" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Upcoming Races</h2>
          <p className="mt-2 text-gray-600">Check out the complete Supercross & Motocross schedule</p>
        </div>

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

        <div className="text-center mt-10">
          <Link href="/races">
            <Button variant="link" className="text-primary">
              View Full Race Calendar <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingRaces;
