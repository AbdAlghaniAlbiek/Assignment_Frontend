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

interface IProductsProps {
  filter: {
    category?: string;
    range?: number[]; // [min, max]
    title?: string;
  };
}

function Products({ filter }: IProductsProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(allProducts);

  useLayoutEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await productsFetch.getAll({});

      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    let filteredProducts = allProducts;
    if (filter.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category == filter.category
      );
    }
    if (filter.title) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filter.title!)
      );
    }
    if (filter.range && filter.range.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= filter.range![0] && product.price <= filter.range![1]
      );
    }

    setProducts(filteredProducts);
  }, [filter.category, filter.range, filter.title, allProducts]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 ">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <EmptyResult message="No products found" imageUrl={searchImage} />
      )}
    </div>
  );
}

export default Products;
