
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { insertUserSchema } from "@shared/schema";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export function ProfileForm() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const { formData, setFormData, isSaving } = useFormAutosave('/api/user/profile', user);

  const form = useForm({
    defaultValues: formData,
    resolver: zodResolver(insertUserSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  async function onSubmit(data: any) {
    try {
      setFormData(data);
      await updateUser(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <TabsContent value="profile" className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-muted-foreground">
            Update your account profile information and preferences
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your first name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="your@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Choose a username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="min-w-[120px]"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
