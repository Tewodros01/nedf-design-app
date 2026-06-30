"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/types/supabase.types";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  ImageIcon,
  Package,
} from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
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
  });

  const fetchProducts = useCallback(async () => {
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data } = await query;
    if (data) setProducts(data as unknown as Product[]);
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setFormData({
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
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const openEditForm = (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description || "",
      src_url: product.src_url,
      gallery: (product.gallery || []).join(", "),
      price: String(product.price),
      discount_percentage: String(product.discount_percentage),
      rating: String(product.rating),
      stock: String(product.stock),
      is_new_arrival: product.is_new_arrival,
      is_top_selling: product.is_top_selling,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    const payload = {
      title: formData.title,
      description: formData.description || null,
      src_url: formData.src_url,
      gallery: formData.gallery
        ? formData.gallery.split(",").map((s) => s.trim())
        : [],
      price: parseFloat(formData.price),
      discount_percentage: parseInt(formData.discount_percentage) || 0,
      rating: parseFloat(formData.rating) || 0,
      stock: parseInt(formData.stock) || 0,
      is_new_arrival: formData.is_new_arrival,
      is_top_selling: formData.is_top_selling,
    };

    if (editingProduct) {
      await supabase
        .from("products")
        .update(payload)
        .eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setSaving(false);
    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-lg">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={resetForm}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Image URL *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.src_url}
                    onChange={(e) =>
                      setFormData({ ...formData, src_url: e.target.value })
                    }
                    placeholder="/images/product.png"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Gallery URLs (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.gallery}
                    onChange={(e) =>
                      setFormData({ ...formData, gallery: e.target.value })
                    }
                    placeholder="/images/pic1.png, /images/pic2.png"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Price *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    value={formData.discount_percentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount_percentage: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/70 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new_arrival}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_new_arrival: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_top_selling}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_top_selling: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm">Top Selling</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
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
                        <span className="text-red-500">
                          -{product.discount_percentage}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`${
                          product.stock > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(product)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
