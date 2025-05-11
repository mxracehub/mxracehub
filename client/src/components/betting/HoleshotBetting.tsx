
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function HoleshotBetting({ race, riders }) {
  const { formData, setFormData, isSaving } = useFormAutosave('/api/bets/holeshot');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: formData || {
      raceId: race.id,
      betType: 'holeshot',
      riderId: '',
      amount: 10,
      odds: 0
    }
  });

  const onSubmit = async (data) => {
    try {
      await setFormData(data);
      toast({
        title: "Bet placed successfully",
        description: "Your holeshot bet has been saved"
      });
    } catch (error) {
      toast({
        title: "Error placing bet",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Holeshot Betting</CardTitle>
        <CardDescription>Place your bet on which rider will get the holeshot</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="riderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Rider for Holeshot</FormLabel>
              <FormControl>
                <select {...field} className="w-full p-2 border rounded-md bg-background">
                  <option value="">Select a rider</option>
                  {riders.map((rider) => (
                    <option key={rider.id} value={rider.id}>
                      {rider.number} - {rider.firstName} {rider.lastName}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bet Amount</FormLabel>
              <FormControl>
                <input 
                  type="number" 
                  {...field}
                  min={1}
                  className="w-full p-2 border rounded-md bg-background"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? "Saving..." : "Place Holeshot Bet"}
        </Button>
      </form>
        </Form>
      </CardContent>
    </Card>
  );
}
