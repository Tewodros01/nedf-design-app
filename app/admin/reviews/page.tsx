"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Search, CheckCircle, XCircle } from "lucide-react";

type Review = {
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
  profiles: { name: string };
  products: { title: string };
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const supabase = createClient();
      let query = supabase
        .from("reviews")
        .select("*, profiles(name), products(title)")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(
          `content.ilike.%${searchQuery}%,profiles.name.ilike.%${searchQuery}%`
        );
      }

      const { data } = await query;
      if (data) setReviews(data as unknown as Review[]);
      setLoading(false);
    };

    fetchReviews();
  }, [searchQuery]);

  const toggleApproval = async (reviewId: number, currentStatus: boolean) => {
    const supabase = createClient();
    await supabase
      .from("reviews")
      .update({ is_approved: !currentStatus })
      .eq("id", reviewId);
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, is_approved: !currentStatus } : r
      )
    );
  };

  const deleteReview = async (reviewId: number) => {
    const supabase = createClient();
    await supabase.from("reviews").delete().eq("id", reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Moderate customer reviews and ratings
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-gray-100 p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center text-sm font-medium">
                      {review.profiles?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">
                        {review.profiles?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400">
                        on {review.products?.title || `Product #${review.product_id}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"}>
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.content}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {review.is_approved ? (
                    <button
                      onClick={() => toggleApproval(review.id, true)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle size={14} />
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleApproval(review.id, false)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100 transition-colors"
                    >
                      <XCircle size={14} />
                      Pending
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
