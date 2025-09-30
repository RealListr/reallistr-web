import { pgTable, serial, text, varchar, integer, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 20 }).$type<'admin'|'agent'|'viewer'>().default('agent'),
  name: varchar('name', { length: 120 }),
  handle: varchar('handle', { length: 80 }).unique(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow()
});

export const agents = pgTable('agents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  brandName: varchar('brand_name', { length: 160 }),
  phone: varchar('phone', { length: 60 }),
  bio: text('bio'),
  socials: jsonb('socials'),
  adPreferences: jsonb('ad_preferences'),
  createdAt: timestamp('created_at').defaultNow()
});

export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  agentId: integer('agent_id').notNull().references(() => agents.id),
  slug: varchar('slug', { length: 180 }).notNull().unique(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  listingType: varchar('listing_type', { length: 20 }).$type<'sale'|'rental'|'commercial'>().default('sale'),
  status: varchar('status', { length: 20 }).$type<'draft'|'published'|'hidden'>().default('draft'),
  price: numeric('price', { precision: 12, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('AUD'),
  address: varchar('address', { length: 240 }),
  suburb: varchar('suburb', { length: 120 }),
  state: varchar('state', { length: 80 }),
  postcode: varchar('postcode', { length: 16 }),
  geo: jsonb('geo'),
  beds: integer('beds'),
  baths: integer('baths'),
  cars: integer('cars'),
  buildingSize: integer('building_size'),
  landSize: integer('land_size'),
  features: jsonb('features'),
  tags: jsonb('tags'),
  seo: jsonb('seo'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => properties.id),
  type: varchar('type', { length: 16 }).$type<'image'|'video'|'podcast'|'doc'>().notNull(),
  provider: varchar('provider', { length: 16 }).$type<'images'|'stream'|'r2'>().notNull(),
  providerId: varchar('provider_id', { length: 160 }),
  url: text('url').notNull(),
  posterUrl: text('poster_url'),
  duration: integer('duration'),
  sort: integer('sort').default(0),
  altText: varchar('alt_text', { length: 200 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => properties.id),
  name: varchar('name', { length: 120 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 60 }),
  message: text('message'),
  source: varchar('source', { length: 60 }),
  createdAt: timestamp('created_at').defaultNow()
});
