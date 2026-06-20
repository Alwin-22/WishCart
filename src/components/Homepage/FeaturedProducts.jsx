import React from "react";
import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData"; // Adjust path if needed
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData("/products/featured");
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>
      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}

        {isLoading && <p>Loading featured products...</p>}

        {!data &&
          isLoading &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {data &&
          data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
