-- 1. Create companies table
CREATE TABLE IF NOT EXISTS "companies" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "address" VARCHAR,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;

-- 2. Create roles table
CREATE TABLE IF NOT EXISTS "roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "permissions" JSONB,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;

-- 3. Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "reset_password_token" VARCHAR,
    "blocked" BOOLEAN NOT NULL DEFAULT FALSE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- 4. Create users_roles table
CREATE TABLE IF NOT EXISTS "users_roles" (
    "id" UUID NOT NULL,
    "user" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "role" UUID NOT NULL REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "users_roles" ENABLE ROW LEVEL SECURITY;
