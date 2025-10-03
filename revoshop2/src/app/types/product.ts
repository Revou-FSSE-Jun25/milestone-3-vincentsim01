export interface Product{
    id:number;
    title:string;
    price:number;
    description:string;
    category:{[key: string]: any } ;
    images:string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}