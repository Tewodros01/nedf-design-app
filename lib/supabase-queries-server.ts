import { createClient as createServerClient } from "@/utils/supabase/server";
import type { Product as OldProduct } from "@/types/product.types";
import type { Review as OldReview } from "@/types/review.types";
import type { Collection as OldCollection } from "@/lib/data";
import type { Product as SupabaseProduct } from "@/types/supabase.types";
import {
  toOldProduct,
  toOldReview,
  toOldCollection,
} from "@/lib/supabase-queries";

// ── Server-side fetchers (for server components) ──

export async function fetchProductById(id: number): Promise<OldProduct | null> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return data ? toOldProduct(data as unknown as SupabaseProduct) : null;
}

export async function fetchAllProducts(): Promise<OldProduct[]> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (data || []).map(
    (p) => toOldProduct(p as unknown as SupabaseProduct)
  );
}

export async function fetchCollections(): Promise<OldCollection[]> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  return (data || []).map(toOldCollection);
}

export async function fetchCollectionBySlug(
  slug: string
): Promise<OldCollection | null> {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("collections")
    .select("*")
    .or(`view_all_link.ilike.%${slug}%,title.ilike.%${slug}%`)
    .maybeSingle();

  return data ? toOldCollection(data) : null;
}
