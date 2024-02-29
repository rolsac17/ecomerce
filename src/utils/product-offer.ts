import { IProduct } from "interfaces/IProducts";

export const isOffer = (products: IProduct[]) => {
  return products.filter(p => p.isOffer === true).slice(0, 4);
}
