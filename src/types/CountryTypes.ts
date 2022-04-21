// reducer case constant

export const FETCH_COUNTRIES_LOADING = "FETCH_COUNTRIES_LOADING";
export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
export const FETCH_COUNTRIES_FAILER = "FETCH_COUNTRIES_FAILER";

// types

export type CountryReducerState = {
  countries: Country[];
  isLoading: boolean;
  error: string;
};

export type Country = {
  name: { common: string };
  flags: { svg: string };
  region: string;
  subregion: string;
  population: number;
  nativeName: { spa: { common: string } };
  capital: string;
  languages: [{ name: string }];
};
// action types

export type FetchAllCountriesLoadingAction = {
  type: typeof FETCH_COUNTRIES_LOADING;
};
export type FetchAllCountriesSuccessAction = {
  type: typeof FETCH_COUNTRIES_SUCCESS;
  payload: [];
};
export type FetchAllCountriesFailureAction = {
  type: typeof FETCH_COUNTRIES_FAILER;
  payload: string;
};

export type CountryAction =
  | FetchAllCountriesLoadingAction
  | FetchAllCountriesSuccessAction
  | FetchAllCountriesFailureAction;
