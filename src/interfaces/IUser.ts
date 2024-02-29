
export enum UserTypes {
  ADMINISTRATOR = 'ADMINISTRATOR',
  WAREHOUSE_USER = 'WAREHOUSE_USER',
  SELLER_USER = 'SELLER_USER',
  CLIENT_USER = 'CLIENT_USER',
}

export interface ICurrentUserResponse {
  code:    string;
  message: string;
  content: ICurrentUser;
}

export interface ICurrentUser {
  userId:           string;
  email:            string;
  dpi:              string;
  name:             string;
  surnames:         string;
  birthDate:        string;
  cellPhone:        string;
  phone:            string;
  referenceAddress: string;
  cityId:           string;
  cityName:         string;
  stateId:          string;
  stateName:        string;
  countryId:        string;
  countryName:      string;
}

export interface ICreateClient {
  name:             string;
  surnames:         string;
  cellPhone:        string;
  referenceAddress: string;
  citiesId:         number;
  email:            string;
  password:         string;
}

