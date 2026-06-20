import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(" ");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");

  const isFetchingRef = useRef(false);

  const config = useMemo(
    () => ({
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page,
      },
      fetchingRef: isFetchingRef,
    }),
    [searchQuery, category, page],
  );

  const { data, error, isLoading } = useData("/products", config);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [data, isLoading]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !isLoading &&
        !isFetchingRef.current &&
        data &&
        page < data.totalPages
      ) {
        isFetchingRef.current = true;
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading, page]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate),
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate),
        );
      } else {
        setSortedProducts(products);
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
        {error && <em className="form_error">{error}</em>}

        {isLoading &&
          page === 1 &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {data?.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        {isLoading && page > 1 && (
          <p className="loading_more_text">Loading more products...</p>
        )}
      </div>
    </section>
  );
};

export default ProductsList;
