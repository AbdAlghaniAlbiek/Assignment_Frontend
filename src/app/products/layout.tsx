"use client";

import { ButtonSheet } from "@/components/buttons-popups/buttons-popups";
import { ShoppingCart } from "lucide-react";
import Cart from "./_components/cart";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                // gcTime: 0, // Minute (time for caching)
                refetchOnMount: true,
                refetchOnWindowFocus: false,
                retry: 2,
                retryDelay: 1000,
                staleTime: 0,
              },
            },
          })
        }
      >
        {children}
        <div className="fixed right-[40px] bottom-[40px]">
          <ButtonSheet
            actionStatus={{
              status: "Other",
              otherIcon: <ShoppingCart />,
              otherBgColor: "blue",
              otherBgHoverColor: "blue",
            }}
            sheetProps={{ title: "Shopping Cart", content: <Cart /> }}
            buttonProps={{ rounded: "rounded-full", width: 60 }}
          />
        </div>
      </QueryClientProvider>
    </div>
  );
}
