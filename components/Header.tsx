"use client";

import { Cherry } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

type Props = {};

const Header = (props: Props) => {
  return (
    //HEADER SECTION START
    <header className="bg-red-500 border-b border-blue-400 min-h-20 backdrop-blur-md top-0 z-50 sticky ">
      <div className="container max-w-6xl flex justify-between items-center mx-auto py-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Cherry className="w-6 h-6 text-yellow-500 hover:text-red-700 transition-colors"/> <h1 className="text-xl font-bold">Food Store</h1>
          </Link>
        </div>
        <nav className="flex items-center justify-between gap-4">
          <Link
            href={"/"}
            className="text-white font-bold hover:text-yellow-500"
          >
            Home
          </Link>
          <Link
            href={"about"}
            className="text-white font-bold hover:text-yellow-500"
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className="text-white font-bold hover:text-yellow-500"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
