import Header from "@/components/Header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquareLibrary } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto bg-gray-100">
      <Header />

      <main className="container mx-auto">
        <div className="max-w-4xl mx-auto mt-15">
          <h1 className="text-4xl md:text-2xl font-bold mb-6">
            Welcome to
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Main Section
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit. Voluptate, dolores.
          </p>
        </div>

        
      </main>
    </div>
  );
}
