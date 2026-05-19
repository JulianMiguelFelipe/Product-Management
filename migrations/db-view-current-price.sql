-- ============================================================================
-- HopePMS | PR-03 db/view-current-price
-- Description: Initializes current price lookup structure for reporting views.
-- Optimization: Uses DISTINCT ON sorting execution logic for optimized performance.
-- ============================================================================

-- Step 1: Drop the old view if it already exists in public space
DROP VIEW IF EXISTS public.current_product_price;

-- Step 2: Formulate lookup structure extracting the latest active pricing records
CREATE VIEW public.current_product_price AS
SELECT DISTINCT ON (ph."prodCode")
  ph."prodCode",
  ph."unitPrice",
  ph."effDate"
FROM public."priceHist" ph
ORDER BY ph."prodCode", ph."effDate" DESC;

-- Step 3: Grant data access capability directly to authenticated system roles
GRANT SELECT ON public.current_product_price TO authenticated;