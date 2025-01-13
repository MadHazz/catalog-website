export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  description: string;
  features: string[];
  ingredients?: string[];
  weight: string;
  origin?: string;
}

export interface CartItem extends Product {
  selectedQuantity: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}