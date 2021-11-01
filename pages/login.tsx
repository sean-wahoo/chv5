import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "styles/login.module.scss";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const googleSignIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const emailSignIn = (email: string, password: string) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.table(error);
    });
};

const Login: NextPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(JSON.stringify(props));
  return (
    <main className={styles.main}>
      <div className={styles.login_prompt}>
        <h1 className={styles.header}>ConnectHigh</h1>
        <form className={styles.login_form}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            name="email"
            onInput={(e) => {
              setEmail(e.currentTarget.value);
            }}
            value={email}
            placeholder="email@address.com"
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={styles.input}
            id="password"
            name="password"
            onInput={(e) => {
              e.preventDefault();
              setPassword(e.currentTarget.value);
            }}
            value={password}
            placeholder="Super Secret Password"
          />
          <label className={styles.label} htmlFor="confirmPassword">
            Re-enter Password
          </label>
          <input
            type="password"
            className={styles.input}
            id="confirmPassword"
            name="confirmPassword"
            onInput={(e) => {
              e.preventDefault();
              setConfirmPassword(e.currentTarget.value);
            }}
            value={confirmPassword}
            placeholder="Super Secret Password Again"
          />
          <button
            className={styles.email_button}
            onClick={(e) => {
              e.preventDefault();
              emailSignIn(email, password);
            }}
          >
            Sign Up
          </button>
        </form>
        <button onClick={() => googleSignIn()}>google</button>
      </div>
    </main>
  );
};

export default Login;
