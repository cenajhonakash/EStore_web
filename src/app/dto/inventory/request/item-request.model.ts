export class ItemRequest {
    constructor(
        public category: number | undefined,
        public name: string,
        public brand: string,
        public description: string,
        public price: number | undefined,
        public discountPercent: number | undefined,
        public quantity: number | undefined,
        public imageUrl: string,
        public manage = false,
        public deleteOldImages = false
    ) { }
}