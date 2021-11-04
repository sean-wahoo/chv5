import "styles/_globals.scss";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC8DYfMcB4XW0XnwA9_FpoDy0oignIgSUA",
  authDomain: "chv5-330701.firebaseapp.com",
  projectId: "chv5-330701",
  storageBucket: "chv5-330701.appspot.com",
  messagingSenderId: "5651362700",
  appId: "1:5651362700:web:457915e34e28d362355ca9",
  measurementId: "G-TKNEMCXNHJ",
};

const app = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
