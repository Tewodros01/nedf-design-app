import { cn } from "@/lib/utils";
import { integralCF } from "@/app/fonts";
import Link from "next/link";

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
};

const DressStyleCard = ({ title, url, className }: DressStyleCardProps) => {
  return (
    <Link
      href={url}
      className={cn([
        "bg-cover bg-no-repeat rounded-[20px] p-5 sm:p-10 w-full flex items-start justify-between flex-col",
        className,
      ])}
    >
      <div className="flex items-start justify-start">
        <span
          className={cn([
            integralCF.className,
            "text-2xl sm:text-3xl xl:text-4xl font-bold text-black text-left capitalize",
          ])}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default DressStyleCard;
