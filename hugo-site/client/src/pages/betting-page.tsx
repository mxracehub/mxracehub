import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSearch, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Rider, Race, Bet } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Users, 
  ChevronRight, 
  AlertCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  DollarSign 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type BetType = "winner" | "podium" | "head_to_head";

interface BetInfo {
  raceId: number;
  groupId?: number;
  betType: BetType;
  amount: number;
  betDetails: {
    riderId?: number;
    riderIds?: number[];
    position?: string;
    winner?: number;
    loser?: number;
  };
}

const BettingPage = () => {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const raceIdParam = params.get("race");
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(
    raceIdParam ? parseInt(raceIdParam) : null
  );
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [activeBetType, setActiveBetType] = useState<BetType>("winner");
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selectedRider, setSelectedRider] = useState<number | null>(null);
  const [selectedPodiumRider, setSelectedPodiumRider] = useState<number | null>(null);
  const [isPodium, setIsPodium] = useState<boolean>(true);
  const [isPlacingBet, setIsPlacingBet] = useState<boolean>(false);
  const [headToHeadRiders, setHeadToHeadRiders] = useState<{ winner: number | null; loser: number | null }>({
    winner: null,
    loser: null,
  });

  // Fetch necessary data
  const { data: races, isLoading: isRacesLoading } = useQuery<Race[]>({
    queryKey: ['/api/races'],
  });

  const { data: riders, isLoading: isRidersLoading } = useQuery<Rider[]>({
    queryKey: ['/api/riders'],
  });

  const { data: groups, isLoading: isGroupsLoading } = useQuery<any[]>({
    queryKey: ['/api/betting-groups'],
    enabled: !!user,
  });

  const { data: userBets, isLoading: isUserBetsLoading, refetch: refetchUserBets } = useQuery<Bet[]>({
    queryKey: ['/api/bets/user'],
    enabled: !!user,
  });

  // Get selected race
  const selectedRace = races?.find(race => race.id === selectedRaceId);

  // Get selected group
  const selectedGroup = groups?.find(group => group.id === selectedGroupId);

  // Handle bet submission
  const placeBet = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "You need to login to place a bet.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedRaceId) {
      toast({
        title: "Race Selection Required",
        description: "Please select a race to bet on.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedGroupId) {
      toast({
        title: "Group Selection Required",
        description: "Please select a betting group.",
        variant: "destructive",
      });
      return;
    }

    const betInfo: BetInfo = {
      raceId: selectedRaceId,
      groupId: selectedGroupId,
      betType: activeBetType,
      amount: betAmount,
      betDetails: {},
    };

    // Add bet details based on bet type
    if (activeBetType === "winner" && selectedRider) {
      betInfo.betDetails = { riderId: selectedRider };
    } else if (activeBetType === "podium" && selectedPodiumRider) {
      betInfo.betDetails = { 
        riderId: selectedPodiumRider,
        position: isPodium ? "yes" : "no" 
      };
    } else if (activeBetType === "head_to_head" && headToHeadRiders.winner && headToHeadRiders.loser) {
      betInfo.betDetails = { 
        winner: headToHeadRiders.winner,
        loser: headToHeadRiders.loser
      };
    } else {
      toast({
        title: "Incomplete Bet",
        description: "Please complete all required fields for your bet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPlacingBet(true);
      await apiRequest("POST", "/api/bets", betInfo);
      
      toast({
        title: "Bet Placed Successfully",
        description: "Your bet has been recorded.",
        variant: "default",
      });
      
      // Reset form
      setSelectedRider(null);
      setSelectedPodiumRider(null);
      setIsPodium(true);
      setHeadToHeadRiders({ winner: null, loser: null });
      
      // Refresh user bets
      refetchUserBets();
    } catch (error) {
      toast({
        title: "Error Placing Bet",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPlacingBet(false);
    }
  };

  // If race ID was passed in URL, ensure a group is selected
  useEffect(() => {
    if (selectedRaceId && groups && groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0].id);
    }
  }, [selectedRaceId, groups, selectedGroupId]);

  return (
    <>
      <Helmet>
        <title>Betting - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">Betting Center</h1>
            <p className="text-gray-600">Place bets on upcoming races and compete with your friends</p>
          </div>

          {!user ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Login Required</CardTitle>
                <CardDescription>
                  You need to login to access the betting features
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <p className="text-gray-600 text-center mb-6">
                  Betting features are only available to registered users. Please login or create an account to place bets.
                </p>
                <Link href="/auth">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Login or Register
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Place a Bet</CardTitle>
                    <CardDescription>
                      Choose a race, betting group, and bet type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Race</label>
                          <Select 
                            value={selectedRaceId?.toString() || ""} 
                            onValueChange={(value) => setSelectedRaceId(parseInt(value))}
                            disabled={isRacesLoading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a race" />
                            </SelectTrigger>
                            <SelectContent>
                              {isRacesLoading ? (
                                <SelectItem value="loading" disabled>Loading races...</SelectItem>
                              ) : (
                                races
                                  ?.filter(race => new Date(race.date) > new Date())
                                  .map(race => (
                                    <SelectItem key={race.id} value={race.id.toString()}>
                                      {race.name} - {format(new Date(race.date), "MMM d, yyyy")}
                                    </SelectItem>
                                  ))
                              )}
                              {races && races.filter(race => new Date(race.date) > new Date()).length === 0 && (
                                <SelectItem value="none" disabled>No upcoming races</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Betting Group</label>
                          <Select 
                            value={selectedGroupId?.toString() || ""} 
                            onValueChange={(value) => setSelectedGroupId(parseInt(value))}
                            disabled={isGroupsLoading || !user}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a group" />
                            </SelectTrigger>
                            <SelectContent>
                              {isGroupsLoading ? (
                                <SelectItem value="loading" disabled>Loading groups...</SelectItem>
                              ) : (
                                groups?.map(group => (
                                  <SelectItem key={group.id} value={group.id.toString()}>
                                    {group.name}
                                  </SelectItem>
                                ))
                              )}
                              {groups && groups.length === 0 && (
                                <SelectItem value="none" disabled>No betting groups</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          {groups && groups.length === 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              <Link href="/groups" className="text-primary">
                                Create or join a betting group
                              </Link> to place bets
                            </p>
                          )}
                        </div>
                      </div>

                      {selectedRaceId && selectedGroupId && (
                        <>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Bet Type</label>
                            <Tabs value={activeBetType} onValueChange={(value) => setActiveBetType(value as BetType)}>
                              <TabsList className="grid grid-cols-3">
                                <TabsTrigger value="winner">Race Winner</TabsTrigger>
                                <TabsTrigger value="podium">Podium Finish</TabsTrigger>
                                <TabsTrigger value="head_to_head">Head to Head</TabsTrigger>
                              </TabsList>
                              <TabsContent value="winner" className="mt-4">
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-medium mb-3">Select Race Winner</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                                    {isRidersLoading ? (
                                      [...Array(6)].map((_, i) => (
                                        <Skeleton key={i} className="h-12 w-full" />
                                      ))
                                    ) : (
                                      riders?.map(rider => (
                                        <div 
                                          key={rider.id} 
                                          className={`flex justify-between items-center p-3 border ${selectedRider === rider.id ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded cursor-pointer hover:border-primary transition-all`}
                                          onClick={() => setSelectedRider(rider.id)}
                                        >
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
                              </TabsContent>
                              <TabsContent value="podium" className="mt-4">
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-medium mb-3">Select Rider for Podium Prediction</h3>
                                  <div className="mb-4">
                                    <div className="flex justify-center space-x-4 mb-4">
                                      <Button 
                                        variant={isPodium ? "default" : "outline"}
                                        onClick={() => setIsPodium(true)}
                                      >
                                        Will Podium
                                      </Button>
                                      <Button 
                                        variant={!isPodium ? "default" : "outline"}
                                        onClick={() => setIsPodium(false)}
                                      >
                                        Won't Podium
                                      </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                                      {isRidersLoading ? (
                                        [...Array(4)].map((_, i) => (
                                          <Skeleton key={i} className="h-12 w-full" />
                                        ))
                                      ) : (
                                        riders?.map(rider => (
                                          <div 
                                            key={rider.id} 
                                            className={`flex justify-between items-center p-3 border ${selectedPodiumRider === rider.id ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded cursor-pointer hover:border-primary transition-all`}
                                            onClick={() => setSelectedPodiumRider(rider.id)}
                                          >
                                            <div className="flex items-center">
                                              <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                                              <span>{rider.firstName} {rider.lastName}</span>
                                            </div>
                                            <div>
                                              <span className="font-racing text-green-600 mr-2">Yes +{Math.floor(150 + Math.random() * 100)}</span>
                                              <span className="font-racing text-red-600">No -{Math.floor(200 + Math.random() * 100)}</span>
                                            </div>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="head_to_head" className="mt-4">
                                <div className="border rounded-lg p-4">
                                  <h3 className="font-medium mb-3">Select Head to Head Matchup</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Pick Winner</label>
                                      <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {isRidersLoading ? (
                                          [...Array(3)].map((_, i) => (
                                            <Skeleton key={i} className="h-12 w-full" />
                                          ))
                                        ) : (
                                          riders?.map(rider => (
                                            <div 
                                              key={rider.id} 
                                              className={`flex items-center p-3 border ${headToHeadRiders.winner === rider.id ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded cursor-pointer hover:border-primary transition-all ${headToHeadRiders.loser === rider.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                              onClick={() => {
                                                if (headToHeadRiders.loser !== rider.id) {
                                                  setHeadToHeadRiders({...headToHeadRiders, winner: rider.id});
                                                }
                                              }}
                                            >
                                              <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                                              <span>{rider.firstName} {rider.lastName}</span>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Pick Loser</label>
                                      <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {isRidersLoading ? (
                                          [...Array(3)].map((_, i) => (
                                            <Skeleton key={i} className="h-12 w-full" />
                                          ))
                                        ) : (
                                          riders?.map(rider => (
                                            <div 
                                              key={rider.id} 
                                              className={`flex items-center p-3 border ${headToHeadRiders.loser === rider.id ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded cursor-pointer hover:border-primary transition-all ${headToHeadRiders.winner === rider.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                              onClick={() => {
                                                if (headToHeadRiders.winner !== rider.id) {
                                                  setHeadToHeadRiders({...headToHeadRiders, loser: rider.id});
                                                }
                                              }}
                                            >
                                              <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                                              <span>{rider.firstName} {rider.lastName}</span>
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Bet Amount</label>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
                              >
                                -
                              </Button>
                              <div className="flex-1 text-center border border-gray-200 rounded-md py-2 font-racing text-xl">
                                ${betAmount}
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(betAmount + 5)}
                              >
                                +
                              </Button>
                            </div>
                            <div className="flex justify-between mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(10)}
                              >
                                $10
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(25)}
                              >
                                $25
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(50)}
                              >
                                $50
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setBetAmount(100)}
                              >
                                $100
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div>
                      {selectedRace && (
                        <p className="text-sm text-gray-600">
                          Betting on: <span className="font-medium">{selectedRace.name}</span>
                        </p>
                      )}
                    </div>
                    <Button 
                      onClick={placeBet}
                      disabled={
                        isPlacingBet || 
                        !selectedRaceId || 
                        !selectedGroupId || 
                        (activeBetType === 'winner' && !selectedRider) ||
                        (activeBetType === 'podium' && !selectedPodiumRider) ||
                        (activeBetType === 'head_to_head' && (!headToHeadRiders.winner || !headToHeadRiders.loser))
                      }
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      {isPlacingBet ? "Placing Bet..." : "Place Bet"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Recent Bets</CardTitle>
                    <CardDescription>
                      Track your betting history and results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isUserBetsLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full" />
                        ))}
                      </div>
                    ) : userBets && userBets.length > 0 ? (
                      <div className="space-y-4">
                        {userBets.map((bet) => (
                          <div key={bet.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">
                                  {bet.betType === "winner" 
                                    ? "Race Winner" 
                                    : bet.betType === "podium" 
                                      ? "Podium Finish" 
                                      : "Head to Head"}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Race ID: {bet.raceId} | Group ID: {bet.groupId}
                                </p>
                              </div>
                              <Badge 
                                variant={
                                  bet.status === "won" 
                                    ? "success" 
                                    : bet.status === "lost" 
                                      ? "destructive" 
                                      : "outline"
                                }
                              >
                                {bet.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                                <span className="font-medium">${bet.amount}</span>
                              </div>
                              <span className="text-sm text-gray-600">
                                {format(new Date(bet.createdAt), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-2">You haven't placed any bets yet.</p>
                        <p className="text-sm text-gray-500">
                          Select a race and betting options above to get started.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader className="bg-secondary text-white">
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5" /> Betting Games
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-1">Race Winner</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Pick the rider you think will win the race.
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary px-0"
                          onClick={() => setActiveBetType("winner")}
                        >
                          Select <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-1">Podium Finish</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Bet on whether a rider will finish on the podium (top 3) or not.
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary px-0"
                          onClick={() => setActiveBetType("podium")}
                        >
                          Select <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-1">Head to Head</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Pick which rider will finish ahead of another rider.
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary px-0"
                          onClick={() => setActiveBetType("head_to_head")}
                        >
                          Select <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {selectedRace && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Race Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="font-heading font-bold text-lg">{selectedRace.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{format(new Date(selectedRace.date), "MMMM d, yyyy")}</span>
                          <Clock className="h-4 w-4 ml-4 mr-1" />
                          <span>{format(new Date(selectedRace.date), "h:mm a")}</span>
                        </div>
                        <div>
                          <Badge variant="secondary" className="mt-2">{selectedRace.type}</Badge>
                        </div>
                        <div className="pt-2">
                          <Link href={`/races/${selectedRace.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Race Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" /> Your Betting Groups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isGroupsLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : groups && groups.length > 0 ? (
                      <div className="space-y-3">
                        {groups.map((group) => (
                          <div key={group.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-primary transition-all">
                            <div>
                              <p className="font-medium">{group.name}</p>
                              <p className="text-xs text-gray-600">
                                {group.members ? `${group.members.length} members` : 'Members info unavailable'}
                              </p>
                            </div>
                            <Link href={`/groups?id=${group.id}`}>
                              <Button variant="ghost" size="sm">
                                View <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600 mb-4">You haven't joined any betting groups yet.</p>
                        <Link href="/groups">
                          <Button className="bg-secondary text-white hover:bg-secondary/90">
                            Join or Create a Group
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BettingPage;
