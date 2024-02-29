export interface IProductIDResponse {
  code: string;
  message: string;
  content: IProductByID;
}

export interface IProductByID {
  id: number;
  internalId: string;
  name: string;
  description: string;
  price: number;
  previousPrice: number;
  isOffer: boolean;
  offer: number;
  costOfShopping: number;
  inventory: boolean;
  taxes: number;
  deadline: string;
  stock: number;
  status: IStatusProductByID;
  subcategory: string;
  category: string;
  images: ImageProductByID[];
  details: DetailProductByID[];
  isAvailable?: boolean;
}

export enum IStatusProductByID {
  Available = 'AVAILABLE',
  NotAvailable = 'NOT_AVAILABLE',
}

export interface DetailProductByID {
  label: string;
  value: string;
}

export interface ImageProductByID {
  key: string;
  principal: boolean;
}
