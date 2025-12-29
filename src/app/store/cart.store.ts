import { create } from "zustand";
import { Product } from "../_models/models";
import { productsFetch } from "../products/_fetch/products.api";
import { convertOffsetToTimes } from "motion/react";

interface IProductsStore {
  products: { product: Product; count: number }[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  increaseCount: (id: number) => void;
  decreaseCount: (id: number) => void;
}

export const useProductsStore = create<IProductsStore>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      const isALreadyExist = state.products.some(
        (p) => p.product.id === product.id
      );
      if (isALreadyExist) {
        return { ...state };
      } else {
        return {
          ...state,
          products: [...state.products, { product, count: 1 }],
        };
      }
    }),
  removeProduct: (id) =>
    set((state) => ({
      ...state,
      products: [
        ...state.products.filter((item) => {
          if (item.product.id !== id) return item;
        }),
      ],
    })),

  increaseCount: (id) =>
    set((state) => ({
      ...state,
      products: [
        ...state.products.filter((item) => {
          if (item.product.id === id) {
            console.log("test here", item);
            return { product: item.product, count: ++item.count };
          } else {
            return item;
          }
        }),
      ],
    })),

  decreaseCount: (id) =>
    set((state) => ({
      ...state,
      products: [
        ...state.products.filter((item) => {
          if (item.product.id === id) {
            return {
              product: item.product,
              count: item.count === 1 ? 1 : --item.count,
            };
          } else {
            return item;
          }
        }),
      ],
    })),
}));
