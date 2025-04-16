import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";
import { viVN } from "@clerk/localizations";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create a client
const queryClient = new QueryClient();

function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      localization={viVN}
    >
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <header>
            <Link to="/" className="logo">
              <img src="./logoVLU.png" alt="" />
              <span>VLUITGenie</span>
            </Link>
            <div className="user">
              {/* Hiển thị SignInButton nếu chưa đăng nhập */}
              <SignedOut>
                <SignInButton mode="modal" redirectUrl="/dashboard">
                  <p className="signInButton">
                    Đăng nhập
                  </p>
                </SignInButton>
              </SignedOut>

              {/* Hiển thị UserButton nếu đã đăng nhập */}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
