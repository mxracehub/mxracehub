import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import Stripe from "stripe";
import crypto from "crypto";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users, friendBets, groups, groupBets, races, riders, tracks, transactions, memberships, bankAccounts } from "@shared/schema";

// Initialize Stripe if the API key is available
let stripe: Stripe | undefined;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
  });
  
  // Rider endpoints
  app.get("/api/riders", async (req, res) => {
    try {
      const division = req.query.division as string;
      let riderList;
      
      if (division) {
        riderList = await storage.getRidersByDivision(division);
      } else {
        riderList = await db.select().from(riders);
      }
      
      res.json(riderList);
    } catch (error) {
      console.error("Error fetching riders:", error);
      res.status(500).json({ message: "Failed to fetch riders" });
    }
  });
  
  app.get("/api/riders/:id", async (req, res) => {
    try {
      const riderId = parseInt(req.params.id);
      const rider = await storage.getRider(riderId);
      
      if (!rider) {
        return res.status(404).json({ message: "Rider not found" });
      }
      
      res.json(rider);
    } catch (error) {
      console.error("Error fetching rider:", error);
      res.status(500).json({ message: "Failed to fetch rider" });
    }
  });
  
  // Track endpoints
  app.get("/api/tracks", async (req, res) => {
    try {
      const trackList = await storage.getTracks();
      res.json(trackList);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).json({ message: "Failed to fetch tracks" });
    }
  });
  
  app.get("/api/tracks/:id", async (req, res) => {
    try {
      const trackId = parseInt(req.params.id);
      const track = await storage.getTrack(trackId);
      
      if (!track) {
        return res.status(404).json({ message: "Track not found" });
      }
      
      res.json(track);
    } catch (error) {
      console.error("Error fetching track:", error);
      res.status(500).json({ message: "Failed to fetch track" });
    }
  });
  
  // Race endpoints
  app.get("/api/races", async (req, res) => {
    try {
      const status = req.query.status as string;
      let raceList;
      
      if (status) {
        raceList = await storage.getRacesByStatus(status);
      } else {
        raceList = await db.select().from(races);
      }
      
      res.json(raceList);
    } catch (error) {
      console.error("Error fetching races:", error);
      res.status(500).json({ message: "Failed to fetch races" });
    }
  });
  
  app.get("/api/races/upcoming", async (req, res) => {
    try {
      const upcomingRaces = await storage.getUpcomingRaces();
      res.json(upcomingRaces);
    } catch (error) {
      console.error("Error fetching upcoming races:", error);
      res.status(500).json({ message: "Failed to fetch upcoming races" });
    }
  });
  
  app.get("/api/races/:id", async (req, res) => {
    try {
      const raceId = parseInt(req.params.id);
      const race = await storage.getRace(raceId);
      
      if (!race) {
        return res.status(404).json({ message: "Race not found" });
      }
      
      res.json(race);
    } catch (error) {
      console.error("Error fetching race:", error);
      res.status(500).json({ message: "Failed to fetch race" });
    }
  });
  
  // Friend bet endpoints
  app.get("/api/bets/friend", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      const status = req.query.status as string;
      
      let bets;
      if (status) {
        bets = await storage.getFriendBetsByStatus(userId, status);
      } else {
        const createdBets = await storage.getFriendBetsByCreator(userId);
        const receivedBets = await storage.getFriendBetsByTarget(userId);
        bets = [...createdBets, ...receivedBets];
      }
      
      res.json(bets);
    } catch (error) {
      console.error("Error fetching friend bets:", error);
      res.status(500).json({ message: "Failed to fetch friend bets" });
    }
  });
  
  app.post("/api/bets/friend", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const creatorId = req.user!.id;
      const { targetId, amount, betType, betDetails, odds, expiresAt } = req.body;
      
      // Validate required fields
      if (!targetId || !amount || !betType || !betDetails) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Check if user has sufficient balance
      const user = await storage.getUser(creatorId);
      if (!user || parseFloat(user.balance.toString()) < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      
      // Create the bet
      const bet = await storage.createFriendBet({
        creatorId,
        targetId,
        amount,
        betType,
        betDetails,
        odds: odds || 1.0,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        status: "pending",
      });
      
      res.status(201).json(bet);
    } catch (error) {
      console.error("Error creating friend bet:", error);
      res.status(500).json({ message: "Failed to create friend bet" });
    }
  });
  
  app.post("/api/bets/friend/:id/accept", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const betId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Fetch the bet
      const bet = await storage.getFriendBet(betId);
      if (!bet) {
        return res.status(404).json({ message: "Bet not found" });
      }
      
      // Verify the user is the target of the bet
      if (bet.targetId !== userId) {
        return res.status(403).json({ message: "Not authorized to accept this bet" });
      }
      
      // Verify the bet is in pending status
      if (bet.status !== "pending") {
        return res.status(400).json({ message: "This bet cannot be accepted" });
      }
      
      // Check if user has sufficient balance
      const user = await storage.getUser(userId);
      if (!user || parseFloat(user.balance.toString()) < parseFloat(bet.amount.toString())) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      
      // Update bet status
      const updatedBet = await storage.updateFriendBetStatus(betId, "accepted");
      
      res.json(updatedBet);
    } catch (error) {
      console.error("Error accepting friend bet:", error);
      res.status(500).json({ message: "Failed to accept friend bet" });
    }
  });
  
  app.post("/api/bets/friend/:id/decline", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const betId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Fetch the bet
      const bet = await storage.getFriendBet(betId);
      if (!bet) {
        return res.status(404).json({ message: "Bet not found" });
      }
      
      // Verify the user is the target of the bet
      if (bet.targetId !== userId) {
        return res.status(403).json({ message: "Not authorized to decline this bet" });
      }
      
      // Verify the bet is in pending status
      if (bet.status !== "pending") {
        return res.status(400).json({ message: "This bet cannot be declined" });
      }
      
      // Update bet status
      const updatedBet = await storage.updateFriendBetStatus(betId, "declined");
      
      res.json(updatedBet);
    } catch (error) {
      console.error("Error declining friend bet:", error);
      res.status(500).json({ message: "Failed to decline friend bet" });
    }
  });
  
  app.post("/api/bets/friend/:id/cancel", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const betId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Fetch the bet
      const bet = await storage.getFriendBet(betId);
      if (!bet) {
        return res.status(404).json({ message: "Bet not found" });
      }
      
      // Verify the user is the creator of the bet
      if (bet.creatorId !== userId) {
        return res.status(403).json({ message: "Not authorized to cancel this bet" });
      }
      
      // Verify the bet is in pending status
      if (bet.status !== "pending") {
        return res.status(400).json({ message: "This bet cannot be cancelled" });
      }
      
      // Update bet status
      const updatedBet = await storage.updateFriendBetStatus(betId, "cancelled");
      
      res.json(updatedBet);
    } catch (error) {
      console.error("Error cancelling friend bet:", error);
      res.status(500).json({ message: "Failed to cancel friend bet" });
    }
  });
  
  // Group endpoints
  app.get("/api/groups", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      const userGroups = await storage.getGroupsByMember(userId);
      res.json(userGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      res.status(500).json({ message: "Failed to fetch groups" });
    }
  });
  
  app.post("/api/groups", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const ownerId = req.user!.id;
      const { name, description, isPrivate, inviteOnly } = req.body;
      
      // Validate required fields
      if (!name) {
        return res.status(400).json({ message: "Group name is required" });
      }
      
      // Generate invite code for private or invite-only groups
      let inviteCode = null;
      if (isPrivate || inviteOnly) {
        inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      }
      
      // Create the group
      const group = await storage.createGroup({
        name,
        description,
        ownerId,
        isPrivate: isPrivate || false,
        inviteOnly: inviteOnly !== false, // Default to true
        inviteCode,
      });
      
      // Add owner as a member with "owner" role
      await storage.addGroupMember({
        groupId: group.id,
        userId: ownerId,
        role: "owner",
      });
      
      res.status(201).json(group);
    } catch (error) {
      console.error("Error creating group:", error);
      res.status(500).json({ message: "Failed to create group" });
    }
  });
  
  app.post("/api/groups/:id/join", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const groupId = parseInt(req.params.id);
      const userId = req.user!.id;
      const { inviteCode } = req.body;
      
      // Fetch the group
      const group = await storage.getGroup(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      // Check if already a member
      const members = await storage.getGroupMembers(groupId);
      const isMember = members.some(member => member.userId === userId);
      if (isMember) {
        return res.status(400).json({ message: "Already a member of this group" });
      }
      
      // Check if invitation is required
      if (group.inviteOnly && (!inviteCode || inviteCode !== group.inviteCode)) {
        return res.status(403).json({ message: "Valid invite code required to join this group" });
      }
      
      // Add as member
      const membership = await storage.addGroupMember({
        groupId,
        userId,
        role: "member",
      });
      
      res.status(201).json(membership);
    } catch (error) {
      console.error("Error joining group:", error);
      res.status(500).json({ message: "Failed to join group" });
    }
  });
  
  app.post("/api/groups/:id/leave", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const groupId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Fetch the group
      const group = await storage.getGroup(groupId);
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      // Check if user is the owner
      if (group.ownerId === userId) {
        return res.status(400).json({ message: "Group owner cannot leave the group" });
      }
      
      // Remove membership
      await storage.removeGroupMember(groupId, userId);
      
      res.status(200).json({ message: "Successfully left the group" });
    } catch (error) {
      console.error("Error leaving group:", error);
      res.status(500).json({ message: "Failed to leave group" });
    }
  });
  
  // Membership endpoints
  app.post("/api/membership", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      const { type, paymentMethod, paymentReference } = req.body;
      
      // Validate required fields
      if (!type || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Check if already has active membership
      const existingMembership = await storage.getUserMembership(userId);
      if (existingMembership) {
        return res.status(400).json({ message: "User already has an active membership" });
      }
      
      // Calculate end date
      const now = new Date();
      const endDate = new Date(now);
      if (type === "monthly") {
        endDate.setMonth(now.getMonth() + 1);
      } else if (type === "annual") {
        endDate.setFullYear(now.getFullYear() + 1);
      } else {
        return res.status(400).json({ message: "Invalid membership type" });
      }
      
      // Create membership
      const membership = await storage.createMembership({
        userId,
        type,
        startDate: now,
        endDate,
        autoRenew: true,
        paymentMethod,
        paymentReference,
        status: "active",
      });
      
      // Update user membership type
      await db
        .update(users)
        .set({
          membershipType: type,
          membershipExpiresAt: endDate
        })
        .where(eq(users.id, userId));
      
      // Create transaction record
      const amount = type === "monthly" ? 5.00 : 100.00;
      await storage.createTransaction({
        userId,
        type: "membership",
        amount,
        description: `${type} membership purchase`,
        referenceId: membership.id.toString(),
        status: "completed",
      });
      
      res.status(201).json(membership);
    } catch (error) {
      console.error("Error creating membership:", error);
      res.status(500).json({ message: "Failed to create membership" });
    }
  });
  
  app.post("/api/membership/cancel", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      
      // Get active membership
      const membership = await storage.getUserMembership(userId);
      if (!membership) {
        return res.status(404).json({ message: "No active membership found" });
      }
      
      // Cancel membership
      const cancelledMembership = await storage.cancelMembership(membership.id);
      
      res.json(cancelledMembership);
    } catch (error) {
      console.error("Error cancelling membership:", error);
      res.status(500).json({ message: "Failed to cancel membership" });
    }
  });
  
  // Bank account endpoints
  app.get("/api/bank-accounts", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const accounts = await storage.getUserBankAccounts(req.user!.id);
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ message: "Failed to fetch bank accounts" });
    }
  });

  app.get("/api/bank-accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountId = parseInt(req.params.id, 10);
    
    try {
      const account = await storage.getBankAccount(accountId);
      
      if (!account) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      
      // Security check - users can only access their own accounts
      if (account.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized access to bank account" });
      }
      
      res.json(account);
    } catch (error) {
      console.error("Error fetching bank account:", error);
      res.status(500).json({ message: "Failed to fetch bank account" });
    }
  });

  app.post("/api/bank-accounts", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { accountHolderName, accountNumber, routingNumber, accountType, bankName, isDefault = false } = req.body;
    
    if (!accountHolderName || !accountNumber || !routingNumber || !accountType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // In a production environment, you'd want to encrypt the accountNumber and routingNumber
      // before storing them in the database
      const newAccount = await storage.createBankAccount({
        userId: req.user!.id,
        accountHolderName,
        accountNumber,
        routingNumber,
        accountType,
        bankName,
        isDefault,
        isVerified: false // New accounts start as unverified
      });
      
      res.status(201).json(newAccount);
    } catch (error) {
      console.error("Error creating bank account:", error);
      res.status(500).json({ message: "Failed to create bank account" });
    }
  });

  app.put("/api/bank-accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountId = parseInt(req.params.id, 10);
    const { accountHolderName, bankName, isDefault } = req.body;
    
    // Only allow updating non-sensitive information
    const updates: any = {};
    if (accountHolderName !== undefined) updates.accountHolderName = accountHolderName;
    if (bankName !== undefined) updates.bankName = bankName;
    if (isDefault !== undefined) updates.isDefault = isDefault;
    
    try {
      // Check if the account exists and belongs to the user
      const existingAccount = await storage.getBankAccount(accountId);
      if (!existingAccount) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      
      if (existingAccount.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized access to bank account" });
      }
      
      const updatedAccount = await storage.updateBankAccount(accountId, updates);
      res.json(updatedAccount);
    } catch (error) {
      console.error("Error updating bank account:", error);
      res.status(500).json({ message: "Failed to update bank account" });
    }
  });

  app.delete("/api/bank-accounts/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountId = parseInt(req.params.id, 10);
    
    try {
      // Check if the account exists and belongs to the user
      const existingAccount = await storage.getBankAccount(accountId);
      if (!existingAccount) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      
      if (existingAccount.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized access to bank account" });
      }
      
      await storage.deleteBankAccount(accountId);
      res.sendStatus(204); // No content
    } catch (error) {
      console.error("Error deleting bank account:", error);
      res.status(500).json({ message: "Failed to delete bank account" });
    }
  });

  app.post("/api/bank-accounts/:id/set-default", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const accountId = parseInt(req.params.id, 10);
    
    try {
      // Check if the account exists and belongs to the user
      const existingAccount = await storage.getBankAccount(accountId);
      if (!existingAccount) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      
      if (existingAccount.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized access to bank account" });
      }
      
      const updatedAccount = await storage.setDefaultBankAccount(req.user!.id, accountId);
      res.json(updatedAccount);
    } catch (error) {
      console.error("Error setting default bank account:", error);
      res.status(500).json({ message: "Failed to set default bank account" });
    }
  });

  // Transaction endpoints
  app.get("/api/transactions", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      const userTransactions = await storage.getUserTransactions(userId);
      res.json(userTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  
  // Withdrawal endpoints
  app.post("/api/withdraw/bank", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      const { amount, accountId } = req.body;
      
      if (!amount || !accountId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      // Validate the amount
      if (amount < 10) {
        return res.status(400).json({ message: "Minimum withdrawal amount is $10" });
      }
      
      // Get user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if user has sufficient balance
      if (parseFloat(user.balance.toString()) < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      
      // Get bank account
      const account = await storage.getBankAccount(accountId);
      if (!account) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      
      // Verify ownership
      if (account.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized access to bank account" });
      }
      
      // Generate a reference ID for the withdrawal
      const referenceId = crypto.randomUUID();
      
      // Create transaction and update user balance
      const transaction = await storage.createTransaction({
        userId,
        amount: -amount, // Negative amount for withdrawal
        type: "bank_withdrawal",
        status: "processing",
        referenceId: referenceId,
        description: `Bank withdrawal to ${account.bankName || 'account'} ****${account.accountNumber.slice(-4)}`,
      });
      
      // Update user balance
      await db
        .update(users)
        .set({ 
          balance: parseFloat(user.balance.toString()) - amount,
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
      
      // Return success response
      res.status(201).json({
        success: true,
        transactionId: transaction.id,
        referenceId,
        status: "processing",
        amount,
        accountLast4: account.accountNumber.slice(-4),
        estimatedArrival: "1-3 business days"
      });
    } catch (error) {
      console.error("Error processing bank withdrawal:", error);
      res.status(500).json({ message: "Failed to process withdrawal" });
    }
  });
  
  app.get("/api/withdrawals", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      
      // Get all transactions
      const transactions = await storage.getUserTransactions(userId);
      
      // Filter to only include withdrawals
      const withdrawals = transactions.filter(tx => 
        tx.type.includes("withdrawal") && parseFloat(tx.amount.toString()) < 0
      );
      
      res.json(withdrawals);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      res.status(500).json({ message: "Failed to fetch withdrawals" });
    }
  });
  
  // Create HTTP server and attach Express app
  const httpServer = createServer(app);
  
  // Set up WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on("connection", (socket) => {
    console.log("WebSocket client connected");
    
    socket.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("Received message:", data);
        
        // Handle different message types
        if (data.type === "subscribe") {
          // Subscribe to updates for specific entities
          // Store subscription info in the socket object
          socket.on("close", () => {
            console.log("WebSocket client disconnected");
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    });
    
    // Send welcome message
    socket.send(JSON.stringify({ type: "welcome", message: "Connected to MXRaceHub WebSocket server" }));
  });
  
  // Stripe payment route (if Stripe is configured)
  if (stripe) {
    app.post("/api/create-payment-intent", async (req, res) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      try {
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
          return res.status(400).json({ message: "Invalid amount" });
        }
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Convert to cents
          currency: "usd",
          metadata: {
            userId: req.user!.id.toString(),
          },
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error: any) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: "Error creating payment intent: " + error.message });
      }
    });
    
    app.post('/api/get-or-create-subscription', async (req, res) => {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = req.user!;
      
      if (user.stripeSubscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
          
          res.send({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
          });
          
          return;
        } catch (error) {
          console.error("Error retrieving subscription:", error);
          // Continue to create new subscription if retrieval fails
        }
      }
      
      if (!user.email) {
        return res.status(400).json({ message: "No user email on file" });
      }
      
      try {
        // Create or retrieve Stripe customer
        let customerId = user.stripeCustomerId;
        
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: user.email,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
          });
          
          customerId = customer.id;
          await storage.updateStripeCustomerId(user.id, customerId);
        }
        
        if (!process.env.STRIPE_PRICE_ID) {
          return res.status(500).json({ message: "Stripe price ID not configured" });
        }
        
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{
            price: process.env.STRIPE_PRICE_ID,
          }],
          payment_behavior: 'default_incomplete',
          expand: ['latest_invoice.payment_intent'],
        });
        
        await storage.updateUserStripeInfo(user.id, {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id
        });
        
        res.send({
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        });
      } catch (error: any) {
        console.error("Error creating subscription:", error);
        return res.status(400).json({ error: { message: error.message } });
      }
    });
  }
  
  return httpServer;
}