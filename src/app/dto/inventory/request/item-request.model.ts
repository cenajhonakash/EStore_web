export class ItemRequest {
    constructor(
        public category = 0,
        public name: string = '',
        public brand: string = '',
        public description: string = '',
        public price = 0.0,
        public discountPercent = 0.0,
        public quantity = 0,
        public imageUrl: string = '',
        public manage = false  
    ) { }
}