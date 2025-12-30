import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Header from "./_layout/header";
import QueryClientContextProvider from "@/providers/react-query.provider";
import { QueryClient, QueryClientProvider } from "react-query";

const cario = Cairo({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: { template: "E-Commerce - %s", default: "E-Commerce" },
  description:
    "A great E-commerce website that you can browse products and buy whatever you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cario.variable}`}>
        <SonnerToaster
          toastOptions={{}}
          expand={false}
          position={"bottom-right"}
          closeButton
          richColors
          visibleToasts={4}
          duration={8000}
        />
        <Header />
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
