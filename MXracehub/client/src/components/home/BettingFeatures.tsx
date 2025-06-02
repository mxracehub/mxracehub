import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Race, Rider } from "@shared/schema";
import { Users, Trophy, Bell } from "lucide-react";

const BettingFeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-secondary bg-opacity-40 p-6 rounded-lg border border-gray-600 hover:bg-opacity-50 transition-all">
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-bold text-center mb-2">{title}</h3>
      <p className="text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
};

const BettingFeatures = () => {
  const { data: nextRace } = useQuery<Race>({
    queryKey: ['/api/races/next'],
  });

  const { data: riders } = useQuery<Rider[]>({
    queryKey: ['/api/riders/featured'],
  });

  return (
    <section id="betting" className="py-12 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold">Bet With Friends</h2>
          <p className="mt-2 text-gray-300">Create groups, place bets, and compete with your friends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BettingFeatureCard
            icon={<Users className="h-6 w-6 text-white" />}
            title="Create Betting Groups"
            description="Invite friends and create private betting pools for your own Supercross & Motocross competitions."
          />
          <BettingFeatureCard
            icon={<Trophy className="h-6 w-6 text-white" />}
            title="Multiple Betting Games"
            description="Choose from race winners, podium predictions, head-to-head matchups, and more betting options."
          />
          <BettingFeatureCard
            icon={<Bell className="h-6 w-6 text-white" />}
            title="Live Notifications"
            description="Get real-time updates on races, betting results, and friend activities through our notification system."
          />
        </div>

        {nextRace && riders && (
          <div className="mt-16">
            <div className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-4 text-secondary">
                  Featured Betting Game: {nextRace.name}
                </h3>

                <div className="mb-6 border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-lg mb-2">Race Winner</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {riders.slice(0, 3).map((rider) => (
                      <div key={rider.id} className="flex justify-between items-center p-3 border border-gray-200 rounded hover:border-primary cursor-pointer transition-all">
                        <div className="flex items-center">
                          <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                          <span>{rider.firstName} {rider.lastName}</span>
                        </div>
                        <span className="font-racing text-[#FFC107]">
                          +{Math.floor(200 + Math.random() * 300)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Podium Finish (Yes/No)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {riders.slice(3, 5).map((rider) => (
                      <div key={rider.id} className="flex justify-between items-center p-3 border border-gray-200 rounded hover:border-primary cursor-pointer transition-all">
                        <div className="flex items-center">
                          <span className="font-racing text-xl text-primary mr-2">{rider.number}</span>
                          <span>{rider.firstName} {rider.lastName}</span>
                        </div>
                        <div>
                          <span className="font-racing text-green-600 mr-2">Yes +{Math.floor(150 + Math.random() * 100)}</span>
                          <span className="font-racing text-red-600">No -{Math.floor(200 + Math.random() * 100)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/betting">
                    <Button 
                      className="bg-[#FFC107] text-secondary hover:bg-[#FFC107]/90"
                    >
                      View All Betting Options
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BettingFeatures;
