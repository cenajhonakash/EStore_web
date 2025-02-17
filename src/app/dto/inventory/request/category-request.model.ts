export class CategoryRequest {
  constructor(
    public title: string,
    public description: string,
    public coverImage: string,
    public deleteOldImages = false,
  ) { }
}

// export interface CategoryResponse{
//   categories: Category[]
// }