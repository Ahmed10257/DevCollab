CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	"serial_number" varchar(255) NOT NULL,
	"model" varchar(255),
	"brand" varchar(255),
	"location_id" integer,
	"status" varchar(50) DEFAULT 'Available' NOT NULL,
	"purchase_date" date,
	"warranty_expiry" date,
	"responsible_user_id" integer,
	"assigned_user_id" integer,
	"notes" varchar(1000),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "assets_serial_number_unique" UNIQUE("serial_number")
);
--> statement-breakpoint
CREATE TABLE "computers" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" integer NOT NULL,
	"device_type" varchar(50) NOT NULL,
	"cpu" varchar(255),
	"ram" varchar(100),
	"storage" varchar(100),
	"storage_type" varchar(50),
	"gpu" varchar(255),
	"has_monitor" boolean DEFAULT false,
	"monitor_details" varchar(255),
	"operating_system" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "computers_asset_id_unique" UNIQUE("asset_id")
);
--> statement-breakpoint
CREATE TABLE "networking_devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" integer NOT NULL,
	"ip_address" varchar(45),
	"mac_address" varchar(17),
	"ports" integer,
	"management_interface" varchar(255),
	"firmware_version" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "networking_devices_asset_id_unique" UNIQUE("asset_id")
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_location_id_rooms_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_responsible_user_id_users_id_fk" FOREIGN KEY ("responsible_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_assigned_user_id_users_id_fk" FOREIGN KEY ("assigned_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "computers" ADD CONSTRAINT "computers_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "networking_devices" ADD CONSTRAINT "networking_devices_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE cascade ON UPDATE no action;