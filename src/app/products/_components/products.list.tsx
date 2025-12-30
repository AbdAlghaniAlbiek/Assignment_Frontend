"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { productsFetch } from "../_fetch/products.api";
import { Product } from "@/app/_models/models";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { filterProps, motion } from "motion/react";
import ProductItem from "./product.item";
import EmptyResult from "@/components/placeholders/empty-results";
import searchImage from "@/assets/search.png";
import { useQuery } from "react-query";
import { toast } from "sonner";
import LargeLoader from "@/components/loaders/large-loader";

interface IProductsProps {
  filter: {
    category?: string;
    range?: number[]; // [min, max]
    title?: string;
  };
}

function Products({ filter }: IProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading, isError, error } = useQuery<
    Product[],
    any,
    any,
    any
  >({
    queryKey: ["products"],
    queryFn: () => productsFetch.getAll({}),
  });

  useEffect(() => {
    if (error && isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useLayoutEffect(() => {
    let filteredProducts = data;
    if (filter.category) {
      filteredProducts = filteredProducts.filter(
        (product: Product) => product.category == filter.category
      );
    }
    if (filter.title) {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(filter.title!)
      );
    }
    if (filter.range && filter.range.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product: Product) =>
          product.price >= filter.range![0] && product.price <= filter.range![1]
      );
    }

    setProducts(filteredProducts);
  }, [filter.category, filter.range, filter.title, data]);

  const showContent = () => {
    if (products && Products.length > 0) {
      return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 ">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      );
    } else if (isLoading) {
      return <LargeLoader />;
    } else {
      return <EmptyResult message="No products found" imageUrl={searchImage} />;
    }
  };

  return <div>{showContent()}</div>;
}

export default Products;
