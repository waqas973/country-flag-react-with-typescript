import axios from "axios";
import { Dispatch } from "redux";
import {
  CountryAction,
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_FAILER,
  FETCH_COUNTRIES_SUCCESS,
} from "../../types";

export function fetchAllCountriesLoading(): CountryAction {
  return {
    type: FETCH_COUNTRIES_LOADING,
  };
}

export function fetchAllCountriesSuccess(countries: []): CountryAction {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries,
  };
}

export function fetchAllCountriesFailure(error: string): CountryAction {
  return {
    type: FETCH_COUNTRIES_FAILER,
    payload: error,
  };
}

export function fetchCountries() {
  return (dispatch: Dispatch) => {
    dispatch(fetchAllCountriesLoading());
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countries = res.data;
        dispatch(fetchAllCountriesSuccess(countries));
      })
      .catch((err) => {
        dispatch(fetchAllCountriesFailure(err));
      });
  };
}
