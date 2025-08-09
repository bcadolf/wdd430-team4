"use client";
import { signIn } from "next-auth/react";

export default function GoogleSignIn() {
    return (
        <button className="bg-blue-500 text-white rounded m-8 px-5 py-3 font-bold hover:bg-blue-700 transition-colors cursor-pointer "onClick={() => signIn("google")}>
            Sign in with Google
        </button>
    );
}