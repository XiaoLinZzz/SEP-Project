-- 4. Drop users_roles table
ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users_roles";

-- 3. Drop users table
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users";

-- 2. Drop roles table
ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "roles";

-- 1. Drop companies table
ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "companies";