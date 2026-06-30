"use client";

import CartCounter from "@/components/ui/CartCounter";
import {
  addToCart,
  CartItem,
  remove,
  removeCartItem,
} from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import Image from "next/image";
import Link from "next/link";
import { PiTrashFill } from "react-icons/pi";

type ProductCardProps = {
  data: CartItem;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start gap-3 sm:gap-4">
      {/* Product image — fixed size, always visible */}
      <Link
        href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
        className="bg-[#F0EEED] rounded-xl shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-[124px] md:h-[124px] overflow-hidden flex items-center justify-center"
      >
        <Image
          src={data.srcUrl}
          width={124}
          height={124}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
          alt={data.name}
          priority
        />
      </Link>

      {/* Product details */}
      <div className="flex flex-1 min-w-0 flex-col gap-1">
        {/* Name + delete */}
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/shop/product/${data.id}/${data.name.split(" ").join("-")}`}
            className="text-black font-bold text-sm sm:text-base line-clamp-2 leading-snug"
          >
            {data.name}
          </Link>
          <button
            onClick={() =>
              dispatch(
                remove({
                  id: data.id,
                  attributes: data.attributes,
                  quantity: data.quantity,
                })
              )
            }
            className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full hover:bg-red-50 transition-colors"
            aria-label="Remove item"
          >
            <PiTrashFill className="text-lg text-red-500" />
          </button>
        </div>

        {/* Attributes */}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-black/60 text-xs sm:text-sm">
            Size: <span className="text-black">{data.attributes[0]}</span>
          </span>
          <span className="text-black/60 text-xs sm:text-sm">
            Color: <span className="text-black">{data.attributes[1]}</span>
          </span>
        </div>

        {/* Price + quantity */}
        <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-1">
          {/* Price display */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {data.discount.percentage > 0 ? (
              <span className="font-bold text-black text-base sm:text-lg md:text-xl">
                {`$${Math.round(
                  data.price - (data.price * data.discount.percentage) / 100
                )}`}
              </span>
            ) : data.discount.amount > 0 ? (
              <span className="font-bold text-black text-base sm:text-lg md:text-xl">
                {`$${data.price - data.discount.amount}`}
              </span>
            ) : (
              <span className="font-bold text-black text-base sm:text-lg md:text-xl">
                ${data.price}
              </span>
            )}
            {(data.discount.percentage > 0 || data.discount.amount > 0) && (
              <span className="font-bold text-black/40 line-through text-sm sm:text-base">
                ${data.price}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className="font-medium text-[10px] py-1 px-2 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                -{data.discount.percentage}%
              </span>
            )}
          </div>

          {/* Quantity counter */}
          <CartCounter
            initialValue={data.quantity}
            onAdd={() => dispatch(addToCart({ ...data, quantity: 1 }))}
            onRemove={() =>
              data.quantity === 1
                ? dispatch(
                    remove({
                      id: data.id,
                      attributes: data.attributes,
                      quantity: data.quantity,
                    })
                  )
                : dispatch(
                    removeCartItem({ id: data.id, attributes: data.attributes })
                  )
            }
            isZeroDelete
            className="px-3 py-2 sm:px-4 sm:py-2.5 max-h-9 sm:max-h-10 min-w-[86px] max-w-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
