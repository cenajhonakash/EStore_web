export class ItemResponse {
  constructor(
    public itemId: string,
    public name: string,
    public brand: string,
    public description: string,
    public price = 0.0,
    public discountPercent = 0.0,
    public quantity = 0,
    public image: string,
    public type: string,
    public addedDate: any,
    public updateDate: any,
    public images: String[]
  ) { }
}