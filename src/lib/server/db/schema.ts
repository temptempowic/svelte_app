import { mysqlTable, int, varchar, decimal, datetime, mysqlEnum, boolean, text, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// 1. BETTER AUTH TABLES (Required for authentication)
export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().default(false),
  image: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow().onUpdateNow(),
  
  // Custom Auction Fields
  role: varchar({ length: 20 }).default('buyer'), // buyer, seller, admin
  balance: decimal('10, 2').default('0.00')
});

export const sessions = mysqlTable('sessions', {
  id: int().primaryKey().autoincrement(),
  expiresAt: timestamp().notNull(),
  ipAddress: varchar({ length: 255 }),
  userAgent: varchar({ length: 255 }),
  userId: int().notNull().references(() => users.id, { onDelete: 'cascade' })
});

export const accounts = mysqlTable('accounts', {
  id: int().primaryKey().autoincrement(),
  accountId: varchar({ length: 255 }).notNull(),
  providerId: varchar({ length: 255 }).notNull(),
  userId: int().notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: varchar({ length: 255 }),
  refreshToken: varchar({ length: 255 }),
  expiresAt: timestamp(),
  // ... add other fields if needed
});

export const verificationTokens = mysqlTable('verification_tokens', {
  id: int().primaryKey().autoincrement(),
  identifier: varchar({ length: 255 }).notNull(),
  token: varchar({ length: 255 }).notNull(),
  expiresAt: timestamp().notNull()
});

// 2. AUCTION APP TABLES
export const languages = mysqlTable('languages', {
  id: int().primaryKey().autoincrement(),
  code: varchar({ length: 5 }).notNull().unique(), // 'en', 'ru', etc.
  name: varchar({ length: 50 }).notNull(),
  isDefault: boolean().default(false),
  direction: varchar({ length: 3 }).default('ltr')
});

export const categories = mysqlTable('categories', {
  id: int().primaryKey().autoincrement(),
  slug: varchar({ length: 100 }).notNull().unique(),
  parentId: int().references(() => categories.id, { onDelete: 'set null' })
});

export const categoryTranslations = mysqlTable('category_translations', {
  id: int().primaryKey().autoincrement(),
  categoryId: int().notNull().references(() => categories.id, { onDelete: 'cascade' }),
  languageId: int().notNull().references(() => languages.id, { onDelete: 'cascade' }),
  name: varchar({ length: 255 }).notNull()
});

export const auctions = mysqlTable('auctions', {
  id: int().primaryKey().autoincrement(),
  sellerId: int().notNull().references(() => users.id),
  categoryId: int().notNull().references(() => categories.id),
  startPrice: decimal('10, 2').notNull(),
  currentPrice: decimal('10, 2').notNull(),
  currency: varchar({ length: 3 }).default('USD'),
  imageUrl: varchar({ length: 500 }),
  startTime: timestamp().defaultNow(),
  // Using datetime to avoid the MySQL error
  endTime: datetime().notNull(), 
  status: mysqlEnum('status', ['pending', 'active', 'closed', 'sold']).default('active')
});

export const auctionTranslations = mysqlTable('auction_translations', {
  id: int().primaryKey().autoincrement(),
  auctionId: int().notNull().references(() => auctions.id, { onDelete: 'cascade' }),
  languageId: int().notNull().references(() => languages.id, { onDelete: 'cascade' }),
  title: varchar({ length: 255 }).notNull(),
  description: text()
});

export const bids = mysqlTable('bids', {
  id: int().primaryKey().autoincrement(),
  auctionId: int().notNull().references(() => auctions.id),
  userId: int().notNull().references(() => users.id),
  amount: decimal('10, 2').notNull(),
  createdAt: timestamp().defaultNow()
});

// 3. RELATIONS (Useful for Drizzle ORM joins)
export const auctionRelations = relations(auctions, ({ one, many }) => ({
  seller: one(users, {
    fields: [auctions.sellerId],
    references: [users.id]
  }),
  bids: many(bids)
}));