"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { NavMenu } from "../navbar.types";
import CartBtn from "./CartBtn";
import { MenuItem } from "./MenuItem";
import { MenuList } from "./MenuList";
import ResTopNavbar from "./ResTopNavbar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { signOut } from "@/lib/features/auth/authSlice";
import { RootState } from "@/lib/store";
import { useLanguage } from "@/lib/LanguageContext";
import { createClient } from "@/utils/supabase/client";
import { LogOut, User, ChevronDown, Shield } from "lucide-react";

const TopNavbar = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { lang, t, setLang, getLabel } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const data: NavMenu = [
    {
      id: 1,
      type: "MenuItem",
      label: t("home").toUpperCase(),
      url: "/",
      children: [],
    },
    {
      id: 2,
      label: t("products").toUpperCase(),
      type: "MenuList",
      children: [
        {
          id: 21,
          label: t("men"),
          url: "/shop?category=men",
          description: t("menDesc"),
        },
        {
          id: 22,
          label: t("women"),
          url: "/shop?category=women",
          description: t("womenDesc"),
        },
        {
          id: 23,
          label: t("kids"),
          url: "/shop?category=kids",
          description: t("kidsDesc"),
        },
      ],
    },
    {
      id: 3,
      type: "MenuItem",
      label: t("accessories").toUpperCase(),
      url: "/accessories",
      children: [],
    },
    {
      id: 4,
      type: "MenuItem",
      label: t("about").toUpperCase(),
      url: "/about",
      children: [],
    },
    {
      id: 5,
      type: "MenuItem",
      label: t("contact").toUpperCase(),
      url: "/contact",
      children: [],
    },
  ];

  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="max-w-frame mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex space-x-2">
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  {item.type === "MenuItem" && (
                    <MenuItem label={item.label} url={item.url} />
                  )}
                  {item.type === "MenuList" && (
                    <MenuList data={item.children} label={item.label} />
                  )}
                </React.Fragment>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <ResTopNavbar data={data} />
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                priority
                src="/images/nedf.png"
                height={32}
                width={80}
                alt="NEDF"
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            {/* Search Input */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 w-36 lg:w-48">
              <Image
                priority
                src="/icons/search.svg"
                height={16}
                width={16}
                alt="search"
                className="mr-2 opacity-50"
              />
              <input
                type="search"
                placeholder={t("search")}
                className="bg-transparent text-sm placeholder:text-gray-400 outline-none flex-1"
              />
            </div>

            {/* Mobile Search */}
            <Link href="/search" className="block md:hidden">
              <Image
                priority
                src="/icons/search-black.svg"
                height={18}
                width={18}
                alt="search"
              />
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {getLabel()}
                </span>
                <ChevronDown size={12} className="text-gray-500" />
              </button>
              {showLangMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-black/10 rounded-lg shadow-lg py-1 min-w-[120px]">
                    <button
                      onClick={() => {
                        setLang("en");
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        lang === "en" ? "font-medium text-black" : "text-black/60"
                      }`}
                    >
                      {t("english")}
                    </button>
                    <button
                      onClick={() => {
                        setLang("am");
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        lang === "am" ? "font-medium text-black" : "text-black/60"
                      }`}
                    >
                      {t("amharic")}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <HiOutlineHeart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
            </Link>

            {/* Cart */}
            <CartBtn />

            {/* User / Auth */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs sm:text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-black/10 rounded-lg shadow-lg py-1 min-w-[160px]">
                      <div className="px-4 py-2 border-b border-black/5">
                        <p className="text-sm font-medium text-black truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-black/40 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-black/60 hover:text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={14} />
                        {t("profile")}
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-black/60 hover:text-black hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield size={14} />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          const supabase = createClient();
                          await supabase.auth.signOut();
                          dispatch(signOut());
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={14} />
                        {t("signout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/signin">
                <Image
                  priority
                  src="/icons/user.svg"
                  height={18}
                  width={18}
                  alt="user"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
