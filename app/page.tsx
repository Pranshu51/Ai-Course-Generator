import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <h1 className="text-3xl bg-amber-400">Hello, Next.js!</h1>
      <UserButton />
    </div>
  );
}
