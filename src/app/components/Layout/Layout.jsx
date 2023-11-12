import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, session }) => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
