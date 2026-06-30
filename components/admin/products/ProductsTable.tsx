"use client";

import { useState } from "react";
import { Edit3, Trash2, ImageIcon, Package, Search } from "lucide-react";
import { Product } from "@/types/supabase.types";

type ProductsTableProps = {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductsTable({
  products,
  loading,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">
            {searchQuery
              ? "No products match your search"
              : "No products yet. Add your first product!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Discount
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Rating
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">
                    Stock
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.src_url ? (
                            <img
                              src={product.src_url}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={18} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-black line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ${product.price}
                    </td>
                    <td className="px-4 py-3">
                      {product.discount_percentage > 0 ? (
                        <span className="text-red-500 font-medium">
                          -{product.discount_percentage}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 5
                            ? "bg-green-50 text-green-700"
                            : product.stock > 0
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(product)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors"
                          title="Edit product"
                        >
                          <Edit3 size={16} />
                        </button>
                        <div className="relative">
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center gap-1 bg-red-50 rounded-lg px-2 py-1">
                              <button
                                onClick={() => handleDeleteClick(product.id)}
                                className="text-xs font-medium text-red-600 hover:text-red-700 px-1.5"
                              >
                                Confirm
                              </button>
                              <span className="text-gray-300">|</span>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs text-gray-500 hover:text-gray-700 px-1.5"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDeleteClick(product.id)}
                              className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/30">
            <p className="text-xs text-gray-400">
              Showing {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
