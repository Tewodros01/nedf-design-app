"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type ProductFormData = {
  title: string;
  description: string;
  src_url: string;
  gallery: string;
  price: string;
  discount_percentage: string;
  rating: string;
  stock: string;
  is_new_arrival: boolean;
  is_top_selling: boolean;
};

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => Promise<void>;
  initialData?: ProductFormData | null;
  saving?: boolean;
};

const defaultFormData: ProductFormData = {
  title: "",
  description: "",
  src_url: "",
  gallery: "",
  price: "",
  discount_percentage: "0",
  rating: "0",
  stock: "0",
  is_new_arrival: false,
  is_top_selling: false,
};

export type { ProductFormData };

export default function ProductFormModal({
  open,
  onClose,
  onSave,
  initialData,
  saving = false,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const updateField = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="font-semibold text-lg">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black/70 mb-1">
                Title *
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black/70 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black/70 mb-1">
                Image URL *
              </label>
              <input
                required
                type="text"
                value={formData.src_url}
                onChange={(e) => updateField("src_url", e.target.value)}
                placeholder="/images/product.png"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
              {formData.src_url && (
                <div className="mt-2 w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={formData.src_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Gallery */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black/70 mb-1">
                Gallery URLs (comma separated)
              </label>
              <input
                type="text"
                value={formData.gallery}
                onChange={(e) => updateField("gallery", e.target.value)}
                placeholder="/images/pic1.png, /images/pic2.png"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Price *
              </label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Discount %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount_percentage}
                onChange={(e) =>
                  updateField("discount_percentage", e.target.value)
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => updateField("rating", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-black/70 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/30"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.is_new_arrival}
                onChange={(e) =>
                  updateField("is_new_arrival", e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm group-hover:text-black/80">New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.is_top_selling}
                onChange={(e) =>
                  updateField("is_top_selling", e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm group-hover:text-black/80">Top Selling</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {isEditing ? "Update Product" : "Create Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
