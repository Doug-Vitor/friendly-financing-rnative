CREATE TABLE `finances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`priceInCents` integer NOT NULL,
	`type` text NOT NULL,
	`createdAt` integer NOT NULL,
	`expirationDay` integer
);
