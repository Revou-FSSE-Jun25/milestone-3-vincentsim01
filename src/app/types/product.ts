export interface Product{
    id:number;
    title:string;
    slug:string;
    price:number;
    description:string;
    categoryId:number ;
    images:string[];
    totalItems?:number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


export interface ProductFormData {
    title:string;
    price:number;
    description:string;
    categoryId:number;
    // images:string[];
}