"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  // TODO: Add different auth states
  return (
    <>
      {/* 已登录 */}
      <SignedIn>
        <UserButton />
        {/* Add menu items for Studio and User profile */}
      </SignedIn>

      {/* 未登录 */}
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"
          >
            <UserCircleIcon className="size-4" />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
