<<<<<<< HEAD
import type { NextPage } from "next";
=======
import type { GetServerSideProps, NextPage } from "next";
>>>>>>> 119a7a6 (temporarily updated login page)
import { useState } from "react";
import styles from "styles/login.module.scss";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
<<<<<<< HEAD
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

  // const auth = getAuth();
  // const provider = new GoogleAuthProvider();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(result);

  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //   });
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

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     console.table(error);
  //   });
};

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
=======

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
>>>>>>> 119a7a6 (temporarily updated login page)
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
<<<<<<< HEAD
          {/* /** you might be mixing some shit up so take a nap and figure this out
          later. right now you are going pretty smoothly, just forgetting
          whetehr or not you're working on registration or logging in and which
          method. get that straightened out and you'll be on fire. */}
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
                  { type: "email", display_name, image_path, email, password }
                );
              }
=======
          <button
            className={styles.email_button}
            onClick={(e) => {
              e.preventDefault();
              emailSignIn(email, password);
>>>>>>> 119a7a6 (temporarily updated login page)
            }}
          >
            Sign Up
          </button>
        </form>
<<<<<<< HEAD
        <hr className={styles.line} />
        <GoogleButton onClick={() => googleSignIn()} />
=======
        <button onClick={() => googleSignIn()}>google</button>
>>>>>>> 119a7a6 (temporarily updated login page)
      </div>
    </main>
  );
};

export default Login;
