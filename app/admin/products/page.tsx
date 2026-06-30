"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/types/supabase.types";
import { Plus } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductsTable from "@/components/admin/products/ProductsTable";
import ProductFormModal, {
  type ProductFormData,
} from "@/components/admin/products/ProductFormModal";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

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

  const getFormDataFromProduct = (product: Product): ProductFormData => ({
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

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSave = async (formData: ProductFormData) => {
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
      await supabase.from("products").update(payload).eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setSaving(false);
    handleClose();
    fetchProducts();
  };

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        subtitle="Manage your product catalog"
        action={{
          label: "Add Product",
          icon: <Plus size={18} />,
          onClick: handleAdd,
        }}
      />

      <ProductsTable
        products={products}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductFormModal
        open={showForm}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editingProduct ? getFormDataFromProduct(editingProduct) : null}
        saving={saving}
      />
    </div>
  );
}
