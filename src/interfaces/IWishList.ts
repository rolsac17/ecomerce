import { WishList } from "@components/ecommerce/wish-list";

export interface ResponseWishList {
  code: string;
  message: string;
  content: WishList[] | {};
}

export interface WishList {
  id: number;
  name: string;
  created_at: string;
  event: string;
  detail: ProductWishList[] | null;
}

export interface ProductWishList {
  id: number;
  name: string;
  description: string;
  price: number;
  isOffer: boolean;
  offer: number;
  inventary: boolean;
  stock: number;
  status: string;
  images: ImageWishlist[];
  detail: DetailWishlist[];
}

export interface DetailWishlist {
  label: string;
  value: string;
}

export interface ImageWishlist {
  key: string;
  principal: boolean;
}

export interface postWishlist {
  name: string;
  eventId: number;
  id?: number;
}
