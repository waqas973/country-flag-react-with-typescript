import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "../Search/Search";
import "./appbar.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../types";
import CartMenu from "../CartMenu/CartMenu";

interface SidebarProps {
  onClick: Function;
  drawerState: boolean;
}

const Appbar = (props: SidebarProps) => {
  const { onClick, drawerState } = props;

  const cart = useSelector(({ cartReducer }: AppState) => cartReducer.cart);

  //cart menu open related state and functions

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleCartMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartMenuClose = () => {
    setAnchorEl(null);
  };

  //on drawer close
  const onDrawerClick = () => {
    onClick(!drawerState);
  };

  return (
    <div className="appbar">
      <div className="appbar__content container">
        {/* Logo area */}
        <div className="appbar__content-left">
          <img
            src={process.env.PUBLIC_URL + "/images/country-api-logo-black.svg"}
            alt="country api text"
          />
        </div>
        {/* Search box area */}
        <div className="appbar__content-search">
          {/* Search component */}
          <Search />
        </div>
        {/* right side items */}
        <div className="appbar__content-right">
          {/* Cart menu */}
          <CartMenu
            cart={cart}
            onClick={handleCartMenuClose}
            menuOpen={menuOpen}
            anchorEl={anchorEl}
          />
          {/* shopping cart related */}
          <div className="appbar__content-cart" onClick={handleCartMenuClick}>
            <ShoppingCartIcon className="cursor-pointer" />
            {/* cart counter component */}

            <div className={`appbar__content-cart-counter cursor-pointer`}>
              {cart && cart.length}
            </div>
          </div>
          {/* menu hamburger icon */}
          <MenuIcon className="cursor-pointer" onClick={onDrawerClick} />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
