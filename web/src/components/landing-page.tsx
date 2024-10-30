"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4">
        <SidebarTrigger />
        <Button variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Connect with Google
        </Button>
      </header>

      <main className="flex flex-grow flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-center text-5xl font-bold">
          What do you want to learn?
        </h1>

        <div className="w-full max-w-2xl">
          <div className="mb-4 flex items-center rounded-lg bg-card p-4">
            <input
              type="text"
              placeholder="Enter YouTube playlist link..."
              className="flex-grow bg-transparent outline-none"
            />
            <button className="rounded bg-muted p-2">
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              {
                id: 1,
                title: "Learn React Basics",
                thumbnail: "/react-thumbnail.jpg",
              },
              {
                id: 2,
                title: "Advanced JavaScript Concepts",
                thumbnail: "/js-thumbnail.jpg",
              },
              {
                id: 3,
                title: "CSS Mastery Course",
                thumbnail: "/css-thumbnail.jpg",
              },
            ].map((playlist) => (
              <div
                key={playlist.id}
                className="overflow-hidden rounded-lg bg-card"
              >
                <Image
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  width={320}
                  height={180}
                  className="h-32 w-full object-cover"
                />
                <div className="p-2">
                  <h3 className="truncate text-sm font-medium">
                    {playlist.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex justify-center space-x-4 p-4 text-sm text-muted-foreground">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/support">Support</Link>
      </footer>
    </div>
  );
}
