import {
  CartAction,
  ADD_COUNTRY_TO_CART,
  REMOVE_COUNTRY_FROM_CART,
} from "../../types";

export function addCountryToCart(country: object): CartAction {
  return {
    type: ADD_COUNTRY_TO_CART,
    payload: country,
  };
}

export function removeCountryFromCart(country: object): CartAction {
  return {
    type: REMOVE_COUNTRY_FROM_CART,
    payload: country,
  };
}
