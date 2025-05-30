import Link from "next/link";
import styles from "./Header.module.scss";
import { PATH } from "app/consts";
import Container from "../Container/Container";
import { verifySession } from "app/lib/dal";
import { logout } from "app/actions/auth";

const Header = async () => {
  const session = await verifySession();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link href={PATH.HOME}>
            <h1 className={styles.logo}>AbeloHost</h1>
          </Link>

          <div className={styles.headerActions}>
            {session && (
              <p className={styles.welcome}>
                Welcome, {session.user.firstName} {session.user.lastName}
              </p>
            )}
            {session ? (
              <button className={styles.button} onClick={logout}>Logout</button>
            ) : (
              <Link className={styles.button} href={PATH.LOGIN}>Login</Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
