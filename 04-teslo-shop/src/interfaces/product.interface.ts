export interface Product {
   // id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Sizes[];  //type
    slug: string;
    tags: string[];
    title: string;
    type: Type;        //type   
    gender: Category  //type
}

export type Category = 'men'|'women'|'kid'|'unisex'
export type Sizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';