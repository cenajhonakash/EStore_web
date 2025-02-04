import { ItemResponse } from "./product.model";

export class CategoryResponse {
  constructor(
    public name: string,
    public about: string,
    public coverImage: string,
    public id: string,
    public products: ItemResponse[]
  ) { }
}

// export interface CategoryResponse {
//   categories: CategoryResponse[]
// }