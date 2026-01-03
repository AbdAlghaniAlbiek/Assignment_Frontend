import { Product } from "@/app/_models/models";
import { useProductsStore } from "@/app/store/cart.store";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProductProps {
  product: Product;
}

function ProductItem({ product }: IProductProps) {
  const router = useRouter();
  const addProduct = useProductsStore((state) => state.addProduct);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      whileHover={{ translateY: -8 }}
      key={product.id}
      className="border rounded-lg flex flex-col lg:w-[160px] md:w-[160px]  shadow-sm cursor-pointer justify-stretch"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      {/* <Image
            src={product.image}
            alt="product_image"
            width={120}
            height={100}
            className="object-fill"
            // className="object-fill"
          /> */}
      <img
        src={product.image}
        className="  lg:w-[160px] md:w-[160px] h-[160px]  object-fill rounded-lg"
        alt="product_image"
      />
      <div className="mt-3 flex flex-col gap-2 p-3">
        <p className="font-bold text-xl">{product.title}</p>
        <div className="flex flex-row justify-between">
          <p>
            <b>Price: </b>
            {product.price}
          </p>

          <Plus
            className="border bg-blue-500 rounded-full hover:bg-blue-600 border-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              addProduct(product);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductItem;
