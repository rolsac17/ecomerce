export interface IProductsResponse {
  code:    string;
  message: string;
  content: IProduct[];
}

export interface IProduct {
  id:             number;
  internalId:     string;
  name:           string;
  description:    string;
  previousPrice: number;
  price:          number;
  isOffer:        boolean;
  offer:          number;
  costOfShopping: number;
  inventary:      boolean;
  taxes:          number;
  deadline:       Date;
  stock:          number;
  status:         IStatusProduct;
  updatedAt:      Date;
  deliveryTime:   string;
  subcategory:    String;
  category:       string;
  detail:         DetailProduct[];
  images:         ImageProduct[] | null;
}

export enum IStatusProduct {
  Available = "AVAILABLE",
  NotAvailable = "NOT_AVAILABLE",
}

export interface DetailProduct {
  id:    number;
  label: string;
  value: string;
}

export interface ImageProduct {
  id:        number;
  key:       string;
  principal: boolean;
}







