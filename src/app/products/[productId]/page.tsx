import Image from "next/image";
import React from "react";
import { productsFetch } from "../_fetch/products.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "This product Details page that contains extra information about the product itself",
};

interface PageProps {
  params: Promise<{ productId: number }>;
}

export async function generateStaticParams() {
  return (await productsFetch.getAll({})).map((product) => ({
    productId: product.id,
  }));
}

async function page({ params }: PageProps) {
  const product = await productsFetch.getOne({ id: (await params).productId });

  return (
    <div className="flex justify-center items-start pt-3 bg-slate-100 h-screen">
      <div className="flex gap-4 w-[800px]">
        <Image
          src={product.image}
          width={400}
          height={400}
          className="rounded-xl"
          alt="product_image"
        />
        <div className="flex flex-col gap-3">
          <p className="text-4xl">{product.title}</p>
          <p className="text-xl">{product.description}</p>
          <p className="text-lg text-blue-500">
            <b>Price: </b>
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
