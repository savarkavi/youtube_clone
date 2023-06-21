import "./globals.css";
import { Inter } from "next/font/google";
import { AppContext } from "@/context/context";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Youtube Lite Clone",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AppContext>
          <Header />
          {children}
        </AppContext>
      </body>
    </html>
  );
}
