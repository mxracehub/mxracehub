import { pgTable, serial, varchar, text, boolean, timestamp, integer, numeric, decimal, json, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  balance: numeric("balance").default("100.00").notNull(),
  membershipType: varchar("membership_type", { length: 20 }).default("free").notNull(),
  membershipExpiresAt: timestamp("membership_expires_at"),
  friendGroupsCount: integer("friend_groups_count").default(0),
  hasActiveFriendBets: boolean("has_active_friend_bets").default(false),
  lastFriendBetAt: timestamp("last_friend_bet_at"),
  freeMembershipEligible: boolean("free_membership_eligible").default(true),
  avatarUrl: text("avatar_url"),
  walletAddress: varchar("wallet_address", { length: 100 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    usernameIdx: uniqueIndex("username_idx").on(table.username),
    emailIdx: uniqueIndex("email_idx").on(table.email),
  };
});

// Riders table
export const riders = pgTable("riders", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  number: integer("number").notNull(),
  teamId: integer("team_id").references(() => teams.id),
  manufacturer: varchar("manufacturer", { length: 50 }),
  division: varchar("division", { length: 10 }).notNull(), // 250 or 450
  country: varchar("country", { length: 50 }),
  hometown: varchar("hometown", { length: 100 }),
  height: varchar("height", { length: 20 }),
  weight: varchar("weight", { length: 20 }),
  bike: varchar("bike", { length: 50 }),
  imageUrl: text("image_url"),
  statistics: json("statistics"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    numberDivisionIdx: uniqueIndex("number_division_idx").on(table.number, table.division),
  };
});

// Teams table
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 50 }),
  color: varchar("color", { length: 7 }).default("#333333"), // hex color
  logoUrl: text("logo_url"),
  description: text("description"),
  founded: integer("founded"),
  championships: integer("championships").default(0),
  raceWins: integer("race_wins").default(0),
  website: varchar("website", { length: 255 }),
  statistics: json("statistics"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tracks table
export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // supercross, motocross
  length: numeric("length"), // in meters
  description: text("description"),
  imageUrl: text("image_url"),
  mapUrl: text("map_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Races table
export const races = pgTable("races", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  trackId: integer("track_id").notNull().references(() => tracks.id),
  date: timestamp("date").notNull(),
  division: varchar("division", { length: 10 }).notNull(), // 250 or 450
  type: varchar("type", { length: 20 }).notNull(), // main event, heat, qualifier
  status: varchar("status", { length: 20 }).default("upcoming").notNull(), // upcoming, live, completed
  results: json("results"),
  broadcastUrl: text("broadcast_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Friend bets table
export const friendBets = pgTable("friend_bets", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  targetId: integer("target_id").notNull().references(() => users.id),
  amount: numeric("amount").notNull(),
  betType: varchar("bet_type", { length: 50 }).notNull(), // race_winner, rider_position, etc.
  betDetails: json("bet_details").notNull(),
  odds: numeric("odds").default("1.0").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, accepted, declined, cancelled, completed
  expiresAt: timestamp("expires_at"),
  winningUserId: integer("winning_user_id").references(() => users.id),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Groups table
export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  ownerId: integer("owner_id").notNull().references(() => users.id),
  isPrivate: boolean("is_private").default(false).notNull(),
  inviteOnly: boolean("invite_only").default(true).notNull(),
  inviteCode: varchar("invite_code", { length: 20 }),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Group members table
export const groupMembers = pgTable("group_members", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => groups.id),
  userId: integer("user_id").notNull().references(() => users.id),
  role: varchar("role", { length: 20 }).default("member").notNull(), // owner, admin, member
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => {
  return {
    groupUserIdx: uniqueIndex("group_user_idx").on(table.groupId, table.userId),
  };
});

// Group bets table
export const groupBets = pgTable("group_bets", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => groups.id),
  creatorId: integer("creator_id").notNull().references(() => users.id),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  minAmount: numeric("min_amount").default("5.00").notNull(),
  maxAmount: numeric("max_amount").default("100.00").notNull(),
  expiresAt: timestamp("expires_at"),
  status: varchar("status", { length: 20 }).default("open").notNull(), // open, locked, completed
  winningOptionId: integer("winning_option_id"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Group bet options table
export const groupBetOptions = pgTable("group_bet_options", {
  id: serial("id").primaryKey(),
  betId: integer("bet_id").notNull().references(() => groupBets.id),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  odds: numeric("odds").default("1.0").notNull(),
});

// Group bet participations table
export const groupBetParticipations = pgTable("group_bet_participations", {
  id: serial("id").primaryKey(),
  betId: integer("bet_id").notNull().references(() => groupBets.id),
  userId: integer("user_id").notNull().references(() => users.id),
  optionId: integer("option_id").notNull().references(() => groupBetOptions.id),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    betUserIdx: uniqueIndex("bet_user_idx").on(table.betId, table.userId),
  };
});

// Friend connections table for automatic group creation
export const friendConnections = pgTable("friend_connections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  friendId: integer("friend_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, accepted, blocked
  autoGroupId: integer("auto_group_id").references(() => groups.id),
  lastBetTogether: timestamp("last_bet_together"),
  totalBetsTogether: integer("total_bets_together").default(0),
  freeMembershipActive: boolean("free_membership_active").default(false),
  freeMembershipStartedAt: timestamp("free_membership_started_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    userFriendIdx: uniqueIndex("user_friend_idx").on(table.userId, table.friendId),
  };
});

// Friend membership eligibility tracking
export const friendMembershipTracking = pgTable("friend_membership_tracking", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  friendId: integer("friend_id").notNull().references(() => users.id),
  groupId: integer("group_id").notNull().references(() => groups.id),
  activeBetsCount: integer("active_bets_count").default(0),
  membershipActive: boolean("membership_active").default(false),
  lastBetAt: timestamp("last_bet_at"),
  membershipStartedAt: timestamp("membership_started_at"),
  membershipExpiresAt: timestamp("membership_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    userFriendGroupIdx: uniqueIndex("user_friend_group_idx").on(table.userId, table.friendId, table.groupId),
  };
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(), // deposit, withdrawal, bet, membership
  amount: numeric("amount").notNull(),
  description: text("description"),
  referenceId: varchar("reference_id", { length: 100 }),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Memberships table
export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: varchar("type", { length: 20 }).notNull(), // monthly, annual
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  autoRenew: boolean("auto_renew").default(true).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // stripe, crypto
  paymentReference: varchar("payment_reference", { length: 100 }),
  status: varchar("status", { length: 20 }).default("active").notNull(), // active, cancelled, expired
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    userActiveIdx: uniqueIndex("user_active_idx").on(table.userId).where(table.status.eq("active")),
  };
});

// Bank accounts table
// Saved bet forms for autosave functionality
export const savedBetForms = pgTable("saved_bet_forms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  formType: varchar("form_type", { length: 50 }).notNull(),
  formData: text("form_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    userFormTypeIdx: uniqueIndex("user_form_type_idx").on(table.userId, table.formType),
  };
});

// Enhanced wallet and payment methods
export const bankAccounts = pgTable("bank_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  accountHolderName: varchar("account_holder_name", { length: 100 }).notNull(),
  accountNumber: varchar("account_number", { length: 255 }).notNull(), // Encrypted/masked account number
  routingNumber: varchar("routing_number", { length: 255 }).notNull(), // Encrypted/masked routing number
  accountType: varchar("account_type", { length: 20 }).notNull(), // checking, savings
  bankName: varchar("bank_name", { length: 100 }),
  isVerified: boolean("is_verified").default(false).notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cryptoWallets = pgTable("crypto_wallets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  walletName: varchar("wallet_name", { length: 100 }).notNull(),
  walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
  cryptocurrency: varchar("cryptocurrency", { length: 20 }).notNull(), // BTC, ETH, USDC, etc.
  network: varchar("network", { length: 50 }), // mainnet, polygon, etc.
  isVerified: boolean("is_verified").default(false).notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const walletTransactions = pgTable("wallet_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  transactionType: varchar("transaction_type", { length: 20 }).notNull(), // deposit, withdrawal, transfer
  method: varchar("method", { length: 20 }).notNull(), // bank, crypto, stripe, paypal
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, completed, failed, cancelled
  externalTransactionId: varchar("external_transaction_id", { length: 255 }),
  destinationDetails: json("destination_details"), // Bank account or crypto wallet details
  fees: decimal("fees", { precision: 10, scale: 2 }).default("0.00"),
  notes: text("notes"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: varchar("type", { length: 20 }).notNull(), // card, bank, crypto, paypal
  provider: varchar("provider", { length: 50 }).notNull(), // stripe, coinbase, etc.
  externalId: varchar("external_id", { length: 255 }), // Stripe payment method ID, etc.
  displayName: varchar("display_name", { length: 100 }).notNull(),
  lastFour: varchar("last_four", { length: 4 }), // Last 4 digits for cards/accounts
  isDefault: boolean("is_default").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  metadata: json("metadata"), // Additional provider-specific data
  expiresAt: timestamp("expires_at"), // For cards
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Achievement system tables
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 100 }).notNull(), // Icon name for display
  category: varchar("category", { length: 50 }).notNull(), // betting, community, predictions, milestones
  type: varchar("type", { length: 50 }).notNull(), // single, progressive, streak
  requirement: json("requirement").notNull(), // Conditions to unlock
  points: integer("points").notNull().default(0), // Points awarded
  rarity: varchar("rarity", { length: 20 }).notNull().default("common"), // common, rare, epic, legendary
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: json("progress"), // Current progress toward achievement
  isCompleted: boolean("is_completed").notNull().default(false),
  notificationSent: boolean("notification_sent").notNull().default(false),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  totalPoints: integer("total_points").notNull().default(0),
  level: integer("level").notNull().default(1),
  totalBets: integer("total_bets").notNull().default(0),
  wonBets: integer("won_bets").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).notNull().default("0.00"),
  racesAttended: integer("races_attended").notNull().default(0),
  predictionsCorrect: integer("predictions_correct").notNull().default(0),
  totalPredictions: integer("total_predictions").notNull().default(0),
  communityContributions: integer("community_contributions").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  activityType: varchar("activity_type", { length: 50 }).notNull(), // bet_placed, prediction_made, race_attended, etc.
  description: text("description").notNull(),
  metadata: json("metadata"), // Additional data about the activity
  pointsEarned: integer("points_earned").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relation definitions
export const usersRelations = relations(users, ({ many }) => ({
  createdBets: many(friendBets, { relationName: "creatorBets" }),
  receivedBets: many(friendBets, { relationName: "targetBets" }),
  ownedGroups: many(groups),
  groupMemberships: many(groupMembers),
  betParticipations: many(groupBetParticipations),
  transactions: many(transactions),
  memberships: many(memberships),
  bankAccounts: many(bankAccounts),
  savedForms: many(savedBetForms),
}));

// Teams relations
export const teamsRelations = relations(teams, ({ many }) => ({
  riders: many(riders),
}));

// Riders relations  
export const ridersRelations = relations(riders, ({ one }) => ({
  team: one(teams, {
    fields: [riders.teamId],
    references: [teams.id],
  }),
}));

export const tracksRelations = relations(tracks, ({ many }) => ({
  races: many(races),
}));

export const racesRelations = relations(races, ({ one }) => ({
  track: one(tracks, {
    fields: [races.trackId],
    references: [tracks.id],
  }),
}));

export const friendBetsRelations = relations(friendBets, ({ one }) => ({
  creator: one(users, {
    fields: [friendBets.creatorId],
    references: [users.id],
    relationName: "creatorBets",
  }),
  target: one(users, {
    fields: [friendBets.targetId],
    references: [users.id],
    relationName: "targetBets",
  }),
  winner: one(users, {
    fields: [friendBets.winningUserId],
    references: [users.id],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.ownerId],
    references: [users.id],
  }),
  members: many(groupMembers),
  bets: many(groupBets),
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

export const groupBetsRelations = relations(groupBets, ({ one, many }) => ({
  group: one(groups, {
    fields: [groupBets.groupId],
    references: [groups.id],
  }),
  creator: one(users, {
    fields: [groupBets.creatorId],
    references: [users.id],
  }),
  options: many(groupBetOptions),
  participations: many(groupBetParticipations),
}));

export const groupBetOptionsRelations = relations(groupBetOptions, ({ one, many }) => ({
  bet: one(groupBets, {
    fields: [groupBetOptions.betId],
    references: [groupBets.id],
  }),
  participations: many(groupBetParticipations),
}));

export const groupBetParticipationsRelations = relations(groupBetParticipations, ({ one }) => ({
  bet: one(groupBets, {
    fields: [groupBetParticipations.betId],
    references: [groupBets.id],
  }),
  user: one(users, {
    fields: [groupBetParticipations.userId],
    references: [users.id],
  }),
  option: one(groupBetOptions, {
    fields: [groupBetParticipations.optionId],
    references: [groupBetOptions.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
}));

export const bankAccountsRelations = relations(bankAccounts, ({ one }) => ({
  user: one(users, {
    fields: [bankAccounts.userId],
    references: [users.id],
  }),
}));

export const savedBetFormsRelations = relations(savedBetForms, ({ one }) => ({
  user: one(users, {
    fields: [savedBetForms.userId],
    references: [users.id],
  }),
}));

// Achievement system relations
export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));

export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, {
    fields: [activityLog.userId],
    references: [users.id],
  }),
}));

// Create schemas using drizzle-zod
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertRiderSchema = createInsertSchema(riders).omit({ id: true, createdAt: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true, createdAt: true });
export const insertTrackSchema = createInsertSchema(tracks).omit({ id: true, createdAt: true });
export const insertRaceSchema = createInsertSchema(races).omit({ id: true, createdAt: true });
export const insertFriendBetSchema = createInsertSchema(friendBets).omit({ id: true, createdAt: true, completedAt: true });
export const insertGroupSchema = createInsertSchema(groups).omit({ id: true, createdAt: true });
export const insertGroupMemberSchema = createInsertSchema(groupMembers).omit({ id: true, joinedAt: true });
export const insertGroupBetSchema = createInsertSchema(groupBets).omit({ id: true, createdAt: true, completedAt: true });
export const insertGroupBetOptionSchema = createInsertSchema(groupBetOptions).omit({ id: true });
export const insertGroupBetParticipationSchema = createInsertSchema(groupBetParticipations).omit({ id: true, createdAt: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export const insertMembershipSchema = createInsertSchema(memberships).omit({ id: true, createdAt: true });
export const insertBankAccountSchema = createInsertSchema(bankAccounts).omit({ id: true, createdAt: true, lastUsed: true });
export const insertSavedBetFormSchema = createInsertSchema(savedBetForms).omit({ id: true, createdAt: true, updatedAt: true });

// Achievement system schemas
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, createdAt: true });
export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({ id: true, unlockedAt: true });
export const insertUserStatsSchema = createInsertSchema(userStats).omit({ id: true, createdAt: true, updatedAt: true });
export const insertActivityLogSchema = createInsertSchema(activityLog).omit({ id: true, createdAt: true });

// Leaderboard and prediction schemas
export const insertWeeklyLeaderboardSchema = createInsertSchema(weeklyLeaderboards).omit({ id: true, createdAt: true });
export const insertSeasonalPredictionSchema = createInsertSchema(seasonalPredictions).omit({ id: true, createdAt: true, settledAt: true });
export const insertLeaderboardAchievementSchema = createInsertSchema(leaderboardAchievements).omit({ id: true, createdAt: true });

// Weekly Leaderboards table
export const weeklyLeaderboards = pgTable("weekly_leaderboards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  weekStart: timestamp("week_start").notNull(),
  weekEnd: timestamp("week_end").notNull(),
  totalBets: integer("total_bets").default(0).notNull(),
  totalWagered: numeric("total_wagered").default("0.00").notNull(),
  totalWon: numeric("total_won").default("0.00").notNull(),
  winRate: numeric("win_rate", { precision: 5, scale: 2 }).default("0.00").notNull(),
  profitLoss: numeric("profit_loss").default("0.00").notNull(),
  rank: integer("rank"),
  points: integer("points").default(0).notNull(),
  longestWinStreak: integer("longest_win_streak").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    userWeekIdx: uniqueIndex("user_week_idx").on(table.userId, table.weekStart),
  };
});

// Seasonal Championship Predictions table
export const seasonalPredictions = pgTable("seasonal_predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  season: varchar("season", { length: 20 }).notNull(), // e.g., "2025-SX", "2025-MX"
  division: varchar("division", { length: 10 }).notNull(), // 250 or 450
  championPrediction: integer("champion_prediction").references(() => riders.id).notNull(),
  topThreePredictions: json("top_three_predictions").notNull(), // Array of rider IDs
  rookieOfYearPrediction: integer("rookie_of_year_prediction").references(() => riders.id),
  wagerAmount: numeric("wager_amount").notNull(),
  odds: numeric("odds", { precision: 8, scale: 2 }).notNull(),
  potentialPayout: numeric("potential_payout").notNull(),
  status: varchar("status", { length: 20 }).default("active").notNull(), // active, won, lost
  isSettled: boolean("is_settled").default(false).notNull(),
  settledAt: timestamp("settled_at"),
  actualChampion: integer("actual_champion").references(() => riders.id),
  actualTopThree: json("actual_top_three"),
  actualRookieOfYear: integer("actual_rookie_of_year").references(() => riders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    userSeasonDivisionIdx: uniqueIndex("user_season_division_idx").on(table.userId, table.season, table.division),
  };
});

// Leaderboard Achievements table
export const leaderboardAchievements = pgTable("leaderboard_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  achievementType: varchar("achievement_type", { length: 50 }).notNull(), // weekly_champion, monthly_champion, season_prophet
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  badgeUrl: text("badge_url"),
  weekStart: timestamp("week_start"),
  weekEnd: timestamp("week_end"),
  season: varchar("season", { length: 20 }),
  metadata: json("metadata"), // Additional achievement data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Weekly Leaderboard relations
export const weeklyLeaderboardsRelations = relations(weeklyLeaderboards, ({ one }) => ({
  user: one(users, {
    fields: [weeklyLeaderboards.userId],
    references: [users.id],
  }),
}));

// Seasonal predictions relations
export const seasonalPredictionsRelations = relations(seasonalPredictions, ({ one }) => ({
  user: one(users, {
    fields: [seasonalPredictions.userId],
    references: [users.id],
  }),
  championRider: one(riders, {
    fields: [seasonalPredictions.championPrediction],
    references: [riders.id],
  }),
  rookieRider: one(riders, {
    fields: [seasonalPredictions.rookieOfYearPrediction],
    references: [riders.id],
  }),
  actualChampionRider: one(riders, {
    fields: [seasonalPredictions.actualChampion],
    references: [riders.id],
  }),
  actualRookieRider: one(riders, {
    fields: [seasonalPredictions.actualRookieOfYear],
    references: [riders.id],
  }),
}));

// Leaderboard achievements relations
export const leaderboardAchievementsRelations = relations(leaderboardAchievements, ({ one }) => ({
  user: one(users, {
    fields: [leaderboardAchievements.userId],
    references: [users.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Rider = typeof riders.$inferSelect;
export type InsertRider = z.infer<typeof insertRiderSchema>;

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type Track = typeof tracks.$inferSelect;
export type InsertTrack = z.infer<typeof insertTrackSchema>;

export type Race = typeof races.$inferSelect;
export type InsertRace = z.infer<typeof insertRaceSchema>;

export type FriendBet = typeof friendBets.$inferSelect;
export type InsertFriendBet = z.infer<typeof insertFriendBetSchema>;

export type Group = typeof groups.$inferSelect;
export type InsertGroup = z.infer<typeof insertGroupSchema>;

export type GroupMember = typeof groupMembers.$inferSelect;
export type InsertGroupMember = z.infer<typeof insertGroupMemberSchema>;

export type GroupBet = typeof groupBets.$inferSelect;
export type InsertGroupBet = z.infer<typeof insertGroupBetSchema>;

export type GroupBetOption = typeof groupBetOptions.$inferSelect;
export type InsertGroupBetOption = z.infer<typeof insertGroupBetOptionSchema>;

export type GroupBetParticipation = typeof groupBetParticipations.$inferSelect;
export type InsertGroupBetParticipation = z.infer<typeof insertGroupBetParticipationSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Membership = typeof memberships.$inferSelect;
export type InsertMembership = z.infer<typeof insertMembershipSchema>;

export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = z.infer<typeof insertBankAccountSchema>;

export type SavedBetForm = typeof savedBetForms.$inferSelect;
export type InsertSavedBetForm = z.infer<typeof insertSavedBetFormSchema>;

// Achievement system types
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;

export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;

// Leaderboard and prediction types
export type WeeklyLeaderboard = typeof weeklyLeaderboards.$inferSelect;
export type InsertWeeklyLeaderboard = z.infer<typeof insertWeeklyLeaderboardSchema>;

export type SeasonalPrediction = typeof seasonalPredictions.$inferSelect;
export type InsertSeasonalPrediction = z.infer<typeof insertSeasonalPredictionSchema>;

export type LeaderboardAchievement = typeof leaderboardAchievements.$inferSelect;
export type InsertLeaderboardAchievement = z.infer<typeof insertLeaderboardAchievementSchema>;