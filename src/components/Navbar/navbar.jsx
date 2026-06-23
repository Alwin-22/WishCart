import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import LinksWithIcons from "./../LinksWithIcons/LinksWithIcons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionsAPI } from "./../../services/productServices";
import { motion } from "motion/react";

const Navbar = () => {
  const [search, setsearch] = useState(" ");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    suggestions.length;
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1,
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1,
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setsearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };
  useEffect(() => {
    const delaySuggestions = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsAPI(search)
          .then((res) => setSuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaySuggestions);
  }, [search]);
  console.log(suggestions);

  return (
    <motion.nav
      className="align_center navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setsearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
    </motion.nav>
  );
};

export default Navbar;
