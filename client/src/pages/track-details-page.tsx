import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Track, Race } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Calendar, Info, ChevronLeft, Trophy, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const TrackDetailsPage = () => {
  const { id } = useParams();
  const trackId = parseInt(id);

  const { data: track, isLoading: isTrackLoading } = useQuery<Track>({
    queryKey: [`/api/tracks/${trackId}`],
  });

  // Ideally, we'd have an API endpoint to get races by track ID
  // For now, we'll use the general races endpoint
  const { data: races, isLoading: isRacesLoading } = useQuery<Race[]>({
    queryKey: ['/api/races'],
  });

  const trackRaces = races?.filter(race => race.trackId === trackId);

  if (isTrackLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2 mb-4" />
                <Skeleton className="h-64 w-full rounded-lg mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-40 w-full" />
                </div>
              </div>
              <div>
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!track) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-secondary mb-4">Track Not Found</h1>
            <p className="text-gray-600 mb-6">The track you're looking for doesn't exist or has been removed.</p>
            <Link href="/tracks">
              <Button>Back to Tracks</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${track.name} - MXRaceHub`}</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tracks">
            <Button variant="ghost" className="mb-6 flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to All Tracks
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-secondary mb-2">{track.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{track.location}</span>
                </div>

                <div className="relative rounded-lg overflow-hidden h-64 mb-6">
                  <img
                    src={track.imageUrl || "https://images.unsplash.com/photo-1574519840333-9b945d58ed0c"}
                    alt={track.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-1 px-3 rounded-br-lg font-medium">
                    <Badge variant="secondary">{track.type}</Badge>
                  </div>
                </div>

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="races">Races</TabsTrigger>
                    <TabsTrigger value="layout">Track Layout</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Info className="h-5 w-5 mr-2" /> Track Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Venue Details</h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Type</Badge>
                                <span>{track.type}</span>
                              </li>
                              {track.capacity && (
                                <li className="flex items-start">
                                  <Badge variant="outline" className="mr-2">Capacity</Badge>
                                  <span>{track.capacity.toLocaleString()} spectators</span>
                                </li>
                              )}
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Surface</Badge>
                                <span>{track.type === "Supercross" ? "Dirt/Clay Mix" : "Natural Terrain"}</span>
                              </li>
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Length</Badge>
                                <span>{track.type === "Supercross" ? "450m - 550m" : "1.5km - 2.5km"}</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Track Features</h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {track.type === "Supercross" ? "Technical rhythm sections" : "Natural elevation changes"}
                              </li>
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {track.type === "Supercross" ? "Multiple whoop sections" : "Fast flowing sections"}
                              </li>
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {track.type === "Supercross" ? "Challenging triple jumps" : "Multiple line options"}
                              </li>
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {track.type === "Supercross" ? "High-visibility for spectators" : "Rough terrain and ruts"}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-gray-600">
                            {track.description || `This ${track.type} track at ${track.name} in ${track.location} offers riders and fans an exciting racing experience. The venue is known for its challenging layout and great atmosphere during race weekends.`}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="races">
                    <Card>
                      <CardHeader>
                        <CardTitle>Events at This Track</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isRacesLoading ? (
                          <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                              <Skeleton key={i} className="h-24 w-full" />
                            ))}
                          </div>
                        ) : trackRaces && trackRaces.length > 0 ? (
                          <div className="space-y-4">
                            {trackRaces.map((race) => (
                              <div key={race.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all">
                                <div>
                                  <h3 className="font-medium">{race.name}</h3>
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{format(new Date(race.date), "MMMM d, yyyy")}</span>
                                    <Clock className="h-3 w-3 ml-3 mr-1" />
                                    <span>{format(new Date(race.date), "h:mm a")}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{race.type}</Badge>
                                  <Link href={`/races/${race.id}`}>
                                    <Button variant="outline" size="sm">View Race</Button>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">No scheduled races at this track.</p>
                            <Link href="/races">
                              <Button variant="outline">View All Races</Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="layout">
                    <Card>
                      <CardHeader>
                        <CardTitle>Track Layout</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                          <svg className="w-full h-64 mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            {track.type === "Supercross" ? (
                              // Stylized Supercross track layout
                              <>
                                <path d="M200,100 C250,80 300,150 350,100 C400,50 450,120 500,100 C550,80 600,150 650,100 C700,50 750,120 600,200 C450,280 300,150 250,200 C200,250 150,200 200,100 Z" fill="none" stroke="#E63946" strokeWidth="8" strokeLinecap="round" />
                                <circle cx="200" cy="100" r="15" fill="#1D3557" />
                                <text x="200" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
                                <text x="250" y="180" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Triple Jump</text>
                                <text x="450" y="240" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Whoops</text>
                                <text x="600" y="150" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Rhythm Section</text>
                              </>
                            ) : (
                              // Stylized Motocross track layout
                              <>
                                <path d="M100,100 C150,50 200,200 300,150 C400,100 500,300 600,250 C700,200 750,100 700,300 C650,400 350,350 250,300 C150,250 50,150 100,100 Z" fill="none" stroke="#E63946" strokeWidth="8" strokeLinecap="round" />
                                <circle cx="100" cy="100" r="15" fill="#1D3557" />
                                <text x="100" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
                                <text x="200" y="130" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Hill Climb</text>
                                <text x="500" y="270" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Jump Section</text>
                                <text x="650" y="340" textAnchor="middle" fill="#1D3557" fontSize="14" fontWeight="bold">Rutted Corner</text>
                              </>
                            )}
                          </svg>
                          <p className="text-gray-600 mt-4 italic">Stylized representation - not to scale</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader className="bg-secondary text-white">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 relative">
                    {/* Map placeholder - in a real app, this would be an actual map component */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="text-center text-gray-600 mb-2">Map view would be displayed here</p>
                      <p className="text-center font-medium">{track.location}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Directions</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {track.name} is located in {track.location}. Detailed directions and parking information will be provided for each event.
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {trackRaces && trackRaces.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" /> Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackRaces
                        .filter(race => new Date(race.date) >= new Date())
                        .slice(0, 3)
                        .map((race) => (
                          <div key={race.id} className="border-l-4 border-primary pl-4 py-2">
                            <Link href={`/races/${race.id}`}>
                              <p className="font-medium hover:text-primary transition-colors">{race.name}</p>
                            </Link>
                            <p className="text-sm text-gray-600">{format(new Date(race.date), "MMMM d, yyyy")}</p>
                          </div>
                        ))}
                      {trackRaces.filter(race => new Date(race.date) >= new Date()).length === 0 && (
                        <p className="text-gray-600 text-center py-2">No upcoming events scheduled</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {trackRaces && trackRaces.length > 0 && (
                  <Link href={`/betting?track=${track.id}`}>
                    <Button className="w-full flex items-center" variant="destructive">
                      <Trophy className="mr-2 h-5 w-5" /> Place a Bet on Events
                    </Button>
                  </Link>
                )}
                <Link href="/tracks">
                  <Button variant="outline" className="w-full">
                    View All Tracks
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TrackDetailsPage;
