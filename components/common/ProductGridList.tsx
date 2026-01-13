"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types/product.types";
import * as motion from "framer-motion/client";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type FilterType = "new" | "all" | "popular";

type ProductGridListProps = {
  data: Product[];
  viewAllLink?: string;
};

const ProductGridList = ({ data, viewAllLink }: ProductGridListProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("new");

  const filters = [
    { key: "new" as FilterType, label: "New Collection" },
    { key: "all" as FilterType, label: "ALL Collection" },
    { key: "popular" as FilterType, label: "Popular Collection" },
  ];

  return (
    <section className="max-w-7xl">
      <div className="">
        <motion.div
          initial={{ y: "50px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-12">
            {filters.map((filter) => (
              <label
                key={filter.key}
                className="flex items-center cursor-pointer"
              >
                <div className="relative mr-3">
                  <input
                    type="radio"
                    name="collection"
                    checked={activeFilter === filter.key}
                    onChange={() => setActiveFilter(filter.key)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      activeFilter === filter.key
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 bg-white"
                    )}
                  >
                    {activeFilter === filter.key && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {filter.label}
                </span>
              </label>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {data.slice(0, 6).map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-4 w-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-700">
                  {product.price.toLocaleString()} ETB
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    title="Add to wishlist"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    type="button"
                    title="Quick view"
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="aspect-square mb-4 flex items-center justify-center">
                <Image
                  src={product.srcUrl}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {viewAllLink && (
          <motion.div
            initial={{ y: "50px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center"
          >
            <Link
              href={viewAllLink}
              className="inline-block px-12 py-3 border border-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black transition-all font-medium text-sm"
            >
              View All
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGridList;
