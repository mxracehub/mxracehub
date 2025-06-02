import { pgTable, serial, varchar, text, boolean, timestamp, integer, numeric, json, uniqueIndex } from "drizzle-orm/pg-core";
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
  team: varchar("team", { length: 100 }),
  manufacturer: varchar("manufacturer", { length: 50 }),
  division: varchar("division", { length: 10 }).notNull(), // 250 or 450
  country: varchar("country", { length: 50 }),
  imageUrl: text("image_url"),
  statistics: json("statistics"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    numberDivisionIdx: uniqueIndex("number_division_idx").on(table.number, table.division),
  };
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

// Relation definitions
export const usersRelations = relations(users, ({ many }) => ({
  createdBets: many(friendBets, { relationName: "creatorBets" }),
  receivedBets: many(friendBets, { relationName: "targetBets" }),
  ownedGroups: many(groups),
  groupMemberships: many(groupMembers),
  betParticipations: many(groupBetParticipations),
  transactions: many(transactions),
  memberships: many(memberships),
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

// Create schemas using drizzle-zod
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertRiderSchema = createInsertSchema(riders).omit({ id: true, createdAt: true });
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

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Rider = typeof riders.$inferSelect;
export type InsertRider = z.infer<typeof insertRiderSchema>;

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