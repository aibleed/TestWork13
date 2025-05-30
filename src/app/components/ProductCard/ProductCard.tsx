import { Product } from "api";
import styles from "./ProductCard.module.scss";
import Image from "next/image";

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart?: (product: Product) => void;
}) => {
  return (
    <article className={styles.productCard}>
      <figure className={styles.imageContainer}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={product.thumbnail}
          alt={product.title}
          className={styles.productImage}
          loading="lazy"
        />
        <figcaption className={styles.imageCaption}>
          {product.category}
        </figcaption>
      </figure>

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

        {onAddToCart && (
          <button
            className={styles.addToCartButton}
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
