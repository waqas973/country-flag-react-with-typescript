import {
  CountryReducerState,
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILER,
  CountryAction,
} from "../../types";

const initState: CountryReducerState = {
  countries: [],
  isLoading: false,
  error: "",
};

export default function countryReducer(
  state: CountryReducerState = initState,
  action: CountryAction
) {
  switch (action.type) {
    // fetching country , loading true
    case FETCH_COUNTRIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    //    if fetching successful
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
        error: "",
      };
    //    if fetching failure
    case FETCH_COUNTRIES_FAILER:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
