"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/common/ReviewCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchReviewsByProductClient } from "@/lib/supabase-queries";
import { useLanguage } from "@/lib/LanguageContext";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { Review } from "@/types/review.types";

const ReviewsContent = ({ productId }: { productId?: number }) => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    const loadReviews = async () => {
      const data = await fetchReviewsByProductClient(productId);
      setReviews(data);
      setLoading(false);
    };
    loadReviews();
  }, [productId]);

  return (
    <section>
      <div className="flex items-center justify-between flex-col sm:flex-row mb-5 sm:mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold text-black mr-2">
            {t("allReviews")}
          </h3>
          <span className="text-sm sm:text-base text-black/60">
            ({reviews.length})
          </span>
        </div>
        <div className="flex items-center space-x-2.5">
          <Select defaultValue="latest">
            <SelectTrigger className="min-w-[120px] font-medium text-xs sm:text-base px-4 py-3 sm:px-5 sm:py-4 text-black bg-[#F0F0F0] border-none rounded-full h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">{t("latest")}</SelectItem>
              <SelectItem value="most-relevant">{t("mostRelevant")}</SelectItem>
              <SelectItem value="oldest">{t("oldest")}</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            className="sm:min-w-[166px] px-4 py-3 sm:px-5 sm:py-4 rounded-full bg-black font-medium text-xs sm:text-base h-12"
          >
            {t("writeReview")}
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-black/40" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-black/40">
          <p className="text-sm">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-9">
          {reviews.map((review) => (
            <ReviewCard key={review.id} data={review} isAction isDate />
          ))}
        </div>
      )}
      <div className="w-full px-4 sm:px-0 text-center">
        <Link
          href="#"
          className="inline-block w-full sm:w-[230px] px-6 sm:px-11 py-3 sm:py-4 border rounded-full hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10"
        >
          {t("loadMore")}
        </Link>
      </div>
    </section>
  );
};

export default ReviewsContent;
