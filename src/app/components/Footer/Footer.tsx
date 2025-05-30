import { verifySession } from "app/lib/dal";
import Container from "../Container/Container";
import styles from "./Footer.module.scss";

const Footer = async () => {
  const session = await verifySession();
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} AbeloHost</p>
          {session && <p>Logged as {session.user.email}!</p>}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
