"use client";
import { use } from "react";
import type { Products } from "api";
import styles from "./ProductsList.module.scss";
import ProductCard from "../ProductCard/ProductCard";

interface ProductsListProps {
  products: Promise<Products>;
  isCartButton: boolean;
}

const ProductsList = ({ products, isCartButton }: ProductsListProps) => {
  const allProducts = use(products);
  const onAddToCart = async () => {};

  return (
    <section className={styles.productsList}>
      {allProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={isCartButton ? onAddToCart : undefined}
        />
      ))}
    </section>
  );
};

export default ProductsList;
