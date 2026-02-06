"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import Portal from "../common/Portal";
import AuthSlider from "@/components/auth/AuthSlider";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { WHATSAPP_PHONE_NUMBER } from "@/utils/constants";
import { CATEGORIES } from "../../utils/constants";
import { useCartContext } from "@/context/CartContext";
import { formatUserName } from "@/utils/naming";
import UserAvatar from "@/components/ui/UserAvatar";
import ToastMessage from "@/components/ui/ToastMessage";


/* ------------------------------------------------------------------
   STATIC DATA
-------------------------------------------------------------------*/

const searchTexts = [
  "Jaimala for wedding",
  "Bridal floral jewellery",
  "Wedding car decoration",
  "Bed decoration for honeymoon",
  "Bouquet for special moments",
];

const headerCategories = CATEGORIES.map(({ name, slug }) => ({
  name,
  slug,
}));

/* ------------------------------------------------------------------
   COMPONENT
-------------------------------------------------------------------*/

const Header = () => {
  /* ---------------- STATE ---------------- */

  // Typing animation
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { isAuthenticated, logout, profile } = useAuthContext();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const { cartCount, animateCart } = useCartContext();

  const [toastState, setToastState] = useState<{
    title: string;
    description?: string;
    type?: "success" | "error" | "cart";
  } | null>(null);

  useEffect(() => {
    if (!toastState) return;

    const timer = setTimeout(() => {
      setToastState(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastState]);

  // console.log("profile in header:", profile);

  // Search handler
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  // Search
  const [searchValue, setSearchValue] = useState("");

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth slider
  const [authOpen, setAuthOpen] = useState(false);

  // Location
  const [locationText, setLocationText] = useState<string>("Detect location");

  /* ---------------- LOAD SAVED LOCATION ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      setLocationText(saved);
    }
  }, []);

  /* ---------------- PLACEHOLDER TYPING ---------------- */

  useEffect(() => {
    if (searchValue) return;

    const currentText = searchTexts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setPlaceholder(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);

          if (charIndex === currentText.length) {
            setTimeout(() => setIsDeleting(true), 1200);
          }
        } else {
          setPlaceholder(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);

          if (charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % searchTexts.length);
          }
        }
      },
      isDeleting ? 60 : 100,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, searchValue]);

  /* ---------------- LOCATION LOGIC ---------------- */

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setToastState({
        title: "Location not supported",
        description: "Your browser does not support location access",
        type: "error",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // let data;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );

        const data = await res.json();
        // console.log("Reverse Geocoding Data:", data);
        // const address = data?.address ?? {};
        const address = data?.address ?? {};

        const area =
          address.suburb || address.neighbourhood || address.village || "";

        const city =
          address.city ||
          address.city_district ||
          address.town ||
          address.county ||
          address.state_district ||
          address.district ||
          "";

        const pincode = address.postcode || "";
        const state = address.state || "";

        const finalText = `${area} ${pincode}, ${city || state}`;

        setLocationText(finalText);
        localStorage.setItem("userLocation", finalText);
        localStorage.setItem("deliveryPincode", pincode);
      },
      () => {
        // alert("Location access is required to detect delivery area. Please allow location access and try again.");
        setToastState({
          title: "Location permission denied",
          description: "Please allow location access to detect delivery area",
          type: "error",
        });
      },
    );
  };

  /* ------------------------------------------------------------------
     RENDER
  -------------------------------------------------------------------*/

  return (
    <header
      className="
        sticky top-0 z-50
    bg-white
    border-b border-pink-100
    shadow-sm
        
      "
    >
      <div className="relative isolate">
        {/* ================= TOP BAR ================= */}
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden hover:cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </button>

            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/Logo_bg.png"
                  alt="PhoolPatta Logo"
                  width={36}
                  height={36}
                  priority
                />
                <span className="hidden sm:inline text-2xl font-semibold text-pink-600">
                  PhoolPatta
                </span>
              </Link>

              <button
                onClick={handleDetectLocation}
                className="hidden sm:flex items-center gap-1 text-left hover:text-pink-600 cursor-pointer"
              >
                <MapPin size={16} />
                <div className="leading-tight">
                  <p className="text-[11px] text-gray-500">Deliver to</p>
                  <p className="text-sm font-medium">{locationText}</p>
                </div>
              </button>
            </div>
          </div>

          {/* SEARCH (desktop) */}

          {/* final search button */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full items-center bg-pink-50 px-4 py-2 rounded-full border border-pink-200 focus-within:border-pink-400">
              {/* INPUT */}
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />

              {/* SEARCH BUTTON (RIGHT SIDE) */}
              <button
                onClick={() => {
                  if (searchValue.trim()) {
                    router.push(
                      `/products?search=${encodeURIComponent(searchValue.trim())}`,
                    );
                    setSearchValue("");
                  }
                }}
                className="
                  ml-2
                  flex items-center gap-1
                  text-pink-500
                  hover:text-pink-600
                  text-sm
                  font-medium
                "
                aria-label="Search"
              >
                <Search size={18} />
                <span className="hidden lg:inline">Search</span>
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6 text-gray-700">
            {/* <Link
              href="/wishlist"
              className="flex flex-col items-center hover:text-pink-600"
            >
              <Heart size={20} />
              <span className="text-xs">Wishlist</span>
            </Link> */}

            {/* WhatsApp Link Icon */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=I%20like%20your%20products%20on%20PhoolPatta%20and%20I%20want%20to%20customise%20my%20order`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex flex-col items-center
                text-gray-800
                hover:text-green-600
                transition
            "
            >
              {/* DEFAULT ICON */}
              <Image
                src="/icons/whatsapp-icon2.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="block group-hover:hidden"
              />
              {/* HOVER ICON */}
              <Image
                src="/icons/whatsapp-icon-green.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="hidden group-hover:block"
              />
              <span className="text-xs mt-1">WhatsApp</span>
            </a>

            {/* Cart Link */}
            {/* <Link
              href="/cart"
              className="flex flex-col items-center hover:text-pink-600"
            >
              <ShoppingCart size={20} />
              <span className="text-xs">Cart</span>
            </Link> */}

            {/* animated cart link */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center hover:text-pink-600"
            >
              {/* CART ICON */}
              <ShoppingCart
                size={20}
                className={`transition-transform duration-300 ${
                  animateCart ? "scale-125" : "scale-100"
                }`}
              />

              {/* CART COUNT BADGE */}
              {/* {cartCount > 0 && (
                  <span
                    className={`
                      absolute -top-2 -right-2
                      bg-pink-600 text-white
                      text-[10px] font-semibold
                      w-2.5 h-2.5
                      rounded-full
                      flex items-center justify-center
                      transition-transform duration-300
                      ${animateCart ? "scale-125" : "scale-100"}
                    `}
                  >
                    {cartCount}
                  </span>
                )} */}

              <span className="text-xs">Cart</span>
            </Link>

            {/* USER / GUEST */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setAuthOpen(true); // open login/signup slider
                  } else {
                    setUserMenuOpen((prev) => !prev); // toggle dropdown
                  }
                }}
                className="flex flex-col items-center hover:text-pink-600 hover:cursor-pointer"
              >
                {/* <User size={20} /> */}
                <UserAvatar
                  name={profile?.name}
                  gender={profile?.gender}
                  size={26}
                />

                <span className="text-xs">
                  {isAuthenticated
                    ? `Hi ${formatUserName(profile?.name)} 👋`
                    : "Guest"}
                </span>
              </button>

              {/* USER DROPDOWN */}
              {isAuthenticated && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md z-50">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Account
                  </Link>

                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CATEGORY NAV */}
        <div className="hidden md:block border-t border-pink-100 bg-white/80">
          <nav className="mx-auto max-w-7xl px-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 py-3 text-sm font-medium text-gray-700">
              {headerCategories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/category/${item.slug}`}
                    className="hover:text-pink-600"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <Portal>
        {menuOpen && (
          <div
            className="fixed inset-0 z-[99999] bg-black/40 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="fixed left-0 top-0 h-full w-72 bg-white p-4 flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-pink-600 text-lg">
                  Menu
                </span>
                <button
                  className="hover:cursor-pointer "
                  onClick={() => setMenuOpen(false)}
                >
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* MOBILE SEARCH */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-200 focus-within:border-pink-400">
                    <input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search products"
                      className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchValue.trim()) {
                          router.push(
                            `/products?search=${encodeURIComponent(searchValue.trim())}`,
                          );
                          setSearchValue("");
                          setMenuOpen(false); // close hamburger
                        }
                      }}
                    />

                    <button
                      onClick={() => {
                        if (searchValue.trim()) {
                          router.push(
                            `/products?search=${encodeURIComponent(searchValue.trim())}`,
                          );
                          setSearchValue("");
                          setMenuOpen(false); // close hamburger
                        }
                      }}
                      className="text-pink-500 hover:text-pink-600"
                      aria-label="Search"
                    >
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                <ul className="space-y-3">
                  {headerCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/category/${c.slug}`}
                        onClick={() => setMenuOpen(false)}
                        className="block text-sm hover:text-pink-600"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-3 mt-4 text-xs text-gray-600">
                <p>🇮🇳 Made in India</p>
                <p className="text-[11px] text-gray-400">
                  © {new Date().getFullYear()} PhoolPatta
                </p>
              </div>
            </div>
          </div>
        )}
      </Portal>

      {/* ================= AUTH SLIDER ================= */}
      <AuthSlider open={authOpen} onClose={() => setAuthOpen(false)} />

        {toastState && (
  <div className="fixed top-5 right-5 z-[10000]">
    <ToastMessage
      title={toastState.title}
      description={toastState.description}
      type={toastState.type}
    />
  </div>
)}
    </header>
    
  );
};

export default Header;
