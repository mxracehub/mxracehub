import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useSearch, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { generateInviteCode, getInitials } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Users,
  PlusCircle,
  Copy,
  Check,
  Trophy,
  UserPlus,
  Share2,
  CalendarDays,
  AlertCircle,
  Info,
} from "lucide-react";
import { format } from "date-fns";

const GroupsPage = () => {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const groupIdParam = params.get("id");
  const { user } = useAuth();
  const { toast } = useToast();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(
    groupIdParam ? parseInt(groupIdParam) : null
  );
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);

  // Fetch user's betting groups
  const {
    data: groups,
    isLoading: isGroupsLoading,
    refetch: refetchGroups,
  } = useQuery({
    queryKey: ["/api/betting-groups"],
    enabled: !!user,
  });

  // Fetch selected group details
  const { data: selectedGroup, isLoading: isSelectedGroupLoading } = useQuery({
    queryKey: [`/api/betting-groups/${selectedGroupId}`],
    enabled: !!selectedGroupId && !!user,
  });

  // Fetch user bets for the selected group
  const { data: groupBets, isLoading: isGroupBetsLoading } = useQuery({
    queryKey: [`/api/bets/group/${selectedGroupId}`],
    enabled: !!selectedGroupId && !!user,
  });

  // Create new group mutation
  const createGroupMutation = useMutation({
    mutationFn: async (groupData: {
      name: string;
      description: string;
      inviteCode: string;
    }) => {
      const res = await apiRequest("POST", "/api/betting-groups", groupData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Group Created",
        description: "Your betting group has been created successfully.",
      });
      setNewGroupName("");
      setNewGroupDescription("");
      refetchGroups();
    },
    onError: (error) => {
      toast({
        title: "Error Creating Group",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (inviteCode: string) => {
      const res = await apiRequest("POST", "/api/betting-groups/join", {
        inviteCode,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Group Joined",
        description: "You have successfully joined the betting group.",
      });
      setInviteCode("");
      refetchGroups();
    },
    onError: (error) => {
      toast({
        title: "Error Joining Group",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Update selected group when URL parameter changes
  useEffect(() => {
    if (groupIdParam) {
      setSelectedGroupId(parseInt(groupIdParam));
    }
  }, [groupIdParam]);

  // Handle creating a new group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Group Name Required",
        description: "Please enter a name for your betting group.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingGroup(true);
    const generatedInviteCode = generateInviteCode();
    
    createGroupMutation.mutate({
      name: newGroupName,
      description: newGroupDescription,
      inviteCode: generatedInviteCode,
    });
    
    setIsCreatingGroup(false);
  };

  // Handle joining a group
  const handleJoinGroup = () => {
    if (!inviteCode.trim()) {
      toast({
        title: "Invite Code Required",
        description: "Please enter an invite code to join a group.",
        variant: "destructive",
      });
      return;
    }

    setIsJoiningGroup(true);
    joinGroupMutation.mutate(inviteCode);
    setIsJoiningGroup(false);
  };

  // Handle copying invite code
  const handleCopyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast({
      title: "Copied to Clipboard",
      description: "Invite code has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Betting Groups - MXRaceHub</title>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary mb-2">
              Betting Groups
            </h1>
            <p className="text-gray-600">
              Create or join groups to bet on races with friends
            </p>
          </div>

          {!user ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Login Required</CardTitle>
                <CardDescription>
                  You need to login to access your betting groups
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <p className="text-gray-600 text-center mb-6">
                  Betting groups are only available to registered users. Please
                  login or create an account to access your groups.
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
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" /> Your Groups
                    </CardTitle>
                    <CardDescription>
                      Betting groups you've created or joined
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGroupsLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : groups && groups.length > 0 ? (
                      <div className="space-y-3">
                        {groups.map((group: any) => (
                          <div
                            key={group.id}
                            className={`flex justify-between items-center p-3 border rounded-lg hover:border-primary transition-all cursor-pointer ${
                              selectedGroupId === group.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-200"
                            }`}
                            onClick={() => setSelectedGroupId(group.id)}
                          >
                            <div className="flex items-center">
                              <Avatar className="mr-2 h-8 w-8">
                                <AvatarFallback className="bg-secondary text-white text-xs">
                                  {group.name
                                    .split(" ")
                                    .map((w: string) => w[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{group.name}</p>
                                <p className="text-xs text-gray-600">
                                  {group.ownerId === user.id
                                    ? "Owner"
                                    : "Member"}
                                </p>
                              </div>
                            </div>
                            {group.ownerId === user.id && (
                              <Badge
                                variant="secondary"
                                className="text-xs"
                              >
                                Owner
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600 mb-3">
                          You haven't joined any betting groups yet.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Create a new group or join an existing one using an
                          invite code.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary text-white hover:bg-primary/90">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Group
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Betting Group</DialogTitle>
                        <DialogDescription>
                          Create a group to bet on races with your friends
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input
                            id="group-name"
                            placeholder="Enter group name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-description">
                            Description (Optional)
                          </Label>
                          <Textarea
                            id="group-description"
                            placeholder="Describe your betting group"
                            value={newGroupDescription}
                            onChange={(e) =>
                              setNewGroupDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleCreateGroup}
                          disabled={isCreatingGroup || !newGroupName.trim()}
                        >
                          {isCreatingGroup ? "Creating..." : "Create Group"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> Join with Invite
                        Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join a Betting Group</DialogTitle>
                        <DialogDescription>
                          Enter an invite code to join an existing group
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="invite-code">Invite Code</Label>
                          <Input
                            id="invite-code"
                            placeholder="Enter invite code (e.g., ABCD1234)"
                            value={inviteCode}
                            onChange={(e) =>
                              setInviteCode(e.target.value.toUpperCase())
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleJoinGroup}
                          disabled={isJoiningGroup || !inviteCode.trim()}
                        >
                          {isJoiningGroup ? "Joining..." : "Join Group"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="lg:col-span-2">
                {selectedGroupId && selectedGroup ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedGroup.name}</CardTitle>
                          <CardDescription>
                            {selectedGroup.description ||
                              "No description provided"}
                          </CardDescription>
                        </div>
                        {selectedGroup.isOwner && (
                          <div className="flex items-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Share2 className="mr-2 h-4 w-4" /> Invite
                                  Members
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Invite Members</DialogTitle>
                                  <DialogDescription>
                                    Share this code with friends to let them join
                                    your group
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-6">
                                  <div className="relative">
                                    <Input
                                      readOnly
                                      value={selectedGroup.inviteCode}
                                      className="pr-12 text-center font-medium tracking-wider"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-1 top-1 h-8"
                                      onClick={() =>
                                        handleCopyInviteCode(
                                          selectedGroup.inviteCode
                                        )
                                      }
                                    >
                                      {copiedCode ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="members">
                        <TabsList className="mb-6">
                          <TabsTrigger value="members">Members</TabsTrigger>
                          <TabsTrigger value="bets">Group Bets</TabsTrigger>
                          <TabsTrigger value="leaderboard">
                            Leaderboard
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="members">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium">
                                Group Members (
                                {selectedGroup.members
                                  ? selectedGroup.members.length
                                  : 0}
                                )
                              </h3>
                              {selectedGroup.isOwner && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                >
                                  <UserPlus className="mr-2 h-3 w-3" /> Invite
                                </Button>
                              )}
                            </div>
                            {selectedGroup.members &&
                            selectedGroup.members.length > 0 ? (
                              <div className="divide-y">
                                {selectedGroup.members.map((member: any) => (
                                  <div
                                    key={member.id}
                                    className="flex justify-between items-center py-3"
                                  >
                                    <div className="flex items-center">
                                      <Avatar className="mr-3 h-10 w-10">
                                        <AvatarFallback className="bg-secondary text-white">
                                          {getInitials(
                                            member.firstName,
                                            member.lastName
                                          )}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">
                                          {member.firstName} {member.lastName}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          @{member.username}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      {selectedGroup.ownerId === member.id && (
                                        <Badge variant="outline">Owner</Badge>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Users className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-gray-600">
                                  No members in this group yet.
                                </p>
                                {selectedGroup.isOwner && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Share your invite code to add members.
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="bets">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                              Recent Group Bets
                            </h3>
                            {isGroupBetsLoading ? (
                              <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                  <Skeleton key={i} className="h-24 w-full" />
                                ))}
                              </div>
                            ) : groupBets && groupBets.length > 0 ? (
                              <div className="space-y-4">
                                {groupBets.map((bet: any) => (
                                  <div
                                    key={bet.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-all"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium">
                                          {bet.betType === "winner"
                                            ? "Race Winner"
                                            : bet.betType === "podium"
                                            ? "Podium Finish"
                                            : "Head to Head"}
                                        </h4>
                                        <div className="flex items-center text-sm text-gray-600">
                                          <CalendarDays className="h-3 w-3 mr-1" />
                                          <span>
                                            {format(
                                              new Date(bet.createdAt),
                                              "MMM d, yyyy"
                                            )}
                                          </span>
                                        </div>
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
                                        <Avatar className="h-6 w-6 mr-2">
                                          <AvatarFallback className="text-xs">
                                            {getInitials(
                                              bet.user?.firstName || "U",
                                              bet.user?.lastName || "S"
                                            )}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">
                                          {bet.user?.username || "User"}
                                        </span>
                                      </div>
                                      <span className="font-racing text-xl">
                                        ${bet.amount}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Trophy className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-gray-600">
                                  No bets have been placed in this group yet.
                                </p>
                                <Link href="/betting">
                                  <Button
                                    variant="link"
                                    className="mt-2 text-primary"
                                  >
                                    Place a bet now
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="leaderboard">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                              Group Leaderboard
                            </h3>
                            <div className="bg-secondary/5 rounded-lg p-4 mb-4">
                              <div className="flex items-start space-x-2">
                                <Info className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-600">
                                  Leaderboard shows member performance based on
                                  bet results. Members earn points for successful
                                  bets.
                                </p>
                              </div>
                            </div>
                            {selectedGroup.members &&
                            selectedGroup.members.length > 0 ? (
                              <div className="space-y-3">
                                {/* Generate mock leaderboard for UI display */}
                                {selectedGroup.members
                                  .map((member: any) => ({
                                    ...member,
                                    points: Math.floor(Math.random() * 300) + 50,
                                    winRate:
                                      Math.floor(Math.random() * 50) + 50,
                                  }))
                                  .sort((a: any, b: any) => b.points - a.points)
                                  .map((member: any, index: number) => (
                                    <div
                                      key={member.id}
                                      className={`flex items-center justify-between p-3 rounded-lg ${
                                        index === 0
                                          ? "bg-[#FFF7D6] border border-[#FFD700]"
                                          : index === 1
                                          ? "bg-[#F5F5F5] border border-[#C0C0C0]"
                                          : index === 2
                                          ? "bg-[#FFF1E6] border border-[#CD7F32]"
                                          : "bg-white border border-gray-200"
                                      }`}
                                    >
                                      <div className="flex items-center">
                                        <div
                                          className={`w-8 h-8 rounded-full flex items-center justify-center font-racing text-white mr-3 ${
                                            index === 0
                                              ? "bg-[#FFD700]"
                                              : index === 1
                                              ? "bg-[#C0C0C0]"
                                              : index === 2
                                              ? "bg-[#CD7F32]"
                                              : "bg-gray-500"
                                          }`}
                                        >
                                          {index + 1}
                                        </div>
                                        <div className="flex items-center">
                                          <Avatar className="h-8 w-8 mr-3">
                                            <AvatarFallback className="bg-secondary text-white text-xs">
                                              {getInitials(
                                                member.firstName,
                                                member.lastName
                                              )}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <p className="font-medium">
                                              {member.firstName}{" "}
                                              {member.lastName}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                              Win Rate: {member.winRate}%
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="font-racing text-2xl text-primary">
                                        {member.points}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Trophy className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-gray-600">
                                  No members in this group yet.
                                </p>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex flex-col justify-center items-center p-8">
                    <div className="text-center">
                      <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h2 className="text-xl font-heading font-bold text-secondary mb-2">
                        No Group Selected
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Select a group from the sidebar or create a new betting
                        group to get started with social betting.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-primary text-white hover:bg-primary/90">
                              <PlusCircle className="mr-2 h-4 w-4" /> Create New
                              Group
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Create a New Betting Group
                              </DialogTitle>
                              <DialogDescription>
                                Create a group to bet on races with your friends
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="group-name-modal">
                                  Group Name
                                </Label>
                                <Input
                                  id="group-name-modal"
                                  placeholder="Enter group name"
                                  value={newGroupName}
                                  onChange={(e) =>
                                    setNewGroupName(e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="group-description-modal">
                                  Description (Optional)
                                </Label>
                                <Textarea
                                  id="group-description-modal"
                                  placeholder="Describe your betting group"
                                  value={newGroupDescription}
                                  onChange={(e) =>
                                    setNewGroupDescription(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleCreateGroup}
                                disabled={
                                  isCreatingGroup || !newGroupName.trim()
                                }
                              >
                                {isCreatingGroup
                                  ? "Creating..."
                                  : "Create Group"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <UserPlus className="mr-2 h-4 w-4" /> Join with
                              Code
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Join a Betting Group</DialogTitle>
                              <DialogDescription>
                                Enter an invite code to join an existing group
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="invite-code-modal">
                                  Invite Code
                                </Label>
                                <Input
                                  id="invite-code-modal"
                                  placeholder="Enter invite code (e.g., ABCD1234)"
                                  value={inviteCode}
                                  onChange={(e) =>
                                    setInviteCode(e.target.value.toUpperCase())
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleJoinGroup}
                                disabled={isJoiningGroup || !inviteCode.trim()}
                              >
                                {isJoiningGroup ? "Joining..." : "Join Group"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GroupsPage;
