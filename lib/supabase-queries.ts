import { createClient } from "@/utils/supabase/client";
import type { Product as OldProduct } from "@/types/product.types";
import type { Review as OldReview } from "@/types/review.types";
import type { Collection as OldCollection } from "@/lib/data";
import type { Product as SupabaseProduct } from "@/types/supabase.types";

// ── Type mapping helpers (shared) ──

export function toOldProduct(p: SupabaseProduct): OldProduct {
  return {
    id: p.id,
    title: p.title,
    srcUrl: p.src_url,
    gallery: p.gallery || [],
    price: Number(p.price),
    discount: {
      amount: p.discount_amount || 0,
      percentage: p.discount_percentage || 0,
    },
    rating: Number(p.rating),
  };
}

export function toOldReview(
  r: { id: number; rating: number; content: string; created_at: string },
  userName: string
): OldReview {
  return {
    id: r.id,
    user: userName,
    content: r.content,
    rating: r.rating,
    date: new Date(r.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export function toOldCollection(c: {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  view_all_link: string | null;
}): OldCollection {
  return {
    id: c.id,
    title: c.title,
    description: c.description || "",
    imageUrl: c.image_url,
    viewAllLink: c.view_all_link || `/collections/${c.title.toLowerCase()}`,
  };
}

// ── Client-side fetchers (for client components) ──

export async function fetchNewArrivalsClient(): Promise<OldProduct[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_new_arrival", true)
    .order("created_at", { ascending: false });

  return (data || []).map(toOldProduct);
}

export async function fetchAllProductsClient(): Promise<OldProduct[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (data || []).map(toOldProduct);
}

export async function fetchCollectionsClient(): Promise<OldCollection[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  return (data || []).map(toOldCollection);
}

export async function fetchReviewsByProductClient(
  productId: number
): Promise<OldReview[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("reviews")
    .select("id, rating, content, created_at, profiles(name)")
    .eq("product_id", productId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return (data || []).map((r: Record<string, unknown>) =>
    toOldReview(
      {
        id: r.id as number,
        rating: r.rating as number,
        content: r.content as string,
        created_at: r.created_at as string,
      },
      ((r.profiles as Record<string, unknown>)?.name as string) || "Anonymous"
    )
  );
}
