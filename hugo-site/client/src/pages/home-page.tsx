import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import NextRaceCountdown from "@/components/home/NextRaceCountdown";
import UpcomingRaces from "@/components/home/UpcomingRaces";
import FeaturedRiders from "@/components/home/FeaturedRiders";
import FeaturedTracks from "@/components/home/FeaturedTracks";
import BettingFeatures from "@/components/home/BettingFeatures";
import PaymentOptions from "@/components/home/PaymentOptions";
import LiveViewingFeatures from "@/components/home/LiveViewingFeatures";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MXRaceHub - Supercross & Motocross Racing</title>
        <meta name="description" content="Your ultimate destination for Supercross & Motocross racing content, stats, and betting with friends." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        <NextRaceCountdown />
        <UpcomingRaces />
        <FeaturedRiders />
        <FeaturedTracks />
        <BettingFeatures />
        <PaymentOptions />
        <LiveViewingFeatures />
      </main>
      
      <Footer />
    </>
  );
};

export default HomePage;
