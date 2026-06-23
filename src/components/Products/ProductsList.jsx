import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import "./ProductsList.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useProductList from "../../hooks/useProductList";

const ProductsList = () => {
  const [sortBy, setSortBy] = useState(" ");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");

  const { data, error, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useProductList({
      search: searchQuery,
      category,
      perPage: 10,
    });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !isFetching &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data && data.pages) {
      const allProducts = data.pages.flatMap((page) => page.products || []);
      const productsCopy = [...allProducts];

      if (sortBy === "price desc") {
        setSortedProducts(productsCopy.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(productsCopy.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          productsCopy.sort((a, b) => b.reviews.rate - a.reviews.rate),
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          productsCopy.sort((a, b) => a.reviews.rate - b.reviews.rate),
        );
      } else {
        setSortedProducts(productsCopy);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error.message || error}</em>}

        {isLoading &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {isFetching &&
          !isLoading &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`fetching-skeleton-${index}`} />
          ))}
      </div>
    </section>
  );
};

export default ProductsList;
