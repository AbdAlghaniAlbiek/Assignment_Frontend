"use client";

import React, { useState } from "react";
import Products from "./products.list";
import ProductsFilter, { IProductsFilterProps } from "./products.filter";

function ProductsPage() {
  const [title, setTitle] = useState<IProductsFilterProps["title"] | undefined>(
    undefined
  );
  const [category, setCategory] = useState<
    IProductsFilterProps["category"] | undefined
  >(undefined);
  const [range, setRange] = useState<IProductsFilterProps["range"] | undefined>(
    undefined
  );

  const onFilterChange = (filter: IProductsFilterProps) => {
    setTitle(filter.title);
    setCategory(filter.category);
    setRange(filter.range);
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-row gap-20 justify-center pt-3">
      <ProductsFilter onChange={onFilterChange} />
      <Products filter={{ category, range, title }} />
    </div>
  );
}

export default ProductsPage;
