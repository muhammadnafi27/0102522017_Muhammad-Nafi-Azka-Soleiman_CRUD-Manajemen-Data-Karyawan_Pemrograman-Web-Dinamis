import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manajemen Data Karyawan",
  description: "Aplikasi CRUD Karyawan dengan Next.js dan Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-slate-50 flex h-screen overflow-hidden`}>
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
