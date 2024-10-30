import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).notNull(),
  image: text(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  expiresAt: integer({ mode: "timestamp" }),
  password: text(),
});

export const verification = sqliteTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
});
