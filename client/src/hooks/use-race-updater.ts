
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Race } from '@shared/schema';
import { useEffect } from 'react';

export function useRaceUpdater() {
  const queryClient = useQueryClient();
  
  const { data: races, isLoading } = useQuery<Race[]>({
    queryKey: ['/api/races'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const nextRace = races?.find(race => new Date(race.date) > new Date());

  useEffect(() => {
    // Trigger server-side race data update
    const updateRaces = async () => {
      await fetch('/api/races/update', { method: 'POST' });
      queryClient.invalidateQueries({ queryKey: ['/api/races'] });
    };

    // Update races every hour
    const interval = setInterval(updateRaces, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [queryClient]);

  return { nextRace, races, isLoading };
}
