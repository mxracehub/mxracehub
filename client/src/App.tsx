import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import RacesPage from "@/pages/races-page";
import RaceDetailsPage from "@/pages/race-details-page";
import RidersPage from "@/pages/riders-page";
import RiderDetailsPage from "@/pages/rider-details-page";
import TracksPage from "@/pages/tracks-page";
import TrackDetailsPage from "@/pages/track-details-page";
import BettingPage from "@/pages/betting-page";
import GroupsPage from "@/pages/groups-page";
import { ProtectedRoute } from "./lib/protected-route";
import { ThemeProvider } from "@/components/ui/theme-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/races" component={RacesPage} />
      <Route path="/races/:id" component={RaceDetailsPage} />
      <Route path="/riders" component={RidersPage} />
      <Route path="/riders/:id" component={RiderDetailsPage} />
      <Route path="/tracks" component={TracksPage} />
      <Route path="/tracks/:id" component={TrackDetailsPage} />
      <ProtectedRoute path="/betting" component={BettingPage} />
      <ProtectedRoute path="/groups" component={GroupsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="mxracehub-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
