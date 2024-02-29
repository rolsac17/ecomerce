export interface ICartProduct {
  id: number;
  internalId: string;
  name: string;
  description: string;
  price: number;
  images: string;
  quantity: number;
  costOfShopping: number;
  inventory: boolean;
  stock: number;
  isOffer: boolean;
  previousPrice: number;
  offer: number;
}

export interface ICupon {
  code: string;
  warehousesId: string;
  amount: number;
}

export interface IShoppingAddress {
  name: string;
  surnames: string;
  email: string;
  shippingAddress: string;
  citiesId: string;
  cityName?: string;
  country: string;
  countryName?: string;
  stateId: string;
  stateName?: string;
  cellPhone: string;
  observation?: string;
}
