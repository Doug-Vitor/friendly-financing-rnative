CREATE TABLE `finances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`priceInCents` integer NOT NULL,
	`type` text NOT NULL,
	`createdAt` text NOT NULL,
	`expirationDate` text
);
