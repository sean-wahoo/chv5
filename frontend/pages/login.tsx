import type { NextPage } from "next";
import { useState } from "react";
import styles from "styles/login.module.scss";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import axios from "axios";

const googleSignIn = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result.user;
  } catch (error: any) {
    const code = error.code;
    const message = error.message;
    return { error: true, code, message };
  }
};

const emailSignIn = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential.user;
  } catch (error: any) {
    const code = error.code;
    const message = error.message;
    return { error: true, code, message };
  }
};

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
              setConfirmPassword(e.currentTarget.value);
            }}
            value={confirmPassword}
            placeholder="Super Secret Password Again"
          />
          <button
            className={styles.email_button}
            onClick={async (e) => {
              e.preventDefault();
              const signUpOnFirebase: any = await emailSignIn(email, password);
              if (!signUpOnFirebase.error) {
                const display_name: string = signUpOnFirebase.displayName;
                const image_path: string = signUpOnFirebase.photoURL;
                const response = await axios.post(
                  `${process.env.BACKEND_URL}/auth/signUp`,
                  { type: "email", display_name, image_path, email }
                );

                console.log(response);
              }
            }}
          >
            Sign Up
          </button>
        </form>
        <hr className={styles.line} />
        <GoogleButton onClick={() => googleSignIn()} />
      </div>
    </main>
  );
};

export default Login;
