import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "wouter";
import { Rider } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const RidersPage = () => {
  const { data: riders, isLoading } = useQuery<Rider[]>({
    queryKey: ['/api/riders'],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRiders = riders?.filter((rider) => {
    const fullName = `${rider.firstName} ${rider.lastName}`.toLowerCase();
    const searchMatch = fullName.includes(searchTerm.toLowerCase()) || 
                        rider.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        rider.number.toString().includes(searchTerm);
    
    const categoryMatch = categoryFilter === "all" || rider.category === categoryFilter;
    
    return searchMatch && categoryMatch;
  });

  return (
    <>
      <Helmet>
        <title>Riders - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">Riders</h1>
            <p className="text-gray-600">Professional Supercross and Motocross athletes and their statistics</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search riders by name, number or team..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="450SX">450SX</TabsTrigger>
                <TabsTrigger value="250SX">250SX</TabsTrigger>
                <TabsTrigger value="450MX">450MX</TabsTrigger>
                <TabsTrigger value="250MX">250MX</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  {filteredRiders?.length || 0} riders found
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sort by Name
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort by Points
                  </Button>
                </div>
              </div>

              {filteredRiders?.length === 0 ? (
                <Card className="p-8 text-center">
                  <h3 className="font-heading font-bold text-xl mb-2">No riders found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredRiders?.map((rider) => (
                    <div key={rider.id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="relative h-56">
                        <img
                          src={rider.imageUrl || "https://images.unsplash.com/photo-1567012198945-c892f1c50812"}
                          alt={`${rider.firstName} ${rider.lastName}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <span className="font-racing text-4xl">{rider.number}</span>
                          <h3 className="font-heading font-bold text-xl">
                            {rider.firstName} {rider.lastName}
                          </h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-600">Team: {rider.team}</span>
                          <Badge variant="secondary">{rider.category}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center p-2 bg-gray-100 rounded shadow-sm">
                            <span className="block text-2xl font-racing text-primary">{rider.wins}</span>
                            <span className="text-xs uppercase text-gray-600">Wins</span>
                          </div>
                          <div className="text-center p-2 bg-gray-100 rounded shadow-sm">
                            <span className="block text-2xl font-racing text-primary">{rider.podiums}</span>
                            <span className="text-xs uppercase text-gray-600">Podiums</span>
                          </div>
                          <div className="text-center p-2 bg-gray-100 rounded shadow-sm">
                            <span className="block text-2xl font-racing text-primary">{rider.points}</span>
                            <span className="text-xs uppercase text-gray-600">Points</span>
                          </div>
                        </div>
                        <Link href={`/riders/${rider.id}`}>
                          <Button variant="secondary" className="w-full">
                            View Profile
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

export default RidersPage;
