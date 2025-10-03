export interface Product{
    id:number;
    title:string;
    slug:string;
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


export interface ProductFormData {
    id:number;
    title:string;
    slug:string;
    price:number;
    description:string;
    category:{[key: string]: any } ;
    images:string[];
}