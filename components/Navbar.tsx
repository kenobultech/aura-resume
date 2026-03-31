// components/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, User, LogOut, CreditCard } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Navbar() {


   const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  
 if (pathname.startsWith('/preview') || pathname.startsWith('/builder')) return null;

  return (
    <>
      {/* 
        FLOATING PILL NAVBAR 
        Positioned absolutely/fixed at the top, centered, with rounded full corners
      */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border border-gray-100 rounded-full px-4 md:px-8 py-3 transition-all">
        <div className="flex justify-between items-center w-full">
          {/* 1. LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/main-logo.png"
              alt="AuraResume Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">
              AuraResume
            </span>
          </Link>

          {/* 2. DESKTOP CENTER LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              Home
            </Link>

            <Link
              href="/#about"
              className="text-black hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              About Us
            </Link>

            {/* Templates Dropdown */}
            <div className="group relative flex items-center">
              <Link
                href="/templates"
                className="flex items-center gap-1 text-black hover:text-blue-600 text-sm font-semibold transition-colors"
              >
                Templates
                <ChevronDown size={14} />
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 hidden group-hover:block transition-all">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                  <Link
                    href="/templates?type=Free"
                    className="flex justify-between items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                  >
                    Free{" "}
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-1 rounded-full font-bold">
                      0 KSH
                    </span>
                  </Link>
                  <Link
                    href="/templates?type=Corporate"
                    className="flex justify-between items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                  >
                    Corporate{" "}
                    <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold">
                      Pro
                    </span>
                  </Link>
                  <div className="border-t border-gray-50 my-1"></div>
                  <Link
                    href="/templates"
                    className="block px-4 py-3 text-xs font-bold text-center text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    View All Templates
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="text-black hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              Pricing
            </Link>

            {/* CHANGE THIS: href="#faq" -> href="/#faq" */}
            <Link
              href="/#faq"
              className="text-black hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/resume-improver"
              className="text-black hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              Upload Resume
            </Link>
          </div>

          {/* 3. AUTH SECTION & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse"></div>
              </div>
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-blue-200 transition-colors"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <User size={18} />
                    </div>
                  )}
                  <span className="text-sm font-bold text-black max-w-[100px] truncate">
                    {session.user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} className="text-slate-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-2">
                    <div className="px-5 py-3 border-b border-gray-50 mb-2">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/subscription"
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <CreditCard size={16} />
                      My Subscription
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="bg-[#0086FF] hover:bg-[#0070d6] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Sign Up Now
                </Link>
              </>
            )}
          </div>

          {/* 4. MOBILE HAMBURGER */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-sm bg-white rounded-3xl shadow-xl border border-gray-100 z-40 overflow-hidden">
          <div className="px-6 py-8 space-y-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              About Us
            </Link>
            <Link
              href="/templates"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              FAQ
            </Link>
              <Link
              href="/resume-improver"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-black hover:text-blue-600"
            >
              Upload Resume
            </Link>

            <div className="border-t border-gray-100 pt-6">
              {session ? (
                <>
                  <Link
                    href="/subscription"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-semibold text-black mb-6 hover:text-blue-600"
                  >
                    <CreditCard size={20} className="text-blue-500" />
                    My Subscription
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-3 text-lg font-semibold text-red-600"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full border-2 border-slate-200 px-6 py-3.5 rounded-xl text-center font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[#0086FF] text-white px-6 py-3.5 rounded-xl text-center font-bold shadow-md"
                  >
                    Sign Up Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
