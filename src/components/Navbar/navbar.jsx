import React, { useContext } from "react";

import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinksWithIcons from "./../LinksWithIcons/LinksWithIcons";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";

const Navbar = () => {
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinksWithIcons title="Home" link="/" emoji={rocket} />
        <LinksWithIcons title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinksWithIcons title="Login" link="/login" emoji={idButton} />
            <LinksWithIcons title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            {" "}
            <LinksWithIcons title="My Orders" link="/myorders" emoji={order} />
            <LinksWithIcons title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
