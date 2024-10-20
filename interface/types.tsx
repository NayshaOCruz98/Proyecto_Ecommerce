export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  regularPrice: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
