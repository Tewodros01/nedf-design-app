-- ============================================================
-- FIX: Infinite Recursion in RLS Policies
-- 
-- The admin-check policies used:
--   EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
--
-- This causes infinite recursion because reading 'profiles' triggers
-- the RLS policy on 'profiles' again.
--
-- FIX: Use a SECURITY DEFINER function that bypasses RLS
-- ============================================================

-- 1. Create a SECURITY DEFINER function to check if the current user is admin
-- This runs with the privileges of the function creator (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- 2. Drop all the problematic policies that cause recursion
-- (On profiles table - these directly query profiles within profiles policies)
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

-- (On other tables - these query profiles from their policies, which works
--  because they're on different tables and shouldn't cause recursion,
--  BUT we'll update them to use the function for consistency and safety)
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

DROP POLICY IF EXISTS "Admins can manage collections" ON collections;

DROP POLICY IF EXISTS "Admins can manage dress styles" ON dress_styles;

DROP POLICY IF EXISTS "Admins can view all reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON reviews;

DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;

DROP POLICY IF EXISTS "Admins can view contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can delete contacts" ON contacts;

-- 3. Recreate all policies using the is_admin() function

-- 3.1 PROFILES
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (public.is_admin());

-- 3.2 PRODUCTS
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (public.is_admin());

-- 3.3 COLLECTIONS
CREATE POLICY "Admins can manage collections"
  ON collections FOR ALL
  USING (public.is_admin());

-- 3.4 DRESS STYLES
CREATE POLICY "Admins can manage dress styles"
  ON dress_styles FOR ALL
  USING (public.is_admin());

-- 3.5 REVIEWS
CREATE POLICY "Admins can view all reviews"
  ON reviews FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update reviews"
  ON reviews FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete reviews"
  ON reviews FOR DELETE
  USING (public.is_admin());

-- 3.6 ORDERS
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (public.is_admin());

-- 3.7 ORDER ITEMS
CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT
  USING (public.is_admin());

-- 3.8 CONTACTS
CREATE POLICY "Admins can view contacts"
  ON contacts FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update contacts"
  ON contacts FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete contacts"
  ON contacts FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- FIX COMPLETE
-- Run this entire script in Supabase SQL Editor
-- ============================================================
