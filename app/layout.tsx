import { ToasterProvider } from "@/providers/toast-provider";
import { Providers as ReduxProviders } from "@/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT Dashboard",
  description: "IoT Monitor using Thingsboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <ToasterProvider />
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
