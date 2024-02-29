export interface OrdersResponse {
  code:    string;
  message: string;
  content: IOrderDetail[];
}

export interface IOrderDetail {
  id:                  number;
  createdAt:           string;
  clientQualification: number;
  clientName:          string;
  clientSurnames:      string;
  clientBirthDate:     string;
  clientCellPhone:     string;
  clientPhone:         string;
  shippingAddress:     string;
  amount:              number;
  discount:            number;
  totalAmount:         number;
  detail:              ContentDetail[];
}

export interface ContentDetail {
  quantity:     number;
  price:        number;
  discountRate: number;
  discount:     number;
  amount:       number;
  product:      Product;
}

export interface Product {
  id:             number;
  internalId:     string;
  name:           string;
  description:    string;
  price:          number;
  isOffer:        boolean;
  offer:          number;
  costOfShopping: number;
  inventary:      boolean;
  taxes:          number;
  deadline:       string;
  stock:          number;
  status:         string;
  updatedAt:      string;
  deliveryTime:   string;
  subcategory:    string
  category:       string;
  warehousesId:   string;
  detail:         ProductDetail[];
  images:         Image[] | null;
}

export interface ProductDetail {
  id:    number;
  label: string;
  value: string;
}


export interface Image {
  id:        number;
  key:       string;
  principal: boolean;
}

export interface CreateOrder {
  name:            string;
  surnames:        string;
  cellPhone:       string;
  email:           string;
  shippingAddress: string;
  cityId:          number;
  sellerId:        string;
  couponId:        string;
  observation:     string;
  orderDetail:     OrderDetail[];
}

export interface OrderDetail {
  quantity:  number;
  productId: number;
}




