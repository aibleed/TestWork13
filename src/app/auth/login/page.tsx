import styles from "./page.module.scss";
import LoginForm from "./components/LoginForm/LoginForm";
import Container from "app/components/Container/Container";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <Container>
        <h1>Login</h1>
        <LoginForm />
      </Container>
    </main>
  );
};

export default LoginPage;
