import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_profile_skill_categories_tools_icon_key" AS ENUM('looker', 'powerbi', 'pandas', 'matplotlib', 'numpy', 'seaborn', 'mysql', 'github', 'git', 'canva', 'figma', 'capcut', 'excel', 'python');
  CREATE TABLE "site_profile_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar DEFAULT '2024 - Now',
  	"institution" varchar DEFAULT 'Universitas Bina Sarana Informatika (UBSI)',
  	"major_and_gpa" varchar DEFAULT 'Information Systems • GPA 3.9'
  );
  
  CREATE TABLE "site_profile_skill_categories_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon_key" "enum_site_profile_skill_categories_tools_icon_key",
  	"custom_icon_id" integer
  );
  
  CREATE TABLE "site_profile_skill_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_name" varchar NOT NULL
  );
  
  CREATE TABLE "site_profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"greeting_badge" varchar DEFAULT 'Hello There! • Open for Data Analyst Internship',
  	"full_name" varchar DEFAULT 'Fahmi Ibadrurochman',
  	"headline" varchar DEFAULT 'Data Analyst & Educational Content Creator',
  	"bio_paragraph1" varchar DEFAULT 'I am an Information Systems undergraduate with a strong foundation in SQL database querying and data analytics, actively seeking an internship opportunity. I specialize in transforming raw datasets into actionable business insights through rigorous data cleaning and descriptive reporting.',
  	"bio_paragraph2" varchar DEFAULT 'To complement my technical abilities, I bring over two years of experience simplifying complex concepts as a Robotics Instructor and managing organizational communications. I am eager to bring this collaborative, data-driven mindset to a dynamic team and contribute to real-world data initiatives.',
  	"profile_photo_id" integer,
  	"contacts_linkedin_url" varchar,
  	"contacts_whatsapp_number" varchar,
  	"contacts_instagram_url" varchar DEFAULT 'https://instagram.com/artbyfahmi',
  	"contacts_youtube_url" varchar,
  	"contacts_tiktok_url" varchar DEFAULT 'https://tiktok.com/@fahmi.ibadruroch',
  	"contacts_github_url" varchar,
  	"contacts_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "site_profile_education" ADD CONSTRAINT "site_profile_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_profile_skill_categories_tools" ADD CONSTRAINT "site_profile_skill_categories_tools_custom_icon_id_media_id_fk" FOREIGN KEY ("custom_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_profile_skill_categories_tools" ADD CONSTRAINT "site_profile_skill_categories_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_profile_skill_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_profile_skill_categories" ADD CONSTRAINT "site_profile_skill_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_profile" ADD CONSTRAINT "site_profile_profile_photo_id_media_id_fk" FOREIGN KEY ("profile_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_profile_education_order_idx" ON "site_profile_education" USING btree ("_order");
  CREATE INDEX "site_profile_education_parent_id_idx" ON "site_profile_education" USING btree ("_parent_id");
  CREATE INDEX "site_profile_skill_categories_tools_order_idx" ON "site_profile_skill_categories_tools" USING btree ("_order");
  CREATE INDEX "site_profile_skill_categories_tools_parent_id_idx" ON "site_profile_skill_categories_tools" USING btree ("_parent_id");
  CREATE INDEX "site_profile_skill_categories_tools_custom_icon_idx" ON "site_profile_skill_categories_tools" USING btree ("custom_icon_id");
  CREATE INDEX "site_profile_skill_categories_order_idx" ON "site_profile_skill_categories" USING btree ("_order");
  CREATE INDEX "site_profile_skill_categories_parent_id_idx" ON "site_profile_skill_categories" USING btree ("_parent_id");
  CREATE INDEX "site_profile_profile_photo_idx" ON "site_profile" USING btree ("profile_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_profile_education" CASCADE;
  DROP TABLE "site_profile_skill_categories_tools" CASCADE;
  DROP TABLE "site_profile_skill_categories" CASCADE;
  DROP TABLE "site_profile" CASCADE;
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  DROP TYPE "public"."enum_site_profile_skill_categories_tools_icon_key";`)
}
