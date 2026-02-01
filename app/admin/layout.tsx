import { UserButton } from "@clerk/nextjs";
import { Divide } from "lucide-react";
import React, { Suspense } from "react";

type Props = {};

export default function AdminLayout({children,}:{children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex justify-between items-center h-16 px-6">
          <div>
            <h1 className="font-bold text-xl">Food Store Admin</h1>
          </div>
          <div className="flex items-center justify-between">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
      </main>
    </div>
  );
}
