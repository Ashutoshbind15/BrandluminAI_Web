"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../utilUI/ui/toaster";

const queryClient = new QueryClient();

const Layout = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className="" id="">
          <nav className="top-0 sticky z-20">
            <Navbar />
          </nav>
          <main className="min-h-screen bg-white text-black">{children}</main>
          <Toaster />
          <footer>
            <Footer />
          </footer>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Layout;
