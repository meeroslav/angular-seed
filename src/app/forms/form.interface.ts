export interface User {
  name: string;
  favoriteNumber: number;
  favoriteColor: string;
  observation: string;
  optin: boolean;
  newsLetter: string;
}

export interface Colors {
  id: number;
  color: string
}

export interface Movie{
  firstRate: number;
  secondRate: number;
  averageRating: number;
}

export interface ISWPlanet{
  name: string;
  terrain: string;
  climate: string;
}
