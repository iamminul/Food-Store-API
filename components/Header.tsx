'use client'

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

type Props = {}

const Header = (props: Props) => {
  return (
    //HEADER SECTION START
    <header className="bg-white border-blue-400 sticky top-0 z-50 backdrop-blur px-8 py-8">
      <div className="container flex justify-between items-center mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl">Food Store</h1>
        </Link>

        <nav className="flex justify-between items-center space-x-4">
          <Link
            href="/"
            className="font-bold text-muted-foreground hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="font-bold text-muted-foreground hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-bold text-muted-foreground hover:text-blue-600"
          >
            Contact
          </Link>
      {/* signin and signup button */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant='ghost' className=" text-black">
              Sign In
            </Button>
            </SignInButton>

          <SignUpButton>
            <Button variant={'default'} className=" text-white">
              Sign Up
            </Button>
          </SignUpButton>

        </SignedOut>
        {/* Show the user button when the user is signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
        </nav>
      </div>

    </header>
    //HEADER SECTION END
  )
}

export default Header