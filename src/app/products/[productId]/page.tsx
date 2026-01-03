import Image from "next/image";
import React from "react";
import { productsFetch } from "../_fetch/products.api";
import { Metadata } from "next";
import db from "../../../../db.json";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "This product Details page that contains extra information about the product itself",
};

interface PageProps {
  params: Promise<{ productId: string }>;
}

export async function generateStaticParams() {
  return db.products.map((product) => ({
    productId: product.id.toString(),
  }));
}

// Note
// I used json-server lib to mock data and it works but I deployed to web hosting server it cause problems so I used route.ts functionality
// I was indorsed here to fetch data from db directly because of static rendering and generate static pages
// If there is a real API I'll use axios to fetch data directly and no problem at that moment and the static pages will rended successfully

async function page({ params }: PageProps) {
  const productId = Number.parseInt((await params).productId);
  const product = await db.products.find((p) => p.id === productId);

  if (!product) return notFound(); // critical for build-time safety

  return (
    <div className="flex lg:flex-row md:flex-row flex-col items-start md:justify-center lg:justify-center pt-3 bg-slate-100 h-screen">
      <div className="flex gap-4  lg:flex-row md:flex-row flex-col px-2 w-fit md:w-[800px] lg:w-[800px]">
        <Image
          src={product.image}
          width={400}
          height={400}
          className="rounded-xl"
          alt="product_image"
        />
        <div className="flex flex-col gap-3">
          <p className="lg:text-4xl md:text-4xl text-3xl">{product.title}</p>
          <p className="lg:text-xl md:text-lg w-fit">{product.description}</p>
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
