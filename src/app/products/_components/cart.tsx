"use client";

import { useProductsStore } from "@/app/store/cart.store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

function Cart() {
  const products = useProductsStore((state) => state.products);
  const increaseCount = useProductsStore((state) => state.increaseCount);
  const decreaseCount = useProductsStore((state) => state.decreaseCount);
  const removeProduct = useProductsStore((state) => state.removeProduct);

  console.log("prod", products);

  return (
    <>
      <p className="mb-3">
        Total Price:{" "}
        {products.reduce(
          (total, item) => total + item.product.price * item.count,
          0
        )}
      </p>
      <div className="flex flex-col gap-2">
        {products &&
          products.length > 0 &&
          products.map((item) => (
            <div
              key={item.product.id}
              className="border rounded-md flex flex-row justify-between p-3 items-center"
            >
              <div className="flex flex-row gap-2">
                <Plus
                  className=" rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    console.log(item.product.id);
                    increaseCount(item.product.id);
                  }}
                />
                <p className="">{item.count}</p>
                <Minus
                  className=" rounded-full bg-red-500 hover:bg-red-600"
                  onClick={() => decreaseCount(item.product.id)}
                />
                <p className="ml-3">{item.product.title}</p>
              </div>

              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => removeProduct(item.product.id)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Cart;
