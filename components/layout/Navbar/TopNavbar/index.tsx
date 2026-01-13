import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiChevronDown, HiOutlineHeart } from "react-icons/hi2";
import { NavMenu } from "../navbar.types";
import CartBtn from "./CartBtn";
import { MenuItem } from "./MenuItem";
import { MenuList } from "./MenuList";
import ResTopNavbar from "./ResTopNavbar";

const data: NavMenu = [
  {
    id: 1,
    type: "MenuItem",
    label: "HOME",
    url: "/",
    children: [],
  },
  {
    id: 2,
    label: "PRODUCTS",
    type: "MenuList",
    children: [
      {
        id: 21,
        label: "Men's clothes",
        url: "/shop#men-clothes",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 22,
        label: "Women's clothes",
        url: "/shop#women-clothes",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 23,
        label: "Kids clothes",
        url: "/shop#kids-clothes",
        description: "For all ages, with happy and beautiful colors",
      },
    ],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "ACCESSORIES",
    url: "/accessories",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "ABOUT US",
    url: "/about",
    children: [],
  },
  {
    id: 5,
    type: "MenuItem",
    label: "CONTACT",
    url: "/contact",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="max-w-7xl mx-auto px-6 py-3">
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
          <div className="flex items-center space-x-3 ml-auto">
            {/* Search Input */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-md px-3 py-1.5 w-48">
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
                placeholder="Search"
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
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-sm text-gray-700">EN</span>
              <HiChevronDown className="w-3 h-3 text-gray-500" />
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <HiOutlineHeart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
            </Link>

            {/* Cart */}
            <CartBtn />

            {/* User */}
            <Link href="/#signin">
              <Image
                priority
                src="/icons/user.svg"
                height={18}
                width={18}
                alt="user"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
