import { Item } from "./item.model";

export class CategoryResponse {
  constructor(
    public name: string,
    public about: string,
    public coverImage: string,
    public id: string,
    public products: Item[]
  ) { }
}

export interface CategoryResponse{
  categories: CategoryResponse[]
}