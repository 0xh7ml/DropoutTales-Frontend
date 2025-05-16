"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Headercom = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 bg-white z-10 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
              src="/dtt01.png"
              alt="Deshi Mula"
              width={90}
              height={70}
              className="h-12 w-auto"
            />
          <span className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">
            Dropout Tales
            {/* <span className="text-sm text-gray-500 align-baseline relative top-[-13px]">
              v2
            </span> */}
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {pathname !== "/share-story" && (
            <Link
              href="/share-story"
              className="btn-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm text-center font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Share Story
            </Link>
          )}
          <Link
            href="/contact-us"
            className="hidden sm:block btn-modern text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Headercom;
