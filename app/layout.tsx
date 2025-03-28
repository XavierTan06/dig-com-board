'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideMenu from "../components/sidebar";
import { NicknameProvider } from "@/context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NicknameProvider> {/* Wrap the entire app in NicknameProvider */}
            
            <div className="page min-h-svh flex flex-col">
            <SideMenu />
            <div
              style={{
              height: typeof document !== "undefined" 
                ? document.querySelector('header')?.clientHeight || "56px" 
                : "56px",
              }}
            ></div>
            {children}
            </div>
        </NicknameProvider>
      </body>
    </html>
  );
}
