import { Button } from "@material-ui/core";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./countryCard.scss";

interface CountryCardProps {
  flags: string;
  name: string;
  region: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

const CountryCard = (props: CountryCardProps) => {
  const { name, region, flags, onClick, disabled } = props;

  return (
    <div className="country-card">
      <div className="country-card__wrapper">
        <Link to={`/country/${name}`}>
          <img src={flags} alt="flag" />

          <h2 className="country-card__name">{name}</h2>
          <h2 className="country-card__region">{region}</h2>
        </Link>
        <div className="country-card__action">
          <Button
            className="btn btn__primary"
            disabled={disabled}
            onClick={onClick}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
