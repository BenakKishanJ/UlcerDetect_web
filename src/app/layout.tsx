import "./globals.css";

//import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
//import Image from "next/image";

import {
  ClerkProvider,
  //SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Fira_Sans } from "next/font/google";
import React from "react";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-fira-sans",
  display: "swap",
});

import { Averia_Libre } from "next/font/google";
import Footer from "@/components/utils/Footer";
import Navbar from "@/components/utils/Narbar";

const averiaLibre = Averia_Libre({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Ulcer Detect",
  description: "Ulcer Detection and Monitoring using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className={firaSans.className}>
        <body className="flex flex-col min-h-screen">
          <header className={`${firaSans.className} sticky top-0 z-50`}>
            <Navbar />
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-neutral">{children}</main>

          {/* Footer */}
          <div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
