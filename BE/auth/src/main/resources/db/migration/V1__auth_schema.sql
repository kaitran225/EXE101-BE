CREATE TABLE "users" (
  "user_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_sso" VARCHAR UNIQUE NOT NULL,
  "email" VARCHAR UNIQUE NOT NULL,
  "password_hash" VARCHAR,
  "full_name" VARCHAR,
  "avatar_url" TEXT,
  "plan_type" VARCHAR,
  "plan_expires_at" TIMESTAMP,
  "exp" INT,
  "level" INT,
  "streak" INT,
  "longest_streak" INT,
  "last_active_date" DATE,
  "metadata" JSONB,
  "status" VARCHAR,
  "email_verified" BOOLEAN NOT NULL,
  "system_role" VARCHAR NOT NULL,
  "business_role" VARCHAR NOT NULL,
  "is_admin" BOOLEAN,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "email_verifications" (
  "verification_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT,
  "email" VARCHAR NOT NULL,
  "verification_code" VARCHAR NOT NULL,
  "is_edu_email" BOOLEAN,
  "verified_at" TIMESTAMP,
  "expires_at" TIMESTAMP NOT NULL,
  "attempts" INT,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "oauth_accounts" (
  "oauth_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "provider" VARCHAR NOT NULL,
  "provider_uid" VARCHAR NOT NULL,
  "email" VARCHAR,
  "provider_data" JSONB,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "refresh_tokens" (
  "token_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "token_hash" VARCHAR NOT NULL,
  "device_info" TEXT,
  "expires_at" TIMESTAMP NOT NULL,
  "revoked" BOOLEAN,
  "revoked_at" TIMESTAMP,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "user_wallets" (
  "wallet_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT UNIQUE NOT NULL,
  "balance" INT,
  "bonus_balance" INT,
  "pending_balance" INT,
  "lifetime_earned" INT,
  "lifetime_spent" INT,
  "last_transaction_at" TIMESTAMP,
  "status" VARCHAR,
  "version" BIGINT,
  "metadata" JSONB,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "user_transactions" (
  "user_transaction_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "wallet_id" BIGINT NOT NULL,
  "amount" INT NOT NULL,
  "balance_after" INT NOT NULL,
  "type" VARCHAR NOT NULL,
  "reference_type" VARCHAR,
  "reference_id" VARCHAR,
  "description" TEXT,
  "metadata" JSONB,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "password_resets" (
  "reset_id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "reset_token_hash" VARCHAR UNIQUE NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "used_at" TIMESTAMP,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE TABLE "user_preferences" (
  "user_id" BIGINT PRIMARY KEY,
  "email_enabled" BOOLEAN,
  "push_enabled" BOOLEAN,
  "room_updates" BOOLEAN,
  "task_updates" BOOLEAN,
  "meeting_reminders" BOOLEAN,
  "quiz_reminders" BOOLEAN,
  "achievements" BOOLEAN,
  "marketing" BOOLEAN,
  "language" VARCHAR,
  "timezone" VARCHAR,
  "theme" VARCHAR,
  "settings_json" JSONB,
  "unlocked_features" JSONB,
  "created_at" TIMESTAMP,
  "created_by" VARCHAR,
  "updated_at" TIMESTAMP,
  "updated_by" VARCHAR
);

CREATE UNIQUE INDEX ON "oauth_accounts" ("provider", "provider_uid");

CREATE INDEX ON "user_transactions" ("user_id");
CREATE INDEX ON "user_transactions" ("wallet_id");

ALTER TABLE "oauth_accounts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "refresh_tokens" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "user_wallets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "user_transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "user_transactions" ADD FOREIGN KEY ("wallet_id") REFERENCES "user_wallets" ("wallet_id") ON DELETE CASCADE;

ALTER TABLE "user_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "password_resets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE;

ALTER TABLE "email_verifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE SET NULL;
