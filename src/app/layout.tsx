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
  //NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

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
    <html lang="en">
      <body>
        <header>
          <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 w-full z-50">
            {/* Branding Section */}
            <h1 className="font-extrabold text-2xl">Ulcer Detect</h1>

            {/* Navigation Items */}
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
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink href="/dashboard">
                            Home
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuLink href="scan">
                            Scan
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuLink href="/reports">
                            Reports
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink href="/">
                            Link
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                        
                    </NavigationMenuList>
                  </NavigationMenu>

                  {/* Profile Picture or Initials */}
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
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-lg font-semibold">
                        {user?.given_name?.[0]}
                        {user?.family_name?.[0]}
                      </div>
                    )}
                    {/* User Name */}
                    <div className="text-sm text-gray-700">
                      {user?.given_name} {user?.family_name}
                    </div>
                  </div>

                  {/* Logout Button */}
                  <LogoutLink>
                    <Button variant="default">Log out</Button>
                  </LogoutLink>
                </>
              )}
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

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