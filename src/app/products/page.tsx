import { Metadata } from "next";
import React from "react";
import Products from "./_components/products.list";
import ProductsFilter from "./_components/products.filter";
import ProductsPage from "./_components/products.page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "This products page that contains list of products showing just image, title and image for each card",
};

function page() {
  return <ProductsPage />;
}

export default page;
