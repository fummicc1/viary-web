"use client";

import { LogInButton } from "@/components/auth";

export default function Login() {
  return (
    <div className="container ml-4 my-4 px-3 py-4 rounded-lg h-40 w-fit">
      <h1 className="text-xl font-medium">Welcome to Viary!</h1>
      <center className="p-2 w-fit">
        <LogInButton />
      </center>
    </div>
  );
}
