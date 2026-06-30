"use client";

import { integralCF } from "@/app/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Collection = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  viewAllLink: string;
};

type CollectionListProps = {
  title: string;
  description: string;
  data: Collection[];
};

const CollectionList = ({ title, description, data }: CollectionListProps) => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <motion.div
          initial={{ y: "50px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start justify-between mb-6 sm:mb-8 gap-4"
        >
          <div className="max-w-md">
            <h2
              className={cn([integralCF.className, "text-xl sm:text-2xl font-bold mb-2"])}
            >
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              title="Previous collection"
              onClick={() => api?.scrollPrev()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Next collection"
              onClick={() => api?.scrollNext()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {data.map((collection) => (
                <CarouselItem
                  key={collection.id}
                  className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4"
                >
                  <div className="relative h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden group">
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-lg mb-3">
                        {collection.title}
                      </h3>
                      <Link
                        href={collection.viewAllLink}
                        className="inline-block bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionList;
