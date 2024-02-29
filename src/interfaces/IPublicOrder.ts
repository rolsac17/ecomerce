export interface ResponsePublicOrder {
  code?:    string;
  message: string;
  content?: IPublicOrder;
}

export interface IPublicOrder {
  orderId:         number;
  shippingAddress: string;
  city:            string;
  state:           string;
  country:         string;
  clientName:      string;
  cellPhone:       string;
  phone:           string;
  email:           string;
  coupon:          string;
  subTotal:        number;
  discount:        number;
  costOfShipping:  number;
  total:           number;
  createdAt:       string;
  detail:          IPublicOrderDetail[];
}

export interface IPublicOrderDetail {
  productId:          number;
  quantity:           number;
  price:              number;
  discount:           number;
  costOfShipping:     number;
  productName:        string;
  productDescription: string;
  productDetail:      ProductDetail[];
  productImages:      ProductImage[];
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface ProductImage {
  key:       string;
  principal: boolean;
}
