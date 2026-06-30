"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Search, Mail, CheckCircle, XCircle, Trash2 } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const supabase = createClient();
      let query = supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`
        );
      }

      const { data } = await query;
      if (data) setContacts(data as Contact[]);
      setLoading(false);
    };

    fetchContacts();
  }, [searchQuery]);

  const toggleRead = async (contactId: number, currentStatus: boolean) => {
    const supabase = createClient();
    await supabase
      .from("contacts")
      .update({ is_read: !currentStatus })
      .eq("id", contactId);
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId ? { ...c, is_read: !currentStatus } : c
      )
    );
    if (selectedContact?.id === contactId) {
      setSelectedContact({ ...selectedContact, is_read: !currentStatus });
    }
  };

  const deleteContact = async (contactId: number) => {
    const supabase = createClient();
    await supabase.from("contacts").delete().eq("id", contactId);
    setContacts((prev) => prev.filter((c) => c.id !== contactId));
    if (selectedContact?.id === contactId) setSelectedContact(null);
  };

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Contact Messages
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {unreadCount > 0
            ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
            : "All messages read"}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Message from {selectedContact.name}</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-sm font-medium">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedContact.name}</p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Mail size={12} />
                    {selectedContact.email}
                  </a>
                </div>
              </div>
              {selectedContact.subject && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Subject</p>
                  <p className="text-sm font-medium">{selectedContact.subject}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Message</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 leading-relaxed">
                  {selectedContact.message}
                </p>
              </div>
              <p className="text-xs text-gray-400">
                Received {new Date(selectedContact.created_at).toLocaleString()}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() =>
                    toggleRead(selectedContact.id, selectedContact.is_read)
                  }
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedContact.is_read
                      ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {selectedContact.is_read ? (
                    <>
                      <XCircle size={16} />
                      Mark as unread
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Mark as read
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    deleteContact(selectedContact.id);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contacts List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!contact.is_read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                    <span className={`font-medium text-sm ${
                      !contact.is_read ? "text-black" : "text-gray-500"
                    }`}>
                      {contact.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{contact.email}</p>
                  {contact.subject && (
                    <p className="text-sm font-medium text-black mb-1">
                      {contact.subject}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {contact.message}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
