import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Helmet } from "react-helmet";
import { Race, Rider } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users, Trophy, Info, Calendar, Clock, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

const RaceDetailsPage = () => {
  const { id } = useParams();
  const raceId = parseInt(id || '1');

  const { data: race, isLoading: isRaceLoading } = useQuery<Race & { track?: any }>({
    queryKey: [`/api/races/${raceId}`],
  });

  const { data: riders, isLoading: isRidersLoading } = useQuery<Rider[]>({
    queryKey: ['/api/riders/featured'],
  });

  if (isRaceLoading) {
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
                <Skeleton className="h-64 w-full rounded-lg mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!race) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-secondary mb-4">Race Not Found</h1>
            <p className="text-gray-600 mb-6">The race you're looking for doesn't exist or has been removed.</p>
            <Link href="/races">
              <Button>Back to Races</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const raceDate = new Date(race.date);
  const isPastRace = raceDate < new Date();

  return (
    <>
      <Helmet>
        <title>{race.name} - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-secondary mb-2">{race.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{format(raceDate, "EEEE, MMMM d, yyyy")}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span>{format(raceDate, "h:mm a")}</span>
                </div>

                <div className="relative rounded-lg overflow-hidden h-64 mb-6">
                  <img
                    src={race.imageUrl || "https://images.unsplash.com/photo-1543104464-8900992f5efa"}
                    alt={race.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-1 px-3 rounded-br-lg font-medium">
                    <Badge variant={isPastRace ? "secondary" : "destructive"}>
                      {race.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="riders">Riders</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Info className="h-5 w-5 mr-2" /> Race Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium mb-2">Event Details</h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Type</Badge>
                                <span>{race.type}</span>
                              </li>
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Round</Badge>
                                <span>Round {Math.floor(Math.random() * 17) + 1}</span>
                              </li>
                              <li className="flex items-start">
                                <Badge variant="outline" className="mr-2">Status</Badge>
                                <span className="capitalize">{race.status}</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Venue Information</h3>
                            {race.track ? (
                              <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start">
                                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{race.track.name}, {race.track.location}</span>
                                </li>
                                {race.track.capacity && (
                                  <li className="flex items-start">
                                    <Users className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>Capacity: {race.track.capacity.toLocaleString()}</span>
                                  </li>
                                )}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                <MapPin className="h-4 w-4 mr-2 inline" />
                                Venue details unavailable
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className="text-gray-600">
                            {race.track?.description || `The ${race.name} is an exciting ${race.type} event that promises fans thrilling racing action and incredible competition. Be sure to catch all the action live!`}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="riders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Competing Riders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isRidersLoading ? (
                          <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                              <Skeleton key={i} className="h-12 w-full" />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {riders?.map((rider) => (
                              <div key={rider.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all">
                                <div className="flex items-center">
                                  <span className="font-racing bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                    {rider.number}
                                  </span>
                                  <div>
                                    <p className="font-medium">{rider.firstName} {rider.lastName}</p>
                                    <p className="text-sm text-gray-600">{rider.team}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">{rider.category}</Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <Card>
                      <CardHeader>
                        <CardTitle>Event Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-l-4 border-primary pl-4 py-1">
                            <p className="font-medium">Friday</p>
                            <p className="text-sm text-gray-600">2:00 PM - 5:00 PM: Practice & Qualifying</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4 py-1">
                            <p className="font-medium">Saturday</p>
                            <p className="text-sm text-gray-600">12:30 PM - 2:30 PM: Free Practice</p>
                            <p className="text-sm text-gray-600">3:00 PM - 4:30 PM: Qualifying Sessions</p>
                          </div>
                          <div className="border-l-4 border-primary pl-4 py-1">
                            <p className="font-medium">Sunday</p>
                            <p className="text-sm text-gray-600">11:00 AM - 12:00 PM: Warm-up Sessions</p>
                            <p className="text-sm text-gray-600">1:00 PM - 2:30 PM: Heat Races</p>
                            <p className="text-sm text-gray-600">3:00 PM - 5:00 PM: Main Events</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">* Schedule subject to change</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader className="bg-secondary text-white">
                  <CardTitle>Countdown to Race</CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  {isPastRace ? (
                    <div className="text-center">
                      <h3 className="text-2xl font-racing text-primary mb-2">RACE COMPLETED</h3>
                      <p className="text-gray-600">This race has already taken place.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-gray-100 p-3 rounded">
                        <span className="block text-2xl font-racing">03</span>
                        <span className="text-xs uppercase text-gray-600">Days</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded">
                        <span className="block text-2xl font-racing">08</span>
                        <span className="text-xs uppercase text-gray-600">Hours</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded">
                        <span className="block text-2xl font-racing">45</span>
                        <span className="text-xs uppercase text-gray-600">Minutes</span>
                      </div>
                      <div className="bg-gray-100 p-3 rounded">
                        <span className="block text-2xl font-racing">22</span>
                        <span className="text-xs uppercase text-gray-600">Seconds</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-4">
                {!isPastRace && (
                  <>
                    <Link href={`/betting?race=${race.id}`}>
                      <Button className="w-full flex items-center" variant="destructive">
                        <Trophy className="mr-2 h-5 w-5" /> Place a Bet
                      </Button>
                    </Link>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 flex items-center">
                      <Play className="mr-2 h-5 w-5" /> Watch on Peacock
                    </Button>
                  </>
                )}
                <Link href={race.track ? `/tracks/${race.track.id}` : "/tracks"}>
                  <Button variant="outline" className="w-full flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> View Track Details
                  </Button>
                </Link>
                <Link href="/races">
                  <Button variant="outline" className="w-full flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Back to Race Calendar
                  </Button>
                </Link>
              </div>

              <div className="mt-6">
                <h3 className="font-heading font-bold text-lg mb-4">Race Betting Favorites</h3>
                {isRidersLoading ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  riders?.slice(0, 3).map((rider) => (
                    <div key={rider.id} className="flex justify-between items-center p-3 border border-gray-200 rounded mb-2 hover:border-primary transition-all">
                      <div className="flex items-center">
                        <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                        <span>{rider.firstName} {rider.lastName}</span>
                      </div>
                      <span className="font-racing text-[#FFC107]">
                        +{Math.floor(200 + Math.random() * 300)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RaceDetailsPage;
