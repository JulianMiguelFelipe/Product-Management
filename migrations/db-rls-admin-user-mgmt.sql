-- ============================================================================
-- HopePMS | PR-02 db/rls-admin-user-mgmt
-- Description: Deploys security boundaries over user management matrix.
-- Integrity Shields:
--   • public.get_my_user_type() security helper reads session details.
--   • 'user' RLS policy stops an ADMIN from updating a SUPERADMIN row.
--   • 'UserModule_Rights' RLS policy prevents an ADMIN from modifying permission
--     matrices assigned to a SUPERADMIN.
-- ============================================================================

-- Step 1: Ensure security helper function exists to evaluate acting authority context
CREATE OR REPLACE FUNCTION public.get_my_user_type()
RETURNS TEXT LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT "user_type" FROM public."user" WHERE "userId" = auth.uid()::text;
$$;

-- Step 2: Ensure Row Level Security is active on target tracking structures
ALTER TABLE public."user"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."UserModule_Rights" ENABLE ROW LEVEL SECURITY;

-- Step 3: Clear prior instances to allow fresh configuration block deployment
DROP POLICY IF EXISTS "user_select" ON public."user";
DROP POLICY IF EXISTS "user_update" ON public."user";
DROP POLICY IF EXISTS "umr_select"  ON public."UserModule_Rights";
DROP POLICY IF EXISTS "umr_write_guard" ON public."UserModule_Rights";

--- 2.1 'user' PROFILE PROTECTION RULES ---

-- Allow select reads for all authenticating users (required for UI/Context lookups)
CREATE POLICY "user_select"
ON public."user" FOR SELECT TO authenticated 
USING (true);

-- Enforce systemic write guard block boundaries (ADMIN restricts to non-SUPERADMIN targets)
CREATE POLICY "user_update"
ON public."user" FOR UPDATE TO authenticated
USING (
  public.get_my_user_type() = 'SUPERADMIN'
  OR (public.get_my_user_type() = 'ADMIN' AND "user_type" != 'SUPERADMIN')
)
WITH CHECK (
  public.get_my_user_type() = 'SUPERADMIN'
  OR (public.get_my_user_type() = 'ADMIN' AND "user_type" != 'SUPERADMIN')
);

--- 2.2 'UserModule_Rights' PERMISSION PROTECTION RULES ---

-- Allow viewing rights settings across authenticated instances
CREATE POLICY "umr_select"
ON public."UserModule_Rights" FOR SELECT TO authenticated 
USING (true);

-- Write guard preventing non-SUPERADMIN accounts from mutating SUPERADMIN right rows
CREATE POLICY "umr_write_guard"
ON public."UserModule_Rights" FOR ALL TO authenticated
USING (
  public.get_my_user_type() = 'SUPERADMIN'
  OR "userid" NOT IN (
    SELECT "userId" FROM public."user" WHERE "user_type" = 'SUPERADMIN'
  )
);