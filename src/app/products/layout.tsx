import { ButtonSheet } from "@/components/buttons-popups/buttons-popups";
import { ShoppingCart } from "lucide-react";
import Cart from "./_components/cart";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
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
    </div>
  );
}
