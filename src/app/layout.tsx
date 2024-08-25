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
            <footer className=" inset-x-0 bottom-0 flex justify-center items-center w-full py-3 mt-auto text-slate-700">
              <div className="container flex flex-col items-center text-center">
                <p>&copy; {new Date().getFullYear()} BS112. All rights reserved.</p>
                <p>
                  <a href="#" className="hover:underline">Privacy Policy</a> |
                  <a href="#" className="hover:underline">Terms of Service</a>
                </p>
              </div>
            </footer>
          </main>
        </Provider>
      </body>
    </html>
  );
}