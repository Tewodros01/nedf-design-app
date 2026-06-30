-- ============================================================
-- NEDF Design - Seed Data
-- Run this AFTER 001_initial_schema.sql in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, description) VALUES
  ('T-shirts', 't-shirts', 'Casual and stylish t-shirts for every occasion'),
  ('Shorts', 'shorts', 'Comfortable shorts for warm weather'),
  ('Shirts', 'shirts', 'Classic and modern shirts'),
  ('Hoodie', 'hoodie', 'Warm and cozy hoodies'),
  ('Jeans', 'jeans', 'Denim jeans for everyday wear'),
  ('New Arrivals', 'new-arrivals', 'Latest additions to our collection'),
  ('Men', 'men', 'Men''s fashion collection'),
  ('Women', 'women', 'Women''s fashion collection'),
  ('Kids', 'kids', 'Kids'' fashion collection')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 2. DRESS STYLES
-- ============================================================
INSERT INTO dress_styles (name, slug, description) VALUES
  ('Casual', 'casual', 'Relaxed everyday wear'),
  ('Formal', 'formal', 'Elegant formal attire'),
  ('Party', 'party', 'Party and evening wear'),
  ('Gym', 'gym', 'Athletic and gym wear')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 3. PRODUCTS
-- ============================================================
INSERT INTO products (title, description, src_url, gallery, price, discount_percentage, rating, stock, is_new_arrival, is_top_selling) VALUES
-- New Arrivals
(
  'T-shirt with Tape Details',
  'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
  '/images/image27.png',
  '["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  120, 0, 4.5, 50, TRUE, FALSE
),
(
  'Skinny Fit Jeans',
  'Slim-fit denim jeans with a modern silhouette. Perfect for a sleek, fashionable look.',
  '/images/image28.png',
  '["/images/pic2.png"]'::jsonb,
  260, 20, 3.5, 30, TRUE, FALSE
),
(
  'Chechered Shirt',
  'Classic checked shirt for a timeless style. Made from high-quality cotton.',
  '/images/image29.png',
  '["/images/pic3.png"]'::jsonb,
  180, 0, 4.5, 40, TRUE, FALSE
),
(
  'Sleeve Striped T-shirt',
  'A stylish striped t-shirt with detailed sleeves. Comfort meets contemporary fashion.',
  '/images/image29.png',
  '["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  160, 30, 4.5, 35, TRUE, FALSE
),
(
  'Sleeve Striped T-shirt',
  'A stylish striped t-shirt with detailed sleeves. Comfort meets contemporary fashion.',
  '/images/image28.png',
  '["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  160, 30, 4.5, 25, TRUE, FALSE
),
(
  'Sleeve Striped T-shirt',
  'A stylish striped t-shirt with detailed sleeves. Comfort meets contemporary fashion.',
  '/images/image27.png',
  '["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  160, 30, 4.5, 20, TRUE, FALSE
),
-- Top Selling
(
  'Vertical Striped Shirt',
  'A sophisticated vertically striped shirt for a sharp, polished appearance.',
  '/images/image27.png',
  '["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  232, 20, 5.0, 45, FALSE, TRUE
),
(
  'Courage Graphic T-shirt',
  'A bold graphic t-shirt that makes a statement. Wear your courage on your sleeve.',
  '/images/pic6.png',
  '["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  145, 0, 4.0, 60, FALSE, TRUE
),
(
  'Loose Fit Bermuda Shorts',
  'Comfortable loose-fit Bermuda shorts, perfect for casual summer days.',
  '/images/pic7.png',
  '["/images/pic7.png"]'::jsonb,
  80, 0, 3.0, 70, FALSE, TRUE
),
(
  'Faded Skinny Jeans',
  'Trendy faded skinny jeans with a worn-in look. Style meets comfort.',
  '/images/pic8.png',
  '["/images/pic8.png"]'::jsonb,
  210, 0, 4.5, 35, FALSE, TRUE
),
-- Related Products
(
  'Polo with Contrast Trims',
  'A classic polo shirt with contrasting trim details. Sophisticated sportswear.',
  '/images/pic12.png',
  '["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  242, 20, 4.0, 55, FALSE, FALSE
),
(
  'Gradient Graphic T-shirt',
  'An eye-catching gradient graphic t-shirt. Modern art meets streetwear.',
  '/images/pic13.png',
  '["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"]'::jsonb,
  145, 0, 3.5, 40, FALSE, FALSE
),
(
  'Polo with Tipping Details',
  'A refined polo shirt with detailed tipping on the collar and cuffs.',
  '/images/pic14.png',
  '["/images/pic14.png"]'::jsonb,
  180, 0, 4.5, 30, FALSE, FALSE
),
(
  'Black Striped T-shirt',
  'A classic black and white striped t-shirt. Timeless and versatile.',
  '/images/pic15.png',
  '["/images/pic15.png"]'::jsonb,
  150, 30, 5.0, 65, FALSE, FALSE
);

-- ============================================================
-- 4. COLLECTIONS
-- ============================================================
INSERT INTO collections (title, description, image_url, view_all_link) VALUES
  ('BALENCIAGA', 'Luxury fashion collection', '/images/collection-balenciaga.png', '/collections/balenciaga'),
  ('ZENDAYA', 'Celebrity inspired collection', '/images/collection-zendaya.png', '/collections/zendaya'),
  ('BURBERRY', 'British luxury fashion', '/images/collection-burberry.png', '/collections/burberry'),
  ('BALENCIAGA', 'Luxury fashion collection', '/images/collection-balenciaga.png', '/collections/balenciaga'),
  ('ZENDAYA', 'Celebrity inspired collection', '/images/collection-zendaya.png', '/collections/zendaya'),
  ('BURBERRY', 'British luxury fashion', '/images/collection-burberry.png', '/collections/burberry');

-- ============================================================
-- 5. SAMPLE REVIEWS (will be visible only after users sign up)
-- These are inserted with placeholder user IDs.
-- To create real review data, users need to exist first.
-- You can run this AFTER users have signed up.
-- ============================================================

-- Create a function to insert sample reviews once users exist
CREATE OR REPLACE FUNCTION public.insert_sample_reviews()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  first_user_id UUID;
  product_ids BIGINT[];
BEGIN
  -- Get the first user who signed up
  SELECT id INTO first_user_id FROM public.profiles LIMIT 1;

  IF first_user_id IS NULL THEN
    RETURN 'No users found. Sign up first, then run this function again.';
  END IF;

  -- Get all product IDs
  SELECT ARRAY_AGG(id) INTO product_ids FROM public.products;

  -- Insert sample reviews
  INSERT INTO public.reviews (product_id, user_id, rating, content, is_approved, created_at)
  VALUES
    (product_ids[1], first_user_id, 5, 'I''m blown away by the quality and style of the clothes I received. From casual wear to elegant dresses, every piece I''ve bought has exceeded my expectations.', TRUE, NOW() - INTERVAL '30 days'),
    (product_ids[2], first_user_id, 5, 'Finding clothes that align with my personal style used to be a challenge until I discovered this store. The range of options they offer is truly remarkable.', TRUE, NOW() - INTERVAL '25 days'),
    (product_ids[3], first_user_id, 5, 'As someone who''s always on the lookout for unique fashion pieces, I''m thrilled to have stumbled upon this store. The selection of clothes is not only diverse but also on-point with the latest trends.', TRUE, NOW() - INTERVAL '20 days'),
    (product_ids[1], first_user_id, 5, 'The quality exceeds expectations. I''ve recommended this store to all my friends and family.', TRUE, NOW() - INTERVAL '15 days');

  RETURN 'Sample reviews inserted successfully!';
END;
$$;

-- ============================================================
-- SEED COMPLETE
-- ============================================================
-- After running:
-- 1. Sign up via the app
-- 2. Run: SELECT public.insert_sample_reviews();
-- 3. To make yourself admin: SELECT public.make_admin('your-email@example.com');
-- ============================================================
