import type { GetServerSideProps, NextPage } from "next";
import styles from "styles/login.module.scss";
import { getProviders } from "next-auth/react";
import { signIn, signOut, getSession } from "next-auth/react";

const Login: NextPage = (props) => {
  console.log(JSON.stringify(props));
  return (
    <main className={styles.main}>
      <div className={styles.login_prompt}>
        {/* <h1 className={styles.header}>ConnectHigh</h1>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" /> */}
        <button onClick={() => signIn()}>Sign In With Google</button>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers: any = await getProviders();
  const session: any = await getSession();
  return {
    props: {
      session,
      providers,
    },
  };
};

export default Login;
