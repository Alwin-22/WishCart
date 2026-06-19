import React, { useEffect, useState, useRef, useMemo } from "react";

import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const isFetchingRef = useRef(false); // ✅ Define this first!

  const config = useMemo(
    () => ({
      params: {
        category,
        perPage: 10,
        page,
      },
      fetchingRef: isFetchingRef, // ✅ Now it's defined!
    }),
    [category, page],
  );

  const { data, error, isLoading } = useData("/products", config);

  useEffect(() => {
    setPage(1);
  }, [category]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
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
  }, [data, isLoading]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {!data &&
          isLoading &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {data?.products &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={Number(page) || 1}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
