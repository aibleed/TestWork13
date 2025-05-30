"use client";
import { login } from "app/actions/auth";
import { useActionState, useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";

export type FormState = {
  success: boolean;
  message?: string;
};

const LoginForm = () => {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {
    success: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.replace("/");
    }
  }, [state, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const trimmedValue = value.trim();
    let error = "";

    if (trimmedValue === "") {
      error = "This field is required";
    } else if (name === "username" && trimmedValue.length < 3) {
      error = "Username must be at least 3 characters";
    } else if (name === "password" && trimmedValue.length < 3) {
      error = "Password must be at least 3 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return (
      values.username.trim() !== "" &&
      values.password.trim() !== "" &&
      !errors.username &&
      !errors.password
    );
  };

  return (
    <div className={styles.formContainer}>
      <form action={action} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            required
            disabled={pending}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <p id="username-error" className={styles.error}>
              {errors.username}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            disabled={pending}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p id="password-error" className={styles.error}>
              {errors.password}
            </p>
          )}
        </div>

        {state?.message && <p className={styles.error}>{state.message}</p>}
        <button type="submit" disabled={pending || !isFormValid()}>
          {pending ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
