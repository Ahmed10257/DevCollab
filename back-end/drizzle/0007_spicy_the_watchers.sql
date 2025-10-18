ALTER TABLE "assets" DROP CONSTRAINT "assets_location_id_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "building_id" integer;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "floor_id" integer;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "room_id" integer;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_floor_id_floors_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."floors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" DROP COLUMN "location_id";