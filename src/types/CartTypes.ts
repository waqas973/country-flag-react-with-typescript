// reducer case constant

export const ADD_COUNTRY_TO_CART = "ADD_COUNTRY_TO_CART";
export const REMOVE_COUNTRY_FROM_CART = "REMOVE_COUNTRY_FROM_CART";

// types

export type CartReducerState = {
  cart: [];
};

// action types

export type AddCountryToCartAction = {
  type: typeof ADD_COUNTRY_TO_CART;
  payload: object;
};
export type AddCountryFromCartAction = {
  type: typeof REMOVE_COUNTRY_FROM_CART;
  payload: object;
};

export type CartAction = AddCountryToCartAction | AddCountryFromCartAction;
