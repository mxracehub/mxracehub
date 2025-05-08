import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Rider } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

const RiderCard = ({ rider }: { rider: Rider }) => {
  return (
    <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gray-100 rounded-lg overflow-hidden shadow-md">
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
          <Badge variant="success">{rider.category}</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-white rounded shadow-sm">
            <span className="block text-2xl font-racing text-primary">{rider.wins}</span>
            <span className="text-xs uppercase text-gray-600">Wins</span>
          </div>
          <div className="text-center p-2 bg-white rounded shadow-sm">
            <span className="block text-2xl font-racing text-primary">{rider.podiums}</span>
            <span className="text-xs uppercase text-gray-600">Podiums</span>
          </div>
          <div className="text-center p-2 bg-white rounded shadow-sm">
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
  );
};

const FeaturedRiders = () => {
  const { data: riders, isLoading } = useQuery<Rider[]>({
    queryKey: ['/api/riders/featured'],
  });

  if (isLoading) {
    return (
      <section id="riders" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-secondary">Featured Riders</h2>
            <p className="mt-2 text-gray-600">Loading rider information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="riders" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Featured Riders</h2>
          <p className="mt-2 text-gray-600">Stats and information on the top Supercross & Motocross athletes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riders?.map((rider) => (
            <RiderCard key={rider.id} rider={rider} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/riders">
            <Button variant="link" className="text-primary">
              View All Riders <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRiders;
