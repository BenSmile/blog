import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "Blog",
};

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode; session: any
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <div className='main'>
            <div className="gradient" />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}