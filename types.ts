export interface Order {
  _id: string;
  status: string;
  shipAddress: Address;
  line: Line[];
  customer: Customer;
  totalPrice: number;
}

export interface Customer {
  name: string;
}

export interface Product {
  name: string;
  description: string;
}

export interface Line {
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  zipCode: string;
  street: string;
  city: string;
  state: string;
}
