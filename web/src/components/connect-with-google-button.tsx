"use client";

import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { useTransition } from "react";

export enum IconSize {
  Small = "4",
  Default = "5",
  Large = "6",
}

export interface ConnectWithGoogleButtonProps extends ButtonProps {
  iconSize?: IconSize;
}

export function ConnectWithGoogleButton({
  iconSize = IconSize.Default,
  ...props
}: ConnectWithGoogleButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className={`${props.className} ${isPending ? "cursor-wait" : ""}`}
      {...props}
    >
      {isPending ? (
        <Icons.spinner
          className={`mr-2 h-${iconSize} w-${iconSize} animate-spin`}
        />
      ) : (
        <Icons.google className={`mr-2 h-${iconSize} w-${iconSize}`} />
      )}
      {isPending ? "Loading..." : "Connect with Google"}
    </Button>
  );
}
