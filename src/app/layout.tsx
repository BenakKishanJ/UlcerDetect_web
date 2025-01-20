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
    <ClerkProvider>
      <html lang="en" className={firaSans.className}>
        <body className="flex flex-col min-h-screen">
          <header className={`${firaSans.className} sticky top-0 z-50`}>
            <nav className="flex items-center justify-between px-8 py-4 bg-primary shadow-md w-full text-neutral ">
              {/* Branding Section */}
              <h1 className="font-extrabold text-4xl">
                <em className={averiaLibre.className}>Ulcer Detect</em>
              </h1>

              {/* Navigation Items */}
              <div className="flex-1 flex justify-center">
                <NavigationMenu className="flex space-x-8 text-2xl font-bold">
                  <NavigationMenuList className="flex space-x-8">
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/dashboard">
                        Home
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink href="/scan">Scan</NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink href="/reports">
                        Reports
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-2xl font-bold bg-primary">
                        Resources
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-primary">
                        <NavigationMenuLink href="/">Link 1</NavigationMenuLink>
                        <NavigationMenuLink href="/">Link 2</NavigationMenuLink>
                        <NavigationMenuLink href="/">Link 3</NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* User Actions (Sign-In/Sign-Out/Profile) */}
              <div className="m-0 text-white">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-neutral">{children}</main>

          {/* Footer */}
          <footer className="p-8 bg-secondary">
            <div className="text-center text-xl font-semibold text-black">
              <strong className={averiaLibre.className}>Ulcer Detect</strong>
              <small className="block text-highlight">
                © 2025 UlcerDetect, Inc. All rights reserved.
              </small>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}

