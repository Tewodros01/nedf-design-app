-- ============================================================
-- NEDF Design - Complete Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. Profiles (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow insert on signup (from trigger)
CREATE POLICY "Allow insert on signup"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Categories are manageable by admins only"
  ON categories FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 3. Products
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  src_url TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  price DECIMAL(10, 2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  rating DECIMAL(3, 1) DEFAULT 0,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  sizes JSONB DEFAULT '["Small", "Medium", "Large", "X-Large"]'::jsonb,
  colors JSONB DEFAULT '[]'::jsonb,
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_top_selling BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products are manageable by admins only"
  ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 4. Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
  ON reviews FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 5. Orders
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view and manage all orders"
  ON orders FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 6. Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  size TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own order items"
  ON order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all order items"
  ON order_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 7. Collections (for homepage collection list)
CREATE TABLE IF NOT EXISTS collections (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  view_all_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Collections are viewable by everyone"
  ON collections FOR SELECT
  USING (true);

CREATE POLICY "Collections are manageable by admins only"
  ON collections FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- 8. Contact Submissions
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contacts are viewable by admins only"
  ON contacts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Anyone can submit a contact form"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- 9. Cart Items (for persistent cart)
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id, size, color)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own cart"
  ON cart_items FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- Functions & Triggers
-- ============================================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- Seed Data
-- ============================================================

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('New Arrivals', 'new-arrivals', 'Latest additions to our collection'),
  ('Men', 'men', 'Men''s clothing collection'),
  ('Women', 'women', 'Women''s clothing collection'),
  ('Kids', 'kids', 'Kids clothing collection'),
  ('T-shirts', 't-shirts', 'T-shirt collection'),
  ('Shorts', 'shorts', 'Shorts collection'),
  ('Shirts', 'shirts', 'Shirt collection'),
  ('Hoodie', 'hoodie', 'Hoodie collection'),
  ('Jeans', 'jeans', 'Jeans collection')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (title, src_url, gallery, price, discount_percentage, rating, category_id, tags, is_featured, is_new_arrival, is_top_selling, stock) VALUES
  ('T-shirt with Tape Details', '/images/image27.png', '["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"]', 120, 0, 4.5, (SELECT id FROM categories WHERE slug = 't-shirts'), '["t-shirts", "new-arrivals", "women"]', true, true, false, 50),
  ('Skinny Fit Jeans', '/images/image28.png', '["/images/pic2.png"]', 260, 20, 3.5, (SELECT id FROM categories WHERE slug = 'jeans'), '["jeans", "new-arrivals", "kids"]', true, true, false, 30),
  ('Chechered Shirt', '/images/image29.png', '["/images/pic3.png"]', 180, 0, 4.5, (SELECT id FROM categories WHERE slug = 'shirts'), '["shirts", "new-arrivals", "kids"]', true, true, false, 40),
  ('Sleeve Striped T-shirt', '/images/image29.png', '["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"]', 160, 30, 4.5, (SELECT id FROM categories WHERE slug = 't-shirts'), '["t-shirts", "new-arrivals", "women"]', false, true, false, 35),
  ('Vertical Striped Shirt', '/images/image27.png', '["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"]', 232, 20, 5.0, (SELECT id FROM categories WHERE slug = 'shirts'), '["shirts", "men", "top-selling"]', true, false, true, 25),
  ('Courage Graphic T-shirt', '/images/pic6.png', '["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"]', 145, 0, 4.0, (SELECT id FROM categories WHERE slug = 't-shirts'), '["t-shirts", "men", "top-selling"]', true, false, true, 60),
  ('Loose Fit Bermuda Shorts', '/images/pic7.png', '["/images/pic7.png"]', 80, 0, 3.0, (SELECT id FROM categories WHERE slug = 'shorts'), '["shorts", "men", "top-selling"]', true, false, true, 45),
  ('Faded Skinny Jeans', '/images/pic8.png', '["/images/pic8.png"]', 210, 0, 4.5, (SELECT id FROM categories WHERE slug = 'jeans'), '["jeans", "men", "top-selling"]', true, false, true, 20),
  ('Polo with Contrast Trims', '/images/pic12.png', '["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"]', 242, 20, 4.0, (SELECT id FROM categories WHERE slug = 'shirts'), '["shirts", "women", "related"]', false, false, false, 15),
  ('Gradient Graphic T-shirt', '/images/pic13.png', '["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"]', 145, 0, 3.5, (SELECT id FROM categories WHERE slug = 't-shirts'), '["t-shirts", "women", "related"]', false, false, false, 55),
  ('Polo with Tipping Details', '/images/pic14.png', '["/images/pic14.png"]', 180, 0, 4.5, (SELECT id FROM categories WHERE slug = 'shirts'), '["shirts", "related"]', false, false, false, 28),
  ('Black Striped T-shirt', '/images/pic15.png', '["/images/pic15.png"]', 150, 30, 5.0, (SELECT id FROM categories WHERE slug = 't-shirts'), '["t-shirts", "kids", "related"]', false, false, false, 33)
ON CONFLICT DO NOTHING;

-- Insert collections
INSERT INTO collections (title, description, image_url, view_all_link) VALUES
  ('BALENCIAGA', 'Luxury fashion collection', '/images/collection-balenciaga.png', '/collections/balenciaga'),
  ('ZENDAYA', 'Celebrity inspired collection', '/images/collection-zendaya.png', '/collections/zendaya'),
  ('BURBERRY', 'British luxury fashion', '/images/collection-burberry.png', '/collections/burberry'),
  ('BALENCIAGA', 'Luxury fashion collection', '/images/collection-balenciaga.png', '/collections/balenciaga'),
  ('ZENDAYA', 'Celebrity inspired collection', '/images/collection-zendaya.png', '/collections/zendaya'),
  ('BURBERRY', 'British luxury fashion', '/images/collection-burberry.png', '/collections/burberry')
ON CONFLICT DO NOTHING;
