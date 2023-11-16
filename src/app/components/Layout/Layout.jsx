"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <nav className="top-0 sticky z-20">
        <Navbar />
      </nav>
      <main className="min-h-screen bg-white text-black">{children}</main>
      <footer>
        <Footer />
      </footer>
    </SessionProvider>
  );
};

export default Layout;
