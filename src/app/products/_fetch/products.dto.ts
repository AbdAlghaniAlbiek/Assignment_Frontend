export interface IProductCreateDto {}
export interface IProductUpdateDto extends Partial<IProductCreateDto> {}
export interface IProductReadDto {
  category: string;
  range: { min: number; max: number };
}
