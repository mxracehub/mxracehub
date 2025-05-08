import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PlayCircle, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-secondary overflow-hidden" style={{ height: "600px" }}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1547447134-cd3f5c716030"
          alt="Supercross Stadium Event"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
          <span className="block">Live the Thrill.</span>
          <span className="block">
            Bet on the <span className="text-primary">Action.</span>
          </span>
        </h1>
        <p className="mt-4 text-xl text-gray-200 max-w-2xl">
          Your ultimate destination for Supercross & Motocross racing content, stats, and betting with friends.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button 
            variant="destructive" 
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Live
          </Button>
          <Link href="/betting">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-[#FFC107] text-secondary hover:bg-[#FFC107]/90"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Place a Bet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
