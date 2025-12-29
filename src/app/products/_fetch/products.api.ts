import { EntityAPIs } from "@/helpers/axios/axios.entity";
import {
  IProductCreateDto,
  IProductReadDto,
  IProductUpdateDto,
} from "./products.dto";
import { Product } from "@/app/_models/models";

export const productsFetch = new EntityAPIs<
  IProductCreateDto,
  IProductUpdateDto,
  IProductReadDto,
  Product
>("products");
