import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import { Fira_Sans } from 'next/font/google';
import React from "react";

const firaSans = Fira_Sans({
    subsets: ['latin'], // Specify subsets if needed
    weight: ['400', '500', '700'], // Choose the weights you need
    style: ['normal', 'italic'], // Optional: Include styles
    variable: '--font-fira-sans', // Optional: Create a CSS variable
    display: 'swap', // Optional: Set font-display property
});

import { Averia_Libre } from "next/font/google";

const averiaLibre = Averia_Libre({
    subsets: ["latin"], // Specify subsets as needed
    weight: ["400", "700"], // Add weights you need (e.g., normal and bold)
    style: ["normal", "italic"], // Add styles if needed
});


export const metadata = {
  title: "Ulcer Detect",
  description: "Ulcer Detection and Monitoring using AI",
};

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
      <html lang="en" className={averiaLibre.className}>
      <body>
      <header>
          <nav className="flex items-center justify-between px-8 py-4 bg-[#C57B57] shadow-md sticky top-0 w-full z-50 text-[#251605]">
              {/* Branding Section */}
              <h1 className="font-extrabold text-4xl ">Ulcer Detect</h1>

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
                              <NavigationMenuLink href="/scan">
                                  Scan
                              </NavigationMenuLink>
                          </NavigationMenuItem>

                          <NavigationMenuItem>
                              <NavigationMenuLink href="/reports">
                                  Reports
                              </NavigationMenuLink>
                          </NavigationMenuItem>

                          <NavigationMenuItem>
                              <NavigationMenuTrigger className="text-2xl font-bold bg-[#C57B57]">
                                  Resources
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                  <NavigationMenuLink href="/">
                                      Link 1
                                  </NavigationMenuLink>
                                  <NavigationMenuLink href="/">
                                      Link 2
                                  </NavigationMenuLink>
                                  <NavigationMenuLink href="/">
                                      Link 3
                                  </NavigationMenuLink>
                              </NavigationMenuContent>
                          </NavigationMenuItem>
                      </NavigationMenuList>
                  </NavigationMenu>
              </div>

              {/* User Actions (Sign-In/Sign-Out/Profile) */}
              <div className="flex items-center space-x-6">
                  {!(await isAuthenticated()) ? (
                      <>
                          <LoginLink>
                              <Button variant="default">Sign in</Button>
                          </LoginLink>
                          <RegisterLink>
                              <Button variant="outline">Sign up</Button>
                          </RegisterLink>
                      </>
                  ) : (
                      <>
                          {/* Profile Section */}
                          <div className="flex items-center space-x-4">
                              {user?.picture ? (
                                  <Image
                                      className="w-10 h-10 rounded-full"
                                      src={user.picture}
                                      alt="User profile avatar"
                                      width={40}
                                      height={40}
                                      referrerPolicy="no-referrer"
                                  />
                              ) : (
                                  <div
                                      className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-lg font-semibold">
                                      {user?.given_name?.[0]}
                                      {user?.family_name?.[0]}
                                  </div>
                              )}
                              <div className="text-sm text-gray-700">
                                  {user?.given_name} {user?.family_name}
                              </div>
                          </div>
                          <LogoutLink>
                              <Button variant="default">Log out</Button>
                          </LogoutLink>
                      </>
                  )}
              </div>
          </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-screen flex flex-col bg-[#F7DBA7]">{children}</main>

      {/* Footer */}
      <footer className="p-8 bg-gray-100">
          <div className="text-center">
              <strong className="text-xl font-semibold">Ulcer Detect</strong>
              <small className="block text-gray-500">
                  © 2025 UlcerDetect, Inc. All rights reserved.
              </small>
          </div>
      </footer>
      </body>
      </html>
  );
}
