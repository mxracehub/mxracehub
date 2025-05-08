import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Rider } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, ChevronLeft, BarChart2, UserCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const RiderStatsCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-600 text-sm">{title}</span>
      {icon}
    </div>
    <div className="text-3xl font-racing text-primary">{value}</div>
  </div>
);

const RiderDetailsPage = () => {
  const { id } = useParams();
  const riderId = parseInt(id);

  const { data: rider, isLoading, error } = useQuery<Rider>({
    queryKey: [`/api/riders/${riderId}`],
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Skeleton className="h-80 w-full mb-4 rounded-lg" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-40 w-full rounded-lg" />
              </div>
              <div className="lg:col-span-2">
                <Skeleton className="h-10 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
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

  if (error || !rider) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-heading font-bold text-secondary mb-4">Rider Not Found</h1>
            <p className="text-gray-600 mb-6">The rider you're looking for doesn't exist or has been removed.</p>
            <Link href="/riders">
              <Button>Back to Riders</Button>
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
        <title>{`${rider.firstName} ${rider.lastName} - MXRaceHub`}</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/riders">
            <Button variant="ghost" className="mb-6 flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to All Riders
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative aspect-[3/4]">
                  <img
                    src={rider.imageUrl || "https://images.unsplash.com/photo-1567012198945-c892f1c50812"}
                    alt={`${rider.firstName} ${rider.lastName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-1 px-3 rounded-br-lg">
                    <span className="font-racing"># {rider.number}</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <Button className="w-full bg-[#FFC107] text-secondary hover:bg-[#FFC107]/90 mb-4">
                    <Trophy className="mr-2 h-4 w-4" /> Bet on This Rider
                  </Button>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">Career Highlights</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex justify-between">
                        <span>Championships:</span>
                        <span className="font-medium">{Math.floor(Math.random() * 3)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Career Wins:</span>
                        <span className="font-medium">{rider.wins + Math.floor(Math.random() * 10)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Career Podiums:</span>
                        <span className="font-medium">{rider.podiums + Math.floor(Math.random() * 15)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Best Season Finish:</span>
                        <span className="font-medium">{Math.floor(Math.random() * 5) + 1}st</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-secondary mb-2">
                  {rider.firstName} {rider.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="secondary">{rider.category}</Badge>
                  <span className="text-gray-600">Team: {rider.team}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <RiderStatsCard
                    title="Current Points"
                    value={rider.points}
                    icon={<BarChart2 className="h-5 w-5 text-primary" />}
                  />
                  <RiderStatsCard
                    title="Season Wins"
                    value={rider.wins}
                    icon={<Trophy className="h-5 w-5 text-primary" />}
                  />
                  <RiderStatsCard
                    title="Season Podiums"
                    value={rider.podiums}
                    icon={<Award className="h-5 w-5 text-primary" />}
                  />
                  <RiderStatsCard
                    title="Current Rank"
                    value={Math.floor(Math.random() * 10) + 1}
                    icon={<UserCircle className="h-5 w-5 text-primary" />}
                  />
                </div>

                <Tabs defaultValue="bio">
                  <TabsList className="mb-4">
                    <TabsTrigger value="bio">Biography</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bio">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <UserCircle className="mr-2 h-5 w-5" /> Rider Biography
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {rider.bio || `${rider.firstName} ${rider.lastName} is a professional motocross and supercross rider competing in the ${rider.category} class. Currently riding for ${rider.team}, ${rider.firstName} has established themselves as one of the top competitors in the sport with ${rider.wins} wins and ${rider.podiums} podium finishes this season.`}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h3 className="font-medium mb-2">Personal Info</h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex justify-between">
                                <span>Age:</span>
                                <span>{Math.floor(Math.random() * 10) + 22}</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Height:</span>
                                <span>{Math.floor(Math.random() * 6) + 5}' {Math.floor(Math.random() * 11) + 1}"</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Weight:</span>
                                <span>{Math.floor(Math.random() * 30) + 150} lbs</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Hometown:</span>
                                <span>Somewhere, USA</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Bike Info</h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex justify-between">
                                <span>Bike:</span>
                                <span>{rider.team.includes("Kawasaki") ? "Kawasaki KX450" : 
                                      rider.team.includes("Honda") ? "Honda CRF450R" : 
                                      rider.team.includes("KTM") ? "KTM 450 SX-F" : 
                                      rider.team.includes("Yamaha") ? "Yamaha YZ450F" : 
                                      rider.team.includes("Suzuki") ? "Suzuki RM-Z450" : 
                                      rider.team.includes("Husqvarna") ? "Husqvarna FC 450" : 
                                      "450cc Motocross Bike"}</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Mechanic:</span>
                                <span>Professional Team Mechanic</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="stats">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart2 className="mr-2 h-5 w-5" /> Season Statistics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-3">Performance Metrics</h3>
                            <ul className="space-y-3">
                              <li>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Holeshots</span>
                                  <span className="text-sm font-medium">{Math.floor(Math.random() * 8) + 2}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(Math.floor(Math.random() * 8) + 2) * 10}%` }}></div>
                                </div>
                              </li>
                              <li>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Laps Led</span>
                                  <span className="text-sm font-medium">{Math.floor(Math.random() * 50) + 20}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(Math.floor(Math.random() * 50) + 20) / 100 * 100}%` }}></div>
                                </div>
                              </li>
                              <li>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Heat Wins</span>
                                  <span className="text-sm font-medium">{Math.floor(Math.random() * 6) + 1}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(Math.floor(Math.random() * 6) + 1) * 14}%` }}></div>
                                </div>
                              </li>
                              <li>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">Avg. Finish</span>
                                  <span className="text-sm font-medium">{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${100 - (Math.floor(Math.random() * 5) + 1) * 10}%` }}></div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-medium mb-3">Season Results</h3>
                            <div className="grid grid-cols-5 gap-2">
                              {[...Array(15)].map((_, i) => {
                                const position = Math.floor(Math.random() * 10) + 1;
                                let bgColor = "bg-gray-200";
                                if (position === 1) bgColor = "bg-[#FFD700]";
                                else if (position === 2) bgColor = "bg-[#C0C0C0]";
                                else if (position === 3) bgColor = "bg-[#CD7F32]";
                                else if (position <= 5) bgColor = "bg-green-200";
                                
                                return (
                                  <div key={i} className={`p-2 ${bgColor} text-center rounded`}>
                                    <div className="text-xs text-gray-600">Round {i+1}</div>
                                    <div className="font-racing text-xl">{position}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="results">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="mr-2 h-5 w-5" /> Recent Race Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[...Array(5)].map((_, i) => {
                            const position = Math.floor(Math.random() * 10) + 1;
                            let badgeVariant = "outline";
                            if (position === 1) badgeVariant = "destructive";
                            else if (position <= 3) badgeVariant = "secondary";
                            
                            return (
                              <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-all">
                                <div className="flex flex-wrap justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">Round {15 - i} - Race Location</h4>
                                    <p className="text-sm text-gray-600">2 weeks ago</p>
                                  </div>
                                  <Badge variant={badgeVariant as any} className="font-racing text-lg">
                                    P{position}
                                  </Badge>
                                </div>
                                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">Qualifying:</span> P{Math.floor(Math.random() * 10) + 1}
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">Heat:</span> P{Math.floor(Math.random() * 5) + 1}
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded">
                                    <span className="text-gray-600">Start:</span> P{Math.floor(Math.random() * 10) + 1}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RiderDetailsPage;
