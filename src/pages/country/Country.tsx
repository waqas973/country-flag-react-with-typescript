import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { fetchCountries, addCountryToCart } from "../../redux/actions";
import { AppState } from "../../types";

import "./country.scss";

const Country = () => {
  const { name } = useParams() as any;
  const history = useNavigate();

  const dispatch = useDispatch();

  const countries = useSelector(
    (state: AppState) => state.countryReducer.countries
  );
  //cart state
  const cart = useSelector((state: AppState) => state.cartReducer.cart);

  const [currentCountry, setCurrentCountry] = useState(
    countries.filter((country) => country.name.common === name)[0]
  );
  //dispatch fetchAllCountries when page loads
  React.useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  //update currentCountry when we have countries data

  React.useEffect(() => {
    setCurrentCountry(
      countries.filter((country) => country.name.common === name)[0]
    );
  }, [countries, name]);

  return (
    <div className="country-page">
      <div className="country-page__go-back">
        <Button
          onClick={() => history("/")}
          className="btn btn__text"
          size="small"
          variant="text"
        >
          <ArrowBackIosIcon />
          Go back
        </Button>
      </div>
      {currentCountry && currentCountry.name && (
        <div className="country-page__details">
          <div className="country-page__details-left">
            <img
              src={currentCountry.flags.svg}
              alt={currentCountry.name.common}
            />
            <h2 className="country-card__name">{currentCountry.name.common}</h2>
          </div>
          <div className="country-page__details-right">
            <div className="country-page__details-right-list">
              <h2>Population: </h2>{" "}
              <h2 className="right">
                {currentCountry.population.toLocaleString("en")}
              </h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>Region: </h2>{" "}
              <h2 className="right">{currentCountry.region}</h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>Sub-region: </h2>{" "}
              <h2 className="right">{currentCountry.subregion}</h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>Native name: </h2>{" "}
              <h2 className="right">
                {currentCountry.nativeName?.spa?.common}
              </h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>Capital city: </h2>{" "}
              <h2 className="right">{currentCountry.capital}</h2>
            </div>
          </div>
        </div>
      )}
      <div className="country-page__actions">
        <Button
          className="btn btn__primary"
          onClick={() => dispatch(addCountryToCart(currentCountry))}
          disabled={cart.includes(currentCountry as never)}
        >
          {" "}
          Add to cart{" "}
        </Button>
      </div>
    </div>
  );
};

export default Country;
