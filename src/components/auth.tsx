"use client";
import { signIn, signOut } from "next-auth/react";
import { GoogleLoginButton } from "react-social-login-buttons";

export const LogInButton = () => {
  return (
    <GoogleLoginButton
      onClick={() =>
        signIn("google", {
          callbackUrl: "/timeline",
        })
      }
    />
  );
};

export const LogOutButton = () => {
  return (
    <button
      className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-full"
      onClick={async () => {
        await signOut({
          redirect: true,
          callbackUrl: "/login",
        });
      }}
    >
      ログアウト
    </button>
  );
};
