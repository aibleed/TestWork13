import { Suspense } from "react";
import { fetchProducts } from "./actions/products";
import Container from "./components/Container/Container";
import ProductsList from "./components/ProductsList/ProductsList";
import styles from "./page.module.scss";
import { verifySession } from "./lib/dal";

export default async function Home() {
  const products = fetchProducts();
  const session = await verifySession();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Products</h1>
      <Container>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <ProductsList
            isCartButton={session?.isAuth ?? false}
            products={products}
          />
        </Suspense>
      </Container>
    </main>
  );
}
