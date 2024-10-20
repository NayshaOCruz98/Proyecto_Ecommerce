export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
  image: string | null;
  creationDate: string;
  updateDate: string;
  status: string;
  warranty: string;
  specs: string;
  compatibility: string;
}

export interface CartItem extends Product {
  quantity: number;
}
