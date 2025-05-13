"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../AuthContext";

export default function ClientWrapper({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SessionProvider>
    );
}