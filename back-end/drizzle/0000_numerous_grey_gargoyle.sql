CREATE TABLE `assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category_id` int NOT NULL,
	`type_id` int NOT NULL,
	`serial_number` varchar(255) NOT NULL,
	`manufacturer_id` int,
	`model_id` int,
	`branch_id` int,
	`building_id` int,
	`floor_id` int,
	`room_id` int,
	`status` varchar(50) NOT NULL DEFAULT 'Available',
	`purchase_date` date,
	`warranty_expiry` date,
	`responsible_user_id` int,
	`assigned_user_id` int,
	`notes` varchar(1000),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assets_id` PRIMARY KEY(`id`),
	CONSTRAINT `assets_serial_number_unique` UNIQUE(`serial_number`)
);
--> statement-breakpoint
CREATE TABLE `branches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `branches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `buildings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`branch_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `buildings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cameras` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`camera_type` varchar(50) NOT NULL,
	`camera_style` varchar(50),
	`megapixels` varchar(50),
	`sensor` varchar(50),
	`lens` varchar(100),
	`field_of_view` varchar(50),
	`video_codec` varchar(50),
	`frame_rate` varchar(50),
	`infrared_range` varchar(100),
	`waterproof` boolean DEFAULT false,
	`power_supply` varchar(50),
	`ip_address` varchar(45),
	`mac_address` varchar(17),
	`nvr_integration` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cameras_id` PRIMARY KEY(`id`),
	CONSTRAINT `cameras_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `computers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`device_type` varchar(50) NOT NULL,
	`cpu` varchar(255),
	`ram` varchar(100),
	`storage` varchar(100),
	`storage_type` varchar(50),
	`gpu` varchar(255),
	`has_monitor` boolean DEFAULT false,
	`monitor_details` varchar(255),
	`operating_system` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `computers_id` PRIMARY KEY(`id`),
	CONSTRAINT `computers_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `floors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`building_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `floors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ip_phones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`phone_type` varchar(50) NOT NULL,
	`phone_system` varchar(100),
	`lines` int,
	`display_type` varchar(100),
	`screen_size` varchar(50),
	`speakers` int,
	`microphones` int,
	`has_video_support` boolean DEFAULT false,
	`codec` varchar(255),
	`power_supply` varchar(50),
	`ip_address` varchar(45),
	`extension_number` varchar(50),
	`registration_status` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ip_phones_id` PRIMARY KEY(`id`),
	CONSTRAINT `ip_phones_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `manufacturers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`website` varchar(255),
	`support_email` varchar(255),
	`support_phone` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `manufacturers_id` PRIMARY KEY(`id`),
	CONSTRAINT `manufacturers_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `models` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`manufacturer_id` int NOT NULL,
	`model_number` varchar(100),
	`description` text,
	`specifications` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `models_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `networking_devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`ip_address` varchar(45),
	`mac_address` varchar(17),
	`ports` int,
	`management_interface` varchar(255),
	`firmware_version` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `networking_devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `networking_devices_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `printers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`printer_type` varchar(50) NOT NULL,
	`print_technology` varchar(50),
	`color_capability` varchar(50),
	`max_print_speed` varchar(50),
	`resolution` varchar(50),
	`paper_size` varchar(100),
	`max_paper_capacity` varchar(50),
	`toner_cartridge_model` varchar(255),
	`networked` boolean DEFAULT false,
	`ip_address` varchar(45),
	`mac_address` varchar(17),
	`current_toner_level` varchar(50),
	`total_pages_printed` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `printers_id` PRIMARY KEY(`id`),
	CONSTRAINT `printers_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `priority` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `priority_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projectors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`projector_type` varchar(50) NOT NULL,
	`light_source` varchar(50),
	`brightness` varchar(100),
	`contrast` varchar(50),
	`resolution` varchar(50),
	`throw_ratio` varchar(50),
	`lens_type` varchar(50),
	`display_technology` varchar(50),
	`lamp_hours` int,
	`max_lamp_hours` int,
	`has_interactivity` boolean DEFAULT false,
	`connectivity_ports` varchar(255),
	`ip_address` varchar(45),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `projectors_id` PRIMARY KEY(`id`),
	CONSTRAINT `projectors_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `racks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`rack_type` varchar(50) NOT NULL,
	`rack_height` varchar(50) NOT NULL,
	`rack_width` varchar(50),
	`rack_depth` varchar(50),
	`max_load_capacity` varchar(100),
	`current_load_capacity` varchar(100),
	`power_distribution_units` int,
	`cooling_capacity` varchar(100),
	`number_of_vertical_rails` int,
	`has_caster` boolean DEFAULT false,
	`color` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `racks_id` PRIMARY KEY(`id`),
	CONSTRAINT `racks_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`floor_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100),
	`name` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(255),
	`role` varchar(20) NOT NULL DEFAULT 'user',
	`refresh_token` varchar(255),
	`is_verified` boolean DEFAULT false,
	`is_leader` boolean DEFAULT false,
	`team_id` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`leader_id` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_by` int NOT NULL,
	`assigned_to` int,
	`task_priority` int DEFAULT 2,
	`task_status` int DEFAULT 3,
	`created_at` timestamp DEFAULT (now()),
	`assigned_at` timestamp,
	`deadline` timestamp,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`category_id` int NOT NULL,
	`description` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `servers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`server_type` varchar(50) NOT NULL,
	`cpu` varchar(255),
	`cpu_cores` int,
	`ram` varchar(100),
	`storage_type` varchar(50),
	`storage_capacity` varchar(100),
	`power_supply` varchar(100),
	`os_type` varchar(100),
	`os_version` varchar(100),
	`ip_address` varchar(45),
	`dns_name` varchar(255),
	`virtualization_support` varchar(100),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `servers_id` PRIMARY KEY(`id`),
	CONSTRAINT `servers_asset_id_unique` UNIQUE(`asset_id`)
);
--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_type_id_types_id_fk` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_manufacturer_id_manufacturers_id_fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_model_id_models_id_fk` FOREIGN KEY (`model_id`) REFERENCES `models`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_branch_id_branches_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_building_id_buildings_id_fk` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_floor_id_floors_id_fk` FOREIGN KEY (`floor_id`) REFERENCES `floors`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_room_id_rooms_id_fk` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_responsible_user_id_users_id_fk` FOREIGN KEY (`responsible_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `assets` ADD CONSTRAINT `assets_assigned_user_id_users_id_fk` FOREIGN KEY (`assigned_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `buildings` ADD CONSTRAINT `buildings_branch_id_branches_id_fk` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cameras` ADD CONSTRAINT `cameras_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `computers` ADD CONSTRAINT `computers_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `floors` ADD CONSTRAINT `floors_building_id_buildings_id_fk` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ip_phones` ADD CONSTRAINT `ip_phones_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `models` ADD CONSTRAINT `models_manufacturer_id_manufacturers_id_fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `networking_devices` ADD CONSTRAINT `networking_devices_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `printers` ADD CONSTRAINT `printers_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projectors` ADD CONSTRAINT `projectors_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `racks` ADD CONSTRAINT `racks_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_floor_id_floors_id_fk` FOREIGN KEY (`floor_id`) REFERENCES `floors`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_team_id_teams_id_fk` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_assigned_to_users_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_task_priority_priority_id_fk` FOREIGN KEY (`task_priority`) REFERENCES `priority`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_task_status_status_id_fk` FOREIGN KEY (`task_status`) REFERENCES `status`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `types` ADD CONSTRAINT `types_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `servers` ADD CONSTRAINT `servers_asset_id_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON DELETE cascade ON UPDATE no action;