export interface ILoginResponse {
  code: string;
  message: string;
  content: IUserResponse;
}

export interface IUserResponse {
  name: string;
  surnames: string;
  type: IUserTypes;
  token: string;
}

export enum IUserTypes {
  ADMINISTRATOR = 'ADMINISTRATOR',
  WAREHOUSE_USER = 'WAREHOUSE_USER',
  SELLER_USER = 'SELLER_USER',
  CLIENT_USER = 'CLIENT_USER',
}
