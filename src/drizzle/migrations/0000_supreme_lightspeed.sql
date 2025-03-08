CREATE TABLE `bills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text DEFAULT '',
	`priceInCents` integer DEFAULT 0 NOT NULL,
	`createdAt` integer NOT NULL,
	`expirationDay` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `incomes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text DEFAULT '',
	`priceInCents` integer DEFAULT 0 NOT NULL,
	`type` text NOT NULL,
	`createdAt` integer NOT NULL,
	`billId` integer,
	FOREIGN KEY (`billId`) REFERENCES `bills`(`id`) ON UPDATE no action ON DELETE no action
);
