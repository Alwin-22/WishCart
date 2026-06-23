import React from "react";
import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";
import { motion } from "motion/react";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData("/products/featured", null, [
    "products",
    "featured",
  ]);
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
      <motion.h2
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Featured Products
      </motion.h2>
      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}

        {isLoading && <p>Loading featured products...</p>}

        {!data &&
          isLoading &&
          skeletons.map((n, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}

        {data &&
          data.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3, delay: index * 0.25 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
