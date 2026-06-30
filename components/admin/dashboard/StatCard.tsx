"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  href: string;
};

export default function StatCard({
  label,
  value,
  icon,
  color,
  href,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
        <TrendingUp size={18} className="text-green-500" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-black">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </Link>
  );
}
