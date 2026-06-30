import Image from "next/image";

const brandsData: { id: string; srcUrl: string }[] = [
  {
    id: "fresh-exchange",
    srcUrl: "/images/reachforchange.png",
  },
  {
    id: "alx",
    srcUrl: "/images/alxEt.png",
  },
  {
    id: "mastercard",
    srcUrl: "/images/mastercard.png",
  },
  {
    id: "spafi",
    srcUrl: "/images/soreti.png",
  },
];

const Brands = () => {
  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="max-w-frame mx-auto px-4">
        <p className="text-center text-gray-900 text-base sm:text-xl font-normal mb-8 sm:mb-12">
          Trusted By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {brandsData.map((brand) => (
            <Image
              key={brand.id}
              priority
              src={brand.srcUrl}
              height={80}
              width={200}
              alt={brand.id}
              className="h-auto w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
