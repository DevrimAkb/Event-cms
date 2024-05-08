import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "./(root)/_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
        </main>
        <Footer/>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
