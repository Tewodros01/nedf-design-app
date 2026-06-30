export type UserRole = "customer" | "admin";

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Product = {
  id: number;
  title: string;
  description: string | null;
  src_url: string;
  gallery: string[];
  price: number;
  discount_percentage: number;
  discount_amount: number;
  rating: number;
  category_id: number | null;
  tags: string[];
  sizes: string[];
  colors: { name: string; code: string }[];
  stock: number;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_top_selling: boolean;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
};

export type ReviewWithUser = Review & {
  profiles: Pick<Profile, "name" | "avatar_url">;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: number;
  user_id: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: Record<string, unknown> | null;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderWithUser = Order & {
  profiles: Pick<Profile, "name" | "email">;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  size: string | null;
  color: string | null;
  created_at: string;
};

export type Collection = {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  view_all_link: string | null;
  created_at: string;
};

export type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type CartItem = {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
};

export type CartItemWithProduct = CartItem & {
  products: Pick<
    Product,
    "title" | "src_url" | "price" | "discount_percentage" | "discount_amount"
  >;
};

// Dashboard stats type
export type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalReviews: number;
  totalContacts: number;
  totalRevenue: number;
  pendingOrders: number;
  recentOrders: OrderWithUser[];
};
