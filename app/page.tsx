"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <SignedIn>
        <div className=" flex flex-col justify-center items-center min-h-screen mx-auto pt bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Welcome to Food Store Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Button asChild size={"lg"}>
            <Link href={"/admin"}>Go to Dashboard</Link>
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        <div className=" flex flex-col justify-center items-center min-h-screen mx-auto pt bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Food Store Admin</h1>
            <p className="text-muted-foreground mt-2">
              Admin dashboard for food store management
            </p>
          </div>
          <div className="flex space-x-4">
            <Button asChild size={"lg"}>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>

            <Button asChild variant={"outline"}>
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </SignedOut>

      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </>
  );
}
