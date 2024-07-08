import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SessionWrapper from "./component/SessionWrapper";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai- A website for chai lovers",
  description: "this website is crwod funding website for chai lovers",
};
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>

        <SessionWrapper>

        <Navbar />
        <div className=" overflow-hidden	 min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          {children}
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
