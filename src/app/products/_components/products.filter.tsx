"use client";

import React, { useEffect } from "react";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useDebounce } from "@/hooks/use-debounce";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";

export interface IProductsFilterProps {
  title: string;
  range: number[]; // [min, max]
  category: string;
}

interface IProductsComponentFilterProps {
  onChange: (filter: IProductsFilterProps) => void;
}

function ProductsFilter({ onChange }: IProductsComponentFilterProps) {
  const [title, setTitle] = useQueryState<IProductsFilterProps["title"]>(
    "title",
    parseAsString.withDefault("")
  );

  const [category, setCategory] = useQueryState<
    IProductsFilterProps["category"]
  >("category", parseAsString.withDefault(""));

  const [range, setRange] = useQueryState<IProductsFilterProps["range"]>(
    "range",
    parseAsArrayOf(parseAsInteger).withDefault([])
  );

  const debounceTitle = useDebounce(title);
  const debounceRange = useDebounce(range);

  useEffect(() => {
    onChange({
      title: debounceTitle,
      range: debounceRange,
      category,
    });
  }, [debounceRange, debounceTitle, category]);

  return (
    <div className="flex flex-col gap-3 bg-white h-fit p-5 shadow-md rounded-lg">
      <h3>
        <b>Filter</b>
      </h3>
      {/** Title */}
      <div>
        <Label>Title</Label>
        <Input
          className="w-[200px]"
          placeholder="Shoozy market"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/** Category */}
      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shoes">Shoes</SelectItem>
            <SelectItem value="tshirt">T-Shirt</SelectItem>
            <SelectItem value="jeans">Jeans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/** Range */}
      <div>
        <Label>Price Range</Label>
        <RangeSlider
          className="mt-4"
          min={0}
          max={100}
          id="slider"
          onInput={(e) => setRange([e[0], e[1]])}
        />
        {/* <Slider
          id="slider"
          max={100}
          min={0}
          onValueChange={setRange}
          value={range}
        /> */}
      </div>
    </div>
  );
}

export default ProductsFilter;
