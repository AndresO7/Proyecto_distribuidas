import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Biblioteca ESPE",
  description: "El mejor sistema de bibliotecas"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
        <Navbar />
        {children}
        </div>
        
        </body>
    </html>
  );
}
