"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function GithubStarCard() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("github-star-card");
    if (storedVisibility === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("github-star-card", "false");
  };

  if (!isVisible) return null;

  return (
    <Card
      className="relative rounded-none border-dashed"
      role="region"
      aria-labelledby="github-star-card-title"
    >
      <Button
        variant="ghost"
        onClick={handleClose}
        aria-label="Close GitHub Star Card"
        className="absolute right-2 top-2 h-4 w-4 cursor-pointer p-2"
      >
        <X />
      </Button>
      <CardContent className="flex flex-col items-center justify-center p-2">
        <Link
          href="https://github.com/sattwyk/kaizen"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost" })}
          aria-label="Star the Kaizen GitHub repository"
        >
          <Icons.github className="h-5 w-5" aria-hidden="true" />
          Give a ⭐
        </Link>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm text-muted-foreground">
          made with ❤️ by{" "}
          <Link
            href="https://sattwyk.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary decoration-wavy hover:text-muted-foreground hover:decoration-secondary-foreground"
          >
            sattwyk
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
